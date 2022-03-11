import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  addFcmProcedure,
  cleanFcmStep,
  createFcmPartner,
  createFcmtransfer,
  handleFcmCompleteStep,
  handleNextFcmPackageStep,
  setFcmPackageEditable,
  setFcmPackageNeedsConfirmation,
  setFcmPackageProperty,
  updateFcmPartner,
  updateFcmtransfer,
} from "../../actions/fcmActions";
import {
  fireSwalConfirmation,
  fireSwalError,
  isObjectEmpty,
  setUrlValueOrRefreshImage,
} from "../../helpers/utilities";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { TextFieldWrapper } from "../../components/formsUI/TextFieldWrapper";
import { DatePickerFieldWrapper } from "../../components/formsUI/DatePickerFieldWrapper";
import { ButtonFormWrapper } from "../../components/formsUI/ButtonFormWrapper";
import { DragImageUpload } from "../../components/formsUI/DragImageUpload";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import {
  checkIfPreviousStepsAreFilled,
  getFcmDogIdByOriginStep,
  getFcmParterIdByOriginStep,
} from "../../helpers/fcmUtilities";

export const FcmTransferFormik = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const { id } = useParams();
  const { client } = useSelector((state) => state.clients);
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { activeStep, currentProps, steps } = fcmPackage;
  const {
    isFirstRegister,
    isEditable,
    packageProperty,
    needsConfirmation,
    formTitle,
    showCancel,
  } = currentProps;
  const [filesFrontINE, setfilesFrontINE] = useState([]);
  const [filesBackINE, setfilesBackINE] = useState([]);
  const [imgUrlFrontIne, setImgUrlFrontIne] = useState(null);
  const [imgUrlBackIne, setImgUrlBackIne] = useState(null);
  const [fcmPartner, setfcmPartner] = useState(null);
  const [isPending, setisPending] = useState(false);
  const [fcmDog, setfcmDog] = useState({});
  const [isPreviousDataLoaded, setisPreviousDataLoaded] = useState(false);

  /*************************************************************************************************** */
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */

  // set fcmpartner and fcmdog
  useEffect(() => {
    if (checkIfPreviousStepsAreFilled(fcmPackage, activeStep)) {
      const fcmDogId = getFcmDogIdByOriginStep(fcmPackage, activeStep);
      const found = client.linkedDogs.find((el) => el._id === fcmDogId);
      setfcmDog(() => ({ ...found }));
      const fcmPartnerId = getFcmParterIdByOriginStep(fcmPackage, activeStep);
      const foundfcmPartner = client.linkedFcmPartners.find(
        (el) => el._id === fcmPartnerId
      );

      setfcmPartner(() => ({ ...foundfcmPartner }));
    }
  }, []);

  // set that the data is loaded
  useEffect(() => {
    if (fcmDog && fcmPartner) {
      setisPreviousDataLoaded(true);
    } else {
      setisPreviousDataLoaded(false);
    }
  }, [fcmDog, fcmPartner]);

  /*************************************************************************************************** */
  /************************** Initial values and validation *******************************************************/
  /*************************************************************************************************** */

  let initialValues = {
    firstName: "",
    paternalSurname: "",
    maternalSurname: "",
    urlFrontIne: "",
    urlBackIne: "",
  };

  let validationParams = {
    firstName: Yup.string().trim().required("Es obligatorio"),
    paternalSurname: Yup.string().trim().required("Es obligatorio"),
    maternalSurname: Yup.string().trim().required("Es obligatorio"),
  };

  let formValidation = Yup.object().shape(validationParams);

  const [formValues, setformValues] = useState(initialValues);

  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */

  const handleSubmit = async (values) => {
    Swal.fire({
      title: "Cargando información",
      text: "Por favor, espere",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    if (filesFrontINE.length === 0 && !imgUrlFrontIne) {
      return fireSwalError("Se debe cargar la imagen frontal del INE");
    }
    if (filesBackINE.length === 0 && !imgUrlBackIne) {
      return fireSwalError("Se debe cargar la imagen trasera del INE");
    }

    let newValues = { ...values };

    // if there is a new file refresh the image
    newValues = await setUrlValueOrRefreshImage(
      newValues,
      filesFrontINE,
      "urlFrontIne",
      imgUrlFrontIne
    );
    newValues = await setUrlValueOrRefreshImage(
      newValues,
      filesBackINE,
      "urlBackIne",
      imgUrlBackIne
    );

    const finalValues = {
      previousOwner: { ...newValues },
      newOwner: { ...fcmPartner },
      dog: { ...fcmDog },
    };

    // if there is an ID: update. If not: create
    if (finalValues._id) {
      Swal.close();
      const fcmTransferId = await dispatch(updateFcmtransfer(finalValues));
      await dispatch(setFcmPackageEditable(false));

      if (fcmTransferId) {
        if (fcmPackage) {
          dispatch(setFcmPackageProperty(fcmTransferId));
          dispatch(handleFcmCompleteStep());
        }
        // navigate to previous page or profile
        // navigate(`/dashboard/documentation`);
      }
    } else {
      Swal.close();
      const fcmTransferId = await dispatch(createFcmtransfer(finalValues));
      if (fcmTransferId) {
        // submit to parent
        if (fcmPackage) {
          dispatch(setFcmPackageProperty(fcmTransferId));
          dispatch(handleFcmCompleteStep());
        }
        // navigate(`/dashboard/documentation`);
      }
    }
  };

  // const handleConfirmation = async () => {
  //   const values = { ...fcmPartner };

  //   if (dayjs(values.expirationDate).isBefore(dayjs().add(14, "days"))) {
  //     const confirmation = await fireSwalConfirmation(
  //       "La tarjeta ha expirado o expirará pronto. Se agregará al paquete una renovación de socio. Antes de confirmar, verificar que el comprobante domiciliario no sea anterior a 3 meses"
  //     );
  //     if (!confirmation) {
  //       return;
  //     }
  //     dispatch(
  //       addFcmProcedure({
  //         step: activeStep,
  //         procedureType: "renewal",
  //         dataId: values._id,
  //       })
  //     );
  //   }
  //   dispatch(setFcmPackageNeedsConfirmation(false));
  //   // setneedsConfirmation(false);
  //   dispatch(handleFcmCompleteStep());
  // };

  /*************************************************************************************************** */
  /************************** RENDER *******************************************************/
  /*************************************************************************************************** */

  return (
    <Fragment>
      {!isPreviousDataLoaded && (
        <Card sx={{ padding: "2rem" }}>
          <Typography>
            Para poder realizar este paso antes es necesario completar los pasos
            relativos al propietario del perro y al perro.
          </Typography>
        </Card>
      )}
      {isPreviousDataLoaded && (
        <Fragment>
          <Typography component="h2" variant="h5" mb="2rem">
            {formTitle}
          </Typography>

          {!isEditable && (
            <Box sx={{ mb: "3rem" }}>
              <Typography sx={{ mb: "2rem", lineHeight: "1.5" }}>
                Los datos de socio del propietario del padre han sido llenados,
                puedes continuar con el paso siguiente, editar los datos o
                remover la selección.
              </Typography>
              <Box
                sx={{ display: "flex", width: "100%", gap: "3rem", mb: "3rem" }}
              >
                {needsConfirmation ? (
                  <Button
                    variant="contained"
                    fullWidth={true}
                    // onClick={() => {
                    //   handleConfirmation();
                    // }}
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
                    dispatch(setFcmPackageEditable(true));
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
              Si los datos del nuevo propietario o del perro a transferir son
              incorrectos, es necesario desvincular o editar el formato que da
              origen a este.
            </Typography>
          </Box>

          {/* Formik */}

          <Grid container spacing={2} mb="3rem">
            <Grid item xs={12}>
              <Typography component="h4" variant="h5">
                Datos del perro a transferir
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="petName"
                label="Nombre"
                disabled={true}
                value={fcmDog.petName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="registerNum"
                label="Número de registro"
                disabled={true}
                value={fcmDog.registerNum}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb="3rem">
            <Grid item xs={12}>
              <Typography component="h4" variant="h5">
                Datos del nuevo propietario
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="fullName"
                label="Nombre"
                disabled={true}
                value={`${fcmPartner.firstName} ${fcmPartner.paternalSurname} ${fcmPartner.maternalSurname}`}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="partnerNum"
                label="Número de socio"
                disabled={true}
                value={fcmPartner.partnerNum}
                fullWidth
              />
            </Grid>
          </Grid>

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
                {/* DATOS DE IDENTIFICACIÓN */}

                {/* SECTION IMAGES */}
                <Grid item xs={12}>
                  <Typography component="h4" variant="h5" mb="2rem">
                    Datos del propietario anterior
                  </Typography>
                </Grid>
                {/* tarjeta de socio */}
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper
                    name="firstName"
                    label="Nombre (s)"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper
                    name="paternalSurname"
                    label="Apellido paterno"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper
                    name="maternalSurname"
                    label="Apellido materno"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography mb="2rem">INE frente</Typography>
                  <DragImageUpload
                    files={filesFrontINE}
                    setFiles={setfilesFrontINE}
                    imgUrl={imgUrlFrontIne}
                    setimgUrl={setImgUrlFrontIne}
                    editable={isEditable}
                  ></DragImageUpload>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography mb="2rem">INE reverso</Typography>
                  <DragImageUpload
                    files={filesBackINE}
                    setFiles={setfilesBackINE}
                    imgUrl={imgUrlBackIne}
                    setimgUrl={setImgUrlBackIne}
                    editable={isEditable}
                  ></DragImageUpload>
                </Grid>
                {/* DATOS DE IDENTIFICACIÓN */}
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
      )}
    </Fragment>
  );
};
