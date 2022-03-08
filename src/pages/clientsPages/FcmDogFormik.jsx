import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  createFcmDog,
  createFcmPartner,
  setFcmPackage,
  setFcmPackageNeedsConfirmation,
  setFcmPackageProperty,
  setFcmPackageStep,
  updateDog,
  updateFcmDog,
  updateFcmPartner,
} from "../../actions/fcmActions";
import {
  fireSwalConfirmation,
  fireSwalError,
  includeInPackage,
  isObjectEmpty,
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

export const FcmDogFormik = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const { id } = useParams();
  const { client } = useSelector((state) => state.clients);
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { activeStep, currentProps } = fcmPackage;
  const {
    isEditable,
    packageProperty,
    needsConfirmation,
    formTitle,
    showCancel,
  } = currentProps;

  const [filesPedigreeFront, setfilesPedigreeFront] = useState([]);
  const [filesPedigreeBack, setfilesPedigreeBack] = useState([]);
  const [imgUrlPedigreeFront, setImgUrlPedigreeFront] = useState(null);
  const [imgUrlPedigreeBack, setImgUrlPedigreeBack] = useState(null);

  const [fcmDog, setfcmDog] = useState(null);
  const [isPending, setisPending] = useState(false);

  /*************************************************************************************************** */
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */

  // find fcmPartner and set it active (searching from id)
  useEffect(() => {
    if (!isObjectEmpty(client)) {
      let found = client.linkedDogs.find((el) => el._id === id);
      // set active
      if (found) {
        // set the image found to be used in the component
        setImgUrlPedigreeFront(found.urlFront);
        setImgUrlPedigreeBack(found.urlBack);

        found.birthDate = dayjs(found.expirationDate).format("YYYY-MM-DD");
        return setformValues(...found);
      }
    }
  }, []);

  // find fcmPartner and set it active (searching from package)
  useEffect(() => {
    if (fcmPackage[packageProperty]) {
      let found = client.linkedDogs.find(
        (el) => el._id === fcmPackage[packageProperty]
      );

      setfcmDog(found);
      console.log("este perro encontré", found);

      // set active
      if (found) {
        // set the image found to be used in the component
        setImgUrlPedigreeFront(found.urlFront);
        setImgUrlPedigreeBack(found.urlBack);

        found.birthDate = dayjs(found.expirationDate).format("YYYY-MM-DD");
        return setformValues(...found);
      }
    }
  }, [fcmPackage]);

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

  const handleSubmit = async (values) => {
    // if the date is going to expire in the next 2 weeks ask confirmation

    Swal.fire({
      title: "Cargando información",
      text: "Por favor, espere",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    if (values.isTransferPending) {
      dispatch(
        setFcmPackage({
          ...fcmPackage,
          procedures: includeInPackage(
            fcmPackage.procedures,
            {
              packageProperty,
              procedure: "transfer",
              _id: values._id,
            },
            packageProperty
          ),
        })
      );
    }

    if (filesPedigreeFront.length === 0 && !imgUrlPedigreeFront) {
      return fireSwalError("Se debe cargar la imagen de la tarjeta");
    }

    if (filesPedigreeBack.length === 0 && !imgUrlPedigreeBack) {
      return fireSwalError(
        "Se debe cargar la imagen del comprobante domicilario"
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

    // if there is an ID: update. If not: create
    if (newValues._id) {
      Swal.close();
      const fcmDogId = await dispatch(updateFcmDog(newValues));
      dispatch(
        setFcmPackage({
          ...fcmPackage,
          currentProps: {
            ...fcmPackage.currentProps,
            isEditable: false,
          },
        })
      );

      if (fcmDogId) {
        if (fcmPackage) {
          dispatch(setFcmPackageProperty(fcmDogId));
          dispatch(setFcmPackageStep(activeStep + 1));
        }
        // navigate to previous page or profile
        // navigate(`/dashboard/documentation`);
      }
    } else {
      Swal.close();
      const fcmDogId = await dispatch(createFcmDog(newValues));
      if (fcmDogId) {
        // submit to parent
        if (fcmPackage) {
          dispatch(setFcmPackageProperty(fcmDogId));
          dispatch(setFcmPackageStep(activeStep + 1));
        }
        // navigate(`/dashboard/documentation`);
      }
    }
  };

  const handleConfirmation = async () => {
    const values = { ...fcmDog };

    if (values.isTransferPending) {
      dispatch(
        setFcmPackage({
          ...fcmPackage,
          procedures: includeInPackage(
            fcmPackage.procedures,
            {
              packageProperty,
              procedure: "transfer",
              _id: values._id,
            },
            packageProperty
          ),
        })
      );
    }

    dispatch(setFcmPackageNeedsConfirmation(false));
    // setneedsConfirmation(false);
    dispatch(setFcmPackageStep(activeStep + 1));
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
            Los datos de socio del propietario del padre han sido llenados,
            puedes continuar con el paso siguiente, editar los datos o remover
            la selección.
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
                  dispatch(setFcmPackageStep(activeStep + 1));
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
                dispatch(
                  setFcmPackage({
                    ...fcmPackage,
                    currentProps: {
                      ...fcmPackage.currentProps,
                      isEditable: true,
                    },
                  })
                );
              }}
              color="primary"
            >
              Editar información
            </Button>
            <Button
              variant="contained"
              fullWidth={true}
              onClick={() => {
                console.log("clicking");
                dispatch(setFcmPackageProperty(""));
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
