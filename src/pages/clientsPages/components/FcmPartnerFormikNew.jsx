import React, { Fragment, useEffect } from "react";

import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  createFcmPartner,
  updateFcmPartner,
} from "../../../actions/fcmActions";
import {
  fireSwalConfirmation,
  fireSwalError,
  isObjectEmpty,
  setUrlValueOrRefreshImage,
} from "../../../helpers/utilities";
import { Box, Button, Grid, Typography } from "@mui/material";
import { TextFieldWrapper } from "../../../components/formsUI/TextFieldWrapper";
import { DatePickerFieldWrapper } from "../../../components/formsUI/DatePickerFieldWrapper";
import { ButtonFormWrapper } from "../../../components/formsUI/ButtonFormWrapper";
import { DragImageUpload } from "../../../components/formsUI/DragImageUpload";
import { useState } from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { fireSwalWait } from "../../../helpers/sweetAlertUtilities";

export const FcmPartnerFormikNew = ({ ...props }) => {
  const {
    stepData: fcmPartnerData,
    stepProps,
    handleSubmitForm,
    handleCancel,
  } = props;
  const { isFirstRegister, isCardLost, isEditable } = stepProps;
  const dispatch = useDispatch();

  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  //#region

  const [filesFcmPartner, setfilesFcmPartner] = useState([]);
  const [filesProofOfResidency, setfilesProofOfResidency] = useState([]);
  const [filesFrontINE, setfilesFrontINE] = useState([]);
  const [filesBackINE, setfilesBackINE] = useState([]);
  const [imgUrlPartnerCard, setImgUrlPartnerCard] = useState(null);
  const [imgUrlProofOfResidency, setImgUrlProofOfResidency] = useState(null);
  const [imgUrlFrontIne, setImgUrlFrontIne] = useState(null);
  const [imgUrlBackIne, setImgUrlBackIne] = useState(null);
  const [isIncomplete, setisIncomplete] = useState(false);

  //#endregion
  /*************************************************************************************************** */
  /************************** Initial values and validation *******************************************************/
  /*************************************************************************************************** */
  //#region
  let initialValues = {
    firstName: "",
    paternalSurname: "",
    maternalSurname: "",
    partnerNum: "",
    expirationDate: "",
    address: {
      street: "",
      number: "",
      suburb: "",
      postalCode: "",
      city: "",
      state: "Yucatán",
      country: "México",
    },
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
    address: Yup.object({
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
    }),

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

  if (!isIncomplete) {
    validationParams = {
      ...validationParams,
      partnerNum: Yup.string().trim().required("Es obligatorio"),
      expirationDate: Yup.date().required("Es obligatorio"),
    };
  }

  let formValidation = Yup.object().shape(validationParams);

  const [formValues, setformValues] = useState(initialValues);

  //#endregion
  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */
  //#region

  const handleConfirmRenewal = async (values) => {
    if (dayjs(values.expirationDate).isBefore(dayjs().add(14, "days"))) {
      const confirmation = await fireSwalConfirmation(
        "La tarjeta ha expirado o expirará pronto. Se agregará al paquete una renovación de socio. Antes de confirmar, verificar que el comprobante domiciliario no sea anterior a 3 meses"
      );
      if (!confirmation) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (values) => {
    // if the date is going to expire in the next 2 weeks ask confirmatio
    if (!(await handleConfirmRenewal(values))) {
      return;
    }
    fireSwalWait();

    // images validation
    if (!isIncomplete) {
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

    if (!isIncomplete) {
      newValues = await setUrlValueOrRefreshImage(
        newValues,
        filesFcmPartner,
        "urlPartnerCard",
        imgUrlPartnerCard
      );
      newValues.isPending = false;
    } else {
      // if is incomplete: or is a first register or is a cardLost
      newValues.expirationDate = null;
      if (isCardLost) {
        newValues.partnerNum = `Extravío - ${newValues.firstName} ${
          newValues.paternalSurname
        } - ${dayjs().format("DD-MMM-YYYY HH:mm")}`;
        newValues.isCardLost = true;
        newValues.isPending = false;
      }
      if (isFirstRegister) {
        newValues.partnerNum = `En trámite - ${newValues.firstName} ${
          newValues.paternalSurname
        } - ${dayjs()}`;
        newValues.isCardLost = false;
        newValues.isPending = true;
      }
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

    Swal.close();
    let fcmPartner = null;
    // if there is an ID: update. If not: create
    if (newValues._id) {
      fcmPartner = await dispatch(updateFcmPartner(newValues));
    } else {
      fcmPartner = await dispatch(createFcmPartner(newValues));
    }
    // if there is an error in the dispach return
    if (!fcmPartner) {
      return;
    }
    handleSubmitForm(fcmPartner);
  };

  //#endregion
  /*************************************************************************************************** */
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */
  //#region
  // find fcmPartner and set it active (searching from id)
  useEffect(() => {
    if (fcmPartnerData) {
      setImgUrlPartnerCard(fcmPartnerData.urlPartnerCard);
      setImgUrlProofOfResidency(fcmPartnerData.urlProofOfResidency);
      setImgUrlFrontIne(fcmPartnerData.urlFrontIne);
      setImgUrlBackIne(fcmPartnerData.urlBackIne);
      fcmPartnerData.expirationDate = dayjs(
        fcmPartnerData.expirationDate
      ).format("YYYY-MM-DD");

      setformValues({ ...fcmPartnerData });
    } else {
      setImgUrlPartnerCard(null);
      setImgUrlProofOfResidency(null);
      setImgUrlFrontIne(null);
      setImgUrlBackIne(null);
    }
  }, []);

  // todo review
  useEffect(() => {
    if (!isObjectEmpty(fcmPartnerData)) {
      setisIncomplete(fcmPartnerData.isPending || fcmPartnerData.isCardLost);
    } else {
      setisIncomplete(isFirstRegister || isCardLost);
    }
  }, []);

  //#endregion
  /*************************************************************************************************** */
  /************************** RENDER *******************************************************/
  /*************************************************************************************************** */

  return (
    <Formik
      initialValues={{ ...formValues }}
      validationSchema={formValidation}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      enableReinitialize
    >
      {({ values, errors, isSubmitting, isValid }) => (
        <Form>
          <Grid container spacing={2}>
            {/* SECTION IMAGES */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography component="h4" variant="h5" mb="2rem">
                    Imágenes
                  </Typography>
                </Grid>
                {/* tarjeta de socio */}
                {!isIncomplete && (
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
              </Grid>
            </Grid>

            {/* DATOS DE IDENTIFICACIÓN */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
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
                {!isIncomplete && (
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
              </Grid>
            </Grid>

            {/* ADDRESS */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography component="h4" variant="h5">
                    Dirección
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextFieldWrapper
                    name="address.street"
                    label="Calle"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextFieldWrapper
                    name="address.number"
                    label="Número"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextFieldWrapper
                    name="address.suburb"
                    label="Colonia o fraccionamiento"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextFieldWrapper
                    name="address.postalCode"
                    label="Código postal"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper
                    name="address.city"
                    label="Ciudad"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper
                    name="address.state"
                    label="State"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper
                    name="address.country"
                    label="Country"
                    disabled={!isEditable}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* CONTACT */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
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
              </Grid>
            </Grid>

            {/* BUTTONS */}

            {isEditable && (
              <Grid item xs={12} mb={2}>
                <Box sx={{ display: "flex", width: "100%", gap: "3rem" }}>
                  <ButtonFormWrapper> Guardar</ButtonFormWrapper>

                  <Button
                    variant="contained"
                    fullWidth={true}
                    onClick={handleCancel}
                    color="error"
                  >
                    Cancelar
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
          <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
        </Form>
      )}
    </Formik>
  );
};
