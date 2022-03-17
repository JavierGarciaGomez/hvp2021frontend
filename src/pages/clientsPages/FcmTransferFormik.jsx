import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  addFcmProcedure,
  cleanFcmStep,
  createFcmtransfer,
  handleFcmCompleteStep,
  handleNextFcmPackageStep,
  setFcmCurrentStepDataId,
  setFcmCurrentStepEditable,
  updateFcmtransfer,
  updateStepReferences,
} from "../../actions/fcmActions";
import {
  fireSwalError,
  isObjectEmpty,
  setUrlValueOrRefreshImage,
} from "../../helpers/utilities";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { TextFieldWrapper } from "../../components/formsUI/TextFieldWrapper";

import { ButtonFormWrapper } from "../../components/formsUI/ButtonFormWrapper";
import { DragImageUpload } from "../../components/formsUI/DragImageUpload";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import {
  checkIfPreviousStepsAreFilled,
  getFcmDogIdByOriginStep,
  getFcmParterIdByOriginStep,
} from "../../helpers/fcmUtilities";
import { fireSwalWait } from "../../helpers/sweetAlertUtilities";

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
  const { formTitle, showCancel } = currentProps;
  const [filesFrontINE, setfilesFrontINE] = useState([]);
  const [filesBackINE, setfilesBackINE] = useState([]);
  const [imgUrlFrontIne, setImgUrlFrontIne] = useState(null);
  const [imgUrlBackIne, setImgUrlBackIne] = useState(null);
  const [fcmPartner, setfcmPartner] = useState(null);
  const [isPending, setisPending] = useState(false);
  const [fcmDog, setfcmDog] = useState({});
  const [isPreviousDataLoaded, setisPreviousDataLoaded] = useState(false);
  const { label, componentName, props, stepFromOrigin, dataId, config } =
    steps[activeStep];
  const { isEditable } = config;
  const [componentData, setcomponentData] = useState({});

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
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */

  console.log("im rendered");
  // check if there is already a saved transfer
  useEffect(() => {
    if (dataId) {
      let found = client.linkedFcmTransfers.find((el) => el._id === dataId);
      console.log("found", found);
      if (found) {
        setcomponentData({ ...found });
        setImgUrlFrontIne(found.previousOwner.urlFrontIne);
        setImgUrlBackIne(found.previousOwner.urlBackIne);
      }
    } else {
      setcomponentData(null);
      clearImgsData();
    }
  }, [dataId]);

  useEffect(() => {
    if (!isObjectEmpty(componentData)) {
      setformValues({ ...componentData.previousOwner });
    } else {
      setformValues({ ...initialValues });
    }
  }, [componentData]);

  // set fcmpartner and fcmdog
  useEffect(() => {
    console.log("fcmpackage", fcmPackage);
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

  console.log(
    "FCMDOG FCM PARTNER",
    fcmDog,
    fcmPartner,
    componentData,
    imgUrlBackIne,
    filesFrontINE
  );

  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */

  const clearImgsData = () => {
    setImgUrlBackIne(null);
    setImgUrlFrontIne(null);
    setfilesBackINE([]);
    setfilesFrontINE([]);
  };

  const handleSubmit = async (values) => {
    fireSwalWait("Cargando información", "Por favor, espere");
    Swal.fire({
      title: "Cargando información",
      text: "Por favor, espere",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    // check if the images are loaded
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

    // close sweet alert
    Swal.close();
    // set current step not editable
    // if there is an ID: update. If not: create
    let fcmTransfer = null;
    if (!finalValues._id) {
      fcmTransfer = await dispatch(createFcmtransfer(finalValues));
    } else {
      fcmTransfer = await dispatch(updateFcmtransfer(finalValues));
    }

    dispatch(
      addFcmProcedure({
        stepFromOrigin: activeStep,
        type: "transfer",
        data: fcmTransfer,
        dataId: fcmTransfer._id,
      })
    );
    dispatch(updateStepReferences(fcmTransfer));
    dispatch(setFcmCurrentStepEditable(false));

    dispatch(handleFcmCompleteStep());
    clearImgsData();

    // navigate(`/dashboard/documentation`);
  };

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
