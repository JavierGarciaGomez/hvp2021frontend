import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  addNewFcmStep,
  cleanFcmStep,
  createFcmDog,
  handleFcmCompleteStep,
  handleNextFcmPackageStep,
  removeFcmSteps,
  setFcmCurrentStepConfig,
  setFcmCurrentStepEditable,
  updateFcmDog,
  updateStepReferences,
} from "../../actions/fcmActions";
import {
  fireSwalConfirmation,
  fireSwalError,
  setUrlValueOrRefreshImage,
} from "../../helpers/utilities";
import { Box, Button, Grid, Typography } from "@mui/material";
import { TextFieldWrapper } from "../../components/formsUI/TextFieldWrapper";
import { DatePickerFieldWrapper } from "../../components/formsUI/DatePickerFieldWrapper";
import { ButtonFormWrapper } from "../../components/formsUI/ButtonFormWrapper";
import { DragImageUpload } from "../../components/formsUI/DragImageUpload";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { SelectWrapper } from "../../components/formsUI/SelectWrapper";
import { CheckboxInputWrapper } from "../../components/formsUI/CheckboxInputWrapper";
import { getTransferStepLabel } from "../../helpers/fcmUtilities";
import { fireSwalWait } from "../../helpers/sweetAlertUtilities";

export const FcmDogFormik = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const { id } = useParams();
  const { client } = useSelector((state) => state.clients);
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { activeStep, steps, currentProps } = fcmPackage;

  const [filesPedigreeFront, setfilesPedigreeFront] = useState([]);
  const [filesPedigreeBack, setfilesPedigreeBack] = useState([]);
  const [imgUrlPedigreeFront, setImgUrlPedigreeFront] = useState(null);
  const [imgUrlPedigreeBack, setImgUrlPedigreeBack] = useState(null);

  const { label, stepType, props, stepFromOrigin, dataId, config } =
    steps[activeStep];
  const { isEditable, needsConfirmation, formTitle, showCancel } = config;
  const [componentData, setcomponentData] = useState({});

  /*************************************************************************************************** */
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */

  useEffect(() => {
    if (dataId) {
      let found = client.linkedDogs.find((el) => el._id === dataId);

      if (found) {
        setImgUrlPedigreeFront(found.urlFront);
        setImgUrlPedigreeBack(found.urlBack);

        found.expirationDate = dayjs(found.expirationDate).format("YYYY-MM-DD");
        found.birthDate = dayjs(found.birthDate).format("YYYY-MM-DD");

        setcomponentData({ ...found });
        setformValues({ ...found });
      }
    } else {
      setcomponentData(null);
      setImgUrlPedigreeFront(null);
      setImgUrlPedigreeBack(null);
    }
  }, [dataId]);

  /*************************************************************************************************** */
  /************************** Initial values and validation *******************************************************/
  /*************************************************************************************************** */

  let initialValues = {
    petName: "",
    breed: "",
    color: "",
    sex: "",
    birthDate: "",
    registerNum: "",
    registerType: "",
    isTransferPending: false,
    urlFront: "",
    urlBack: "",
  };

  let validationParams = {
    petName: Yup.string().trim().required("Es obligatorio"),
    breed: Yup.string().trim().required("Es obligatorio"),
    color: Yup.string().trim().required("Es obligatorio"),
    sex: Yup.string().trim().required("Es obligatorio"),
    birthDate: Yup.date().required("Es obligatorio"),
    registerNum: Yup.string().trim().required("Es obligatorio"),
    registerType: Yup.string().trim().required("Es obligatorio"),
  };

  let formValidation = Yup.object().shape(validationParams);

  const [formValues, setformValues] = useState(initialValues);

  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */

  const handleConfirmTransfer = async (values) => {
    // check if there is a pending transfer
    if (values.isTransferPending) {
      const confirmation = await fireSwalConfirmation(
        "Se ha marcado que se realizará una transferencia. Por lo que se agregará al paquete, si no es correcto, edite el formulario."
      );
      if (!confirmation) {
        return false;
      }
      dispatch(
        addNewFcmStep({
          label: getTransferStepLabel(activeStep),
          componentName: "FcmTransferFormik",
          props: {
            label: "Formato de transferencia",
          },
          stepFromOrigin: activeStep,
          stepDataId: "",
          config: {
            isEditable: true,
            formTitle: "Transferencia del ...",
            showCancel: false,
            needsConfirmation: false,
          },
        })
      );
      // if there are no pending transfers. Remove from step if they were previously included
    } else {
      dispatch(removeFcmSteps());
    }
    return true;
  };
  const handleSubmit = async (values) => {
    if (!(await handleConfirmTransfer(values))) {
      return;
    }
    fireSwalWait();

    if (filesPedigreeFront.length === 0 && !imgUrlPedigreeFront) {
      return fireSwalError(
        "Se debe cargar la imagen frontal del certificado del perro"
      );
    }

    if (filesPedigreeBack.length === 0 && !imgUrlPedigreeBack) {
      return fireSwalError(
        "Se debe cargar la imagen trasera del certificado del perro"
      );
    }

    let newValues = { ...values };

    // if there is a new file refresh the image
    newValues = await setUrlValueOrRefreshImage(
      newValues,
      filesPedigreeFront,
      "urlFront",
      imgUrlPedigreeFront
    );

    newValues = await setUrlValueOrRefreshImage(
      newValues,
      filesPedigreeBack,
      "urlBack",
      imgUrlPedigreeBack
    );

    // close sweet alert
    Swal.close();
    let fcmDog = null;

    // if there is an ID: update. If not: create
    if (newValues._id) {
      fcmDog = await dispatch(updateFcmDog(newValues));
    } else {
      fcmDog = await dispatch(createFcmDog(newValues));
    }
    // if there is an error in the dispach return
    if (!fcmDog) {
      return;
    }
    dispatch(updateStepReferences(fcmDog));
    dispatch(
      setFcmCurrentStepConfig({ needsConfirmation: false, isEditable: false })
    );
    dispatch(handleFcmCompleteStep());
  };

  const handleConfirmation = async () => {
    const values = { ...componentData };
    if (!(await handleConfirmTransfer(values))) {
      return;
    }
    dispatch(
      setFcmCurrentStepConfig({ needsConfirmation: false, isEditable: false })
    );
    dispatch(handleFcmCompleteStep());
  };

  /*************************************************************************************************** */
  /************************** RENDER *******************************************************/
  /*************************************************************************************************** */

  return (
    <Fragment>
      <Typography component="h2" variant="h5" mb="2rem">
        {formTitle}
      </Typography>

      {!isEditable && (
        <Box sx={{ mb: "3rem" }}>
          <Typography sx={{ mb: "2rem", lineHeight: "1.5" }}>
            {needsConfirmation
              ? "Perro seleccionado. Confirma los datos, edítalos o remueve para seleccionar otro."
              : "Los datos de la FCM del perro han sido llenados, puedes continuar con el paso siguiente, editar los datos o remover la selección."}
          </Typography>
          <Box sx={{ display: "flex", width: "100%", gap: "3rem", mb: "3rem" }}>
            {needsConfirmation ? (
              <Button
                variant="contained"
                fullWidth={true}
                onClick={() => {
                  handleConfirmation();
                }}
                color="primary"
              >
                Confirmar
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth={true}
                onClick={() => {
                  dispatch(handleNextFcmPackageStep());
                }}
                color="primary"
              >
                Siguiente paso
              </Button>
            )}

            <Button
              variant="contained"
              fullWidth={true}
              onClick={() => {
                dispatch(setFcmCurrentStepEditable(true));
              }}
              color="primary"
            >
              Editar información
            </Button>
            <Button
              variant="contained"
              fullWidth={true}
              onClick={() => {
                dispatch(cleanFcmStep());
              }}
              color="error"
            >
              Remover
            </Button>
          </Box>
        </Box>
      )}

      {/* Nota */}
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
        <Typography mb="1rem">
          Si el pedigrí o CPR está endosado, es necesario marcar que se requiere
          transferencia, para que se incluya el formato en el paquete.
        </Typography>
      </Box>

      {/* Formik */}

      <Formik
        initialValues={{ ...formValues }}
        validationSchema={formValidation}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        enableReinitialize
      >
        <Form>
          <Grid container spacing={2}>
            {/* SECTION IMAGES */}
            <Grid item xs={12}>
              <Typography component="h4" variant="h5" mb="2rem">
                Imágenes
              </Typography>
            </Grid>
            {/* tarjeta de socio */}

            <Grid item xs={12} md={6}>
              <Typography mb="2rem">Pedigrí o CPR Frontal</Typography>
              <DragImageUpload
                files={filesPedigreeFront}
                setFiles={setfilesPedigreeFront}
                imgUrl={imgUrlPedigreeFront}
                setimgUrl={setImgUrlPedigreeFront}
                editable={isEditable}
              ></DragImageUpload>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography mb="2rem">Pedigrí o CPR Reverso</Typography>
              <DragImageUpload
                files={filesPedigreeBack}
                setFiles={setfilesPedigreeBack}
                imgUrl={imgUrlPedigreeBack}
                setimgUrl={setImgUrlPedigreeBack}
                editable={isEditable}
              ></DragImageUpload>
            </Grid>
            {/* DATOS DE IDENTIFICACIÓN */}
            <Grid item xs={12}>
              <Typography component="h4" variant="h5">
                Datos de Identificación
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
            <Grid item xs={12} md={4}>
              <TextFieldWrapper
                name="registerNum"
                label="Número de registro"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SelectWrapper
                name="registerType"
                label="Tipo de registro"
                disabled={!isEditable}
                options={{
                  pedigree: "Pedigrí",
                  racePurity: "Certificado de pureza racial",
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CheckboxInputWrapper
                name="isTransferPending"
                label="Requiere cambio de propietario"
                disabled={!isEditable}
              />
            </Grid>

            {isEditable && (
              <Grid item xs={12} mb={2}>
                <Box sx={{ display: "flex", width: "100%", gap: "3rem" }}>
                  <ButtonFormWrapper> Guardar</ButtonFormWrapper>
                  {showCancel && (
                    <Button
                      variant="contained"
                      fullWidth={true}
                      // onClick={handleSubmit}
                      color="error"
                    >
                      Cancelar
                    </Button>
                  )}
                </Box>
              </Grid>
            )}
          </Grid>
        </Form>
      </Formik>
    </Fragment>
  );
};
