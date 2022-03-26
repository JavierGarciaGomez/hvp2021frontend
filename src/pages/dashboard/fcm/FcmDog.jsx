import { Box, Button, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { ButtonFormWrapper } from "../../../components/formsUI/ButtonFormWrapper";
import { CheckboxInputWrapper } from "../../../components/formsUI/CheckboxInputWrapper";
import { DatePickerFieldWrapper } from "../../../components/formsUI/DatePickerFieldWrapper";
import { DragImageUpload } from "../../../components/formsUI/DragImageUpload";
import { TextFieldWrapper } from "../../../components/formsUI/TextFieldWrapper";
import {
  createFcmDog,
  createFcmPartner,
  startLoadingAllFcm,
  updateFcmDog,
  updateFcmPartner,
} from "../../../actions/fcmActions";
import { transformDatePropertyToInput } from "../../../helpers/dateUtilities";
import {
  checkIfUrlOrFileExist,
  fireSwalError,
  getFullNameOfObject,
  getImgUrlByFileOrUrl,
  isObjectEmpty,
} from "../../../helpers/utilities";
import { fireSwalWait } from "../../../helpers/sweetAlertUtilities";
import dayjs from "dayjs";
import { SelectWrapper } from "../../../components/formsUI/SelectWrapper";
import { fcmCertificatesTypes } from "../../../types/types";

let emptyFormValues = {
  petName: "",
  breed: "",
  color: "",
  sex: "",
  birthDate: "",
  registerNum: "",
  registerType: "",
  urlFront: "",
  urlBack: "",
  isRegisterPending: false,
  isTransferPending: false,
};

let validationParams = {
  petName: Yup.string().trim().required("Es obligatorio"),
  breed: Yup.string().trim().required("Es obligatorio"),
  color: Yup.string().trim().required("Es obligatorio"),
  sex: Yup.string().trim().required("Es obligatorio"),
  birthDate: Yup.date().required("Es obligatorio"),
  registerType: Yup.string().trim().required("Es obligatorio"),
  isRegisterPending: Yup.boolean(),
  isTransferPending: Yup.boolean(),
  registerNum: Yup.string().when("isRegisterPending", {
    is: false,
    then: Yup.string().required("Es obligatorio"),
  }),
};

export const FcmDog = ({ fcmDogId, extraProps, onSave, onCancel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let formValidation = Yup.object().shape(validationParams);
  const { allFcm } = useSelector((state) => state.fcm);
  const { allFcmDogs = [] } = allFcm;
  const [initialFormValues, setInitialFormValues] = useState(emptyFormValues);
  const [filesFront, setFilesFront] = useState([]);
  const [filesBack, setFilesBack] = useState([]);
  const [isEditable, setisEditable] = useState(true);
  const { id } = useParams();
  const [showButtons, setShowButtons] = useState(true);

  const [heading, setHeading] = useState("Registrar perro nuevo");

  /*************************************************************************************************** */
  /************************** useeffects *******************************************************/
  /*************************************************************************************************** */
  //#region
  //   load the fcmParther if there is an id

  useEffect(() => {
    if (allFcmDogs.length === 0) {
      dispatch(startLoadingAllFcm());
    }
  }, []);

  useEffect(() => {
    if (!isObjectEmpty(extraProps)) {
      setisEditable(extraProps.isEditable);
      setShowButtons(extraProps.showButtons);
    }
  }, [extraProps]);

  useEffect(() => {
    if (allFcmDogs.length > 0) {
      let idToSearch = null;
      if (id) idToSearch = id;
      if (fcmDogId) idToSearch = fcmDogId;

      if (!idToSearch) return;

      const fcmDog = allFcmDogs.find((element) => element._id === idToSearch);

      const fcmDogsFormattedDate = transformDatePropertyToInput(
        fcmDog,
        "birthDate"
      );

      setInitialFormValues({ ...fcmDogsFormattedDate });
      setisEditable(false);
      setHeading(
        `Perro ${getFullNameOfObject(fcmDog) || ""} - ${
          fcmDog?.registerNum || ""
        }`
      );
    }
  }, [allFcmDogs, fcmDogId, id]);

  //#endregion
  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */
  //#region

  const checkImages = (values) => {
    if (!values.isRegisterPending) {
      if (!checkIfUrlOrFileExist(filesFront, values.urlFront)) {
        fireSwalError("Se debe cargar la imagen frontal del certificado");
        return false;
      }
      if (!checkIfUrlOrFileExist(filesBack, values.urlBack)) {
        fireSwalError("Se debe cargar la imagen trasera del certificado");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (values) => {
    fireSwalWait();
    if (!checkImages(values)) return;

    const { urlFront, urlBack, isRegisterPending } = values;

    if (!isRegisterPending) {
      values.urlFront = await getImgUrlByFileOrUrl(filesFront, urlFront);
      values.urlBack = await getImgUrlByFileOrUrl(filesBack, urlBack);
    }

    let newValues = isRegisterPending
      ? emptyUnusedValues(values)
      : { ...values };

    if (newValues._id) {
      await dispatch(updateFcmDog(newValues));
    } else {
      return await dispatch(createFcmDog(newValues));
    }
    if (onSave) onSave();
    if (!extraProps.navigateBack) {
      return;
    }
    navigate(-1);
  };

  const handleCancel = () => {
    if (onCancel) return onCancel();
    if (isEditable) {
      return setisEditable(false);
    }
    return navigate(-1);
  };

  const emptyUnusedValues = (values) => {
    const newValues = { ...values };
    newValues.urlFront = "";
    newValues.urlBack = "";
    newValues.registerNum = `En trámite - ${values.petName} - ${dayjs().format(
      "DD-MM-YY HH:mm"
    )}`;

    return newValues;
  };

  //#endregion

  return (
    <Box>
      <Typography component="h2" variant="h5" mb="2rem">
        {heading}
      </Typography>
      {/* Notas */}
      <Box
        sx={{
          bgcolor: "grey.300",
          p: "2rem",
          borderRadius: 2,
          boxShadow: 5,
          mb: "5rem",
        }}
      >
        <Typography component="h3" variant="h6" mb="1rem" fontWeight="bold">
          Notas:
        </Typography>
        <Typography mb="1rem">
          Las imágenes deben tener un tamaño máximo de 1mb.
        </Typography>
      </Box>
      {/* Formulario */}
      <Formik
        initialValues={{ ...initialFormValues }}
        validationSchema={formValidation}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        enableReinitialize
      >
        {({ values, errors, isSubmitting, isValid, resetForm }) => (
          <Form>
            <Grid container spacing={2}>
              {/* CONDICIONES INICIALES */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography component="h4" variant="h5">
                      Condiciones iniciales
                    </Typography>
                  </Grid>

                  {!values.isTransferPending && (
                    <Grid item xs={6}>
                      <CheckboxInputWrapper
                        name="isRegisterPending"
                        label="Registro pendiente en FCM"
                        disabled={!isEditable}
                      />
                    </Grid>
                  )}

                  {!values.isRegisterPending && (
                    <Grid item xs={6}>
                      <CheckboxInputWrapper
                        name="isTransferPending"
                        label="Transferencia pendiente"
                        disabled={!isEditable}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              {/* DATOS DE IDENTIFICACIÓN */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography component="h4" variant="h5">
                      Datos del perro
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextFieldWrapper
                      name="petName"
                      label="Nombre"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextFieldWrapper
                      name="breed"
                      label="Raza"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextFieldWrapper
                      name="color"
                      label="Color"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SelectWrapper
                      name="sex"
                      label="Sexo"
                      disabled={!isEditable}
                      options={{
                        male: "Macho",
                        female: "Hembra",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePickerFieldWrapper
                      name="birthDate"
                      label="Fecha de nacimiento"
                      disabled={!isEditable}
                    />
                  </Grid>
                  {!values.isRegisterPending && (
                    <Grid item xs={12} md={6}>
                      <TextFieldWrapper
                        name="registerNum"
                        label="Número de registro"
                        disabled={!isEditable}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} md={6}>
                    <SelectWrapper
                      name="registerType"
                      label="Tipo de registro"
                      disabled={!isEditable}
                      options={fcmCertificatesTypes}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* SECTION IMAGES */}
              {!values.isRegisterPending && (
                <Grid item xs={12} mb="2rem">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography component="h4" variant="h5" mb="2rem">
                        Imágenes
                      </Typography>
                    </Grid>
                    {/* tarjeta de socio */}

                    <Grid item xs={12} md={6}>
                      <Typography mb="2rem">
                        Pedigrí o certificado frontal
                      </Typography>
                      <DragImageUpload
                        files={filesFront}
                        setFiles={setFilesFront}
                        imgUrl={values.urlFront}
                        editable={isEditable}
                      ></DragImageUpload>
                      <Box
                        sx={{
                          mt: "1rem",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() => {
                            window.open(values.urlFront);
                          }}
                        >
                          Ver imagen
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography mb="2rem">INE reverso</Typography>
                      <DragImageUpload
                        files={filesBack}
                        setFiles={setFilesBack}
                        imgUrl={values.urlBack}
                        editable={isEditable}
                      ></DragImageUpload>
                      <Box
                        sx={{
                          mt: "1rem",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() => {
                            window.open(values.urlBack);
                          }}
                        >
                          Ver imagen
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {/* BUTTONS */}

              {showButtons && (
                <Grid item xs={12} mb={2}>
                  <Box sx={{ display: "flex", width: "100%", gap: "3rem" }}>
                    {isEditable ? (
                      <ButtonFormWrapper variant="text">
                        Guardar
                      </ButtonFormWrapper>
                    ) : (
                      <Button
                        fullWidth={true}
                        onClick={() => {
                          setisEditable(true);
                        }}
                      >
                        Editar
                      </Button>
                    )}

                    <Button
                      fullWidth={true}
                      onClick={() => {
                        resetForm();
                        handleCancel();
                      }}
                      color="error"
                    >
                      Cancelar
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
            <Box>
              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
