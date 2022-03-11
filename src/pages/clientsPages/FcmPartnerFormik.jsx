import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  addFcmProcedure,
  cleanFcmStep,
  createFcmPartner,
  handleFcmCompleteStep,
  handleNextFcmPackageStep,
  setFcmCurrentStepConfig,
  setFcmCurrentStepDataId,
  setFcmCurrentStepEditable,
  setFcmPackageEditable,
  setFcmPackageProperty,
  updateFcmPartner,
} from "../../actions/fcmActions";
import {
  fireSwalConfirmation,
  fireSwalError,
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
import { fireSwalWait } from "../../helpers/sweetAlertUtilities";

export const FcmPartnerFormik = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const { id } = useParams();
  const { client } = useSelector((state) => state.clients);
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { activeStep, steps } = fcmPackage;

  const [filesFcmPartner, setfilesFcmPartner] = useState([]);
  const [filesProofOfResidency, setfilesProofOfResidency] = useState([]);
  const [filesFrontINE, setfilesFrontINE] = useState([]);
  const [filesBackINE, setfilesBackINE] = useState([]);
  const [imgUrlPartnerCard, setImgUrlPartnerCard] = useState(null);
  const [imgUrlProofOfResidency, setImgUrlProofOfResidency] = useState(null);
  const [imgUrlFrontIne, setImgUrlFrontIne] = useState(null);
  const [imgUrlBackIne, setImgUrlBackIne] = useState(null);

  const [isPending, setisPending] = useState(false);
  const { dataId, config } = steps[activeStep];
  const {
    isEditable,
    isFirstRegister,
    needsConfirmation,
    formTitle,
    showCancel,
  } = config;
  const [componentData, setcomponentData] = useState({});

  /*************************************************************************************************** */
  /************************** Initial values and validation *******************************************************/
  /*************************************************************************************************** */

  let initialValues = {
    firstName: "",
    paternalSurname: "",
    maternalSurname: "",
    partnerNum: "",
    expirationDate: "",
    street: "",
    number: "",
    suburb: "",
    postalCode: "",
    city: "",
    state: "Yucatán",
    country: "México",
    homePhone: "",
    mobilePhone: "",
    email: "",
    urlPartnerCard: "",
    urlProofOfResidency: "",
    urlFrontIne: "",
    urlBackIne: "",
  };

  let validationParams = {
    firstName: Yup.string().trim().required("Es obligatorio"),
    paternalSurname: Yup.string().trim().required("Es obligatorio"),
    maternalSurname: Yup.string().trim().required("Es obligatorio"),
    street: Yup.string().trim().required("Es obligatorio"),
    number: Yup.string().trim().required("Es obligatorio"),
    suburb: Yup.string().trim().required("Es obligatorio"),
    postalCode: Yup.string()
      .trim()
      .length(5, "El código postal debe contar con cinco carácteres")
      .required("Es obligatorio"),
    city: Yup.string().trim().required("Es obligatorio"),
    state: Yup.string().trim().required("Es obligatorio"),
    country: Yup.string().trim().required("Es obligatorio"),
    homePhone: Yup.string()
      .trim()
      .min(7, "Debe contar al menos con 7 carácteres"),
    mobilePhone: Yup.string()
      .trim()
      .min(7, "Debe contar al menos con 7 carácteres"),
    email: Yup.string()
      .email("Debe ser una forma válida de email")
      .required("Es obligatorio"),
  };

  if (!isPending) {
    validationParams = {
      ...validationParams,
      partnerNum: Yup.string().trim().required("Es obligatorio"),
      expirationDate: Yup.date().required("Es obligatorio"),
    };
  }

  let formValidation = Yup.object().shape(validationParams);

  const [formValues, setformValues] = useState(initialValues);

  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */

  const handleConfirmRenewal = async (values) => {
    console.log("HANDLE CONFIRM RENEWAL");
    if (dayjs(values.expirationDate).isBefore(dayjs().add(14, "days"))) {
      const confirmation = await fireSwalConfirmation(
        "La tarjeta ha expirado o expirará pronto. Se agregará al paquete una renovación de socio. Antes de confirmar, verificar que el comprobante domiciliario no sea anterior a 3 meses"
      );
      console.log("confirmation", confirmation);
      if (!confirmation) {
        return false;
      }
      dispatch(
        addFcmProcedure({
          step: activeStep,
          procedureType: "renewal",
          dataId: values._id,
        })
      );
    }
    return true;
  };

  const handleSubmit = async (values) => {
    // if the date is going to expire in the next 2 weeks ask confirmatio
    if (!(await handleConfirmRenewal(values))) {
      return;
    }
    fireSwalWait();

    if (!isPending) {
      if (filesFcmPartner.length === 0 && !imgUrlPartnerCard) {
        return fireSwalError("Se debe cargar la imagen de la tarjeta");
      }
    }
    if (filesProofOfResidency.length === 0 && !imgUrlProofOfResidency) {
      return fireSwalError(
        "Se debe cargar la imagen del comprobante domicilario"
      );
    }
    if (filesFrontINE.length === 0 && !imgUrlFrontIne) {
      return fireSwalError("Se debe cargar la imagen frontal del INE");
    }
    if (filesBackINE.length === 0 && !imgUrlBackIne) {
      return fireSwalError("Se debe cargar la imagen trasera del INE");
    }

    let newValues = { ...values };
    // if there is a new file refresh the image

    if (!isPending) {
      newValues = await setUrlValueOrRefreshImage(
        newValues,
        filesFcmPartner,
        "urlPartnerCard",
        imgUrlPartnerCard
      );
      newValues.isPending = false;
    } else {
      newValues.partnerNum = `En trámite - ${newValues.firstName} ${
        newValues.paternalSurname
      } - ${dayjs()}`;
      newValues.isPending = true;
      newValues.expirationDate = "";
    }
    newValues = await setUrlValueOrRefreshImage(
      newValues,
      filesProofOfResidency,
      "urlProofOfResidency",
      imgUrlProofOfResidency
    );
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

    // convert values to address properties

    const { street, number, suburb, postalCode, city, state, country } =
      newValues;
    newValues.address = {
      street,
      number,
      suburb,
      postalCode,
      city,
      state,
      country,
    };

    Swal.close();
    let fcmPartnerId = null;
    // if there is an ID: update. If not: create
    if (newValues._id) {
      fcmPartnerId = await dispatch(updateFcmPartner(newValues));
    } else {
      fcmPartnerId = await dispatch(createFcmPartner(newValues));
    }

    // if there is an error in the dispach return
    if (!fcmPartnerId) {
      return;
    }
    // TODO DELETE
    dispatch(setFcmPackageProperty(fcmPartnerId));

    dispatch(
      setFcmCurrentStepConfig({ needsConfirmation: false, isEditable: false })
    );
    dispatch(setFcmCurrentStepDataId(fcmPartnerId));
    dispatch(handleFcmCompleteStep());
  };

  const handleConfirmation = async () => {
    const values = { ...componentData };

    if (!(await handleConfirmRenewal(values))) {
      return;
    }

    dispatch(setFcmCurrentStepConfig({ needsConfirmation: false }));
    // setneedsConfirmation(false);
    dispatch(handleFcmCompleteStep());
  };

  /*************************************************************************************************** */
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */

  // find fcmPartner and set it active (searching from id)
  useEffect(() => {
    if (dataId) {
      let found = client.linkedFcmPartners.find((el) => el._id === dataId);

      if (found) {
        setImgUrlPartnerCard(found.urlPartnerCard);
        setImgUrlProofOfResidency(found.urlProofOfResidency);
        setImgUrlFrontIne(found.urlFrontIne);
        setImgUrlBackIne(found.urlBackIne);
        found.expirationDate = dayjs(found.expirationDate).format("YYYY-MM-DD");
        const { address } = found;

        const foundWithAddress = { ...found, ...address };

        setcomponentData({ ...foundWithAddress });
        setformValues({ ...foundWithAddress });
      }
    } else {
      setcomponentData(null);
      setImgUrlPartnerCard(null);
      setImgUrlProofOfResidency(null);
      setImgUrlFrontIne(null);
      setImgUrlBackIne(null);
    }
  }, [dataId]);

  useEffect(() => {
    if (!isObjectEmpty(componentData)) {
      setisPending(componentData.isPending);
    } else {
      setisPending(isFirstRegister);
    }
  }, [isFirstRegister, componentData]);

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
              ? "Socio seleccionado. Confirma los datos, edítalos o remueve para seleccionar otro socio."
              : "Los datos de socio del propietario del han sido llenados, puedes continuar con el paso siguiente, editar los datos o remover la selección."}
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
                // todo delete
                dispatch(setFcmPackageEditable(true));
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
          Si la tarjeta ya está vencida y cuentas con una nueva, es necesario
          reemplazar la imagen.
        </Typography>
        <Typography mb="1rem">
          Si se va a realizar la renovación de un nuevo socio, es importante que
          el comprobante domiciliario no sea anterior a 3 meses. En su caso,
          reemplazar la imagen
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
            {!isPending && (
              <Grid item xs={12} md={6}>
                <Typography mb="2rem">Tarjeta de socio</Typography>
                <DragImageUpload
                  files={filesFcmPartner}
                  setFiles={setfilesFcmPartner}
                  imgUrl={imgUrlPartnerCard}
                  setimgUrl={setImgUrlPartnerCard}
                  editable={isEditable}
                ></DragImageUpload>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Typography mb="2rem">Comprobante domicilario</Typography>
              <DragImageUpload
                files={filesProofOfResidency}
                setFiles={setfilesProofOfResidency}
                imgUrl={imgUrlProofOfResidency}
                setimgUrl={setImgUrlProofOfResidency}
                editable={isEditable}
              ></DragImageUpload>
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
            <Grid item xs={12}>
              <Typography component="h4" variant="h5">
                Datos de Identificación
              </Typography>
            </Grid>
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
            {!isPending && (
              <Fragment>
                <Grid item xs={12} md={6}>
                  <TextFieldWrapper
                    name="partnerNum"
                    label="Número de socio*"
                    disabled={!isEditable}
                  />
                </Grid>{" "}
                <Grid item xs={12} md={6}>
                  <DatePickerFieldWrapper
                    name="expirationDate"
                    label="Fecha de expiración*"
                    disabled={!isEditable}
                  />
                </Grid>
              </Fragment>
            )}

            {/* ADDRESS */}
            <Grid item xs={12}>
              <Typography component="h4" variant="h5">
                Dirección
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextFieldWrapper
                name="street"
                label="Calle"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextFieldWrapper
                name="number"
                label="Número"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextFieldWrapper
                name="suburb"
                label="Colonia o fraccionamiento"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextFieldWrapper
                name="postalCode"
                label="Código postal"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper
                name="city"
                label="Ciudad"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper
                name="state"
                label="State"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper
                name="country"
                label="Country"
                disabled={!isEditable}
              />
            </Grid>
            {/* CONTACT */}
            <Grid item xs={12}>
              <Typography component="h4" variant="h5">
                Contacto
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper
                name="homePhone"
                label="Teléfono"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper
                name="mobilePhone"
                label="Teléfono móvil"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={4} mb={2}>
              <TextFieldWrapper
                name="email"
                label="Correo electrónico"
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
