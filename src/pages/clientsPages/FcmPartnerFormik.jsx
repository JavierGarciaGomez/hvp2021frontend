import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  createFcmPartner,
  setFcmPackage,
  setFcmPackageNeedsConfirmation,
  setFcmPackageProperty,
  setFcmPackageStep,
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

export const FcmPartnerFormik = () => {
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
    isFirstRegister,
    isEditable,
    packageProperty,
    needsConfirmation,
    formTitle,
    showCancel,
  } = currentProps;

  const [filesFcmPartnerCard, setfilesFcmPartnerCard] = useState([]);
  const [filesProofOfResidency, setfilesProofOfResidency] = useState([]);
  const [filesFrontINE, setfilesFrontINE] = useState([]);
  const [filesBackINE, setfilesBackINE] = useState([]);
  const [imgUrlPartnerCard, setImgUrlPartnerCard] = useState(null);
  const [imgUrlProofOfResidency, setImgUrlProofOfResidency] = useState(null);
  const [imgUrlFrontIne, setImgUrlFrontIne] = useState(null);
  const [imgUrlBackIne, setImgUrlBackIne] = useState(null);

  const [fcmPartner, setfcmPartner] = useState(null);
  const [isPending, setisPending] = useState(false);

  /*************************************************************************************************** */
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */

  // find fcmPartner and set it active (searching from id)
  useEffect(() => {
    if (!isObjectEmpty(client)) {
      let found = client.linkedFcmPartners.find((el) => el._id === id);
      // set active fcmPartner
      if (found) {
        // set the image found to be used in the component
        setImgUrlPartnerCard(found.urlPartnerCard);
        setImgUrlProofOfResidency(found.urlProofOfResidency);
        setImgUrlFrontIne(found.urlFrontIne);
        setImgUrlBackIne(found.urlBackIne);

        found.expirationDate = dayjs(found.expirationDate).format("YYYY-MM-DD");
        const { address } = found;

        const foundWithAddress = { ...found, ...address };

        return setformValues(foundWithAddress);
      }
    }
  }, []);

  // find fcmPartner and set it active (searching from package)
  useEffect(() => {
    if (fcmPackage[packageProperty]) {
      let found = client.linkedFcmPartners.find(
        (el) => el._id === fcmPackage[packageProperty]
      );

      setfcmPartner(found);

      // set active fcmPartner
      if (found) {
        // set the image found to be used in the component
        setImgUrlPartnerCard(found.urlPartnerCard);
        setImgUrlProofOfResidency(found.urlProofOfResidency);
        setImgUrlFrontIne(found.urlFrontIne);
        setImgUrlBackIne(found.urlBackIne);

        found.expirationDate = dayjs(found.expirationDate).format("YYYY-MM-DD");
        const { address } = found;

        const foundWithAddress = { ...found, ...address };

        return setformValues(foundWithAddress);
      }
    }
  }, [fcmPackage]);

  useEffect(() => {
    if (fcmPartner && fcmPartner.isPending) {
      setisPending(fcmPartner.isPending);
    } else {
      setisPending(isFirstRegister);
    }
  }, [isFirstRegister, fcmPartner]);

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

  const handleSubmit = async (values) => {
    // if the date is going to expire in the next 2 weeks ask confirmatio

    if (dayjs(values.expirationDate).isBefore(dayjs().add(14, "days"))) {
      const confirmation = await fireSwalConfirmation(
        "La tarjeta ha expirado o expirará pronto. Se agregará al paquete una renovación de socio. Antes de confirmar, verificar que el comprobante domiciliario no sea anterior a 3 meses"
      );
      if (!confirmation) {
        return;
      }

      dispatch(
        setFcmPackage({
          ...fcmPackage,
          procedures: includeInPackage(
            fcmPackage.procedures,
            {
              packageProperty,
              procedure: "fcmRenewal",
              _id: values._id,
            },
            packageProperty
          ),
        })
      );
    }
    Swal.fire({
      title: "Cargando información",
      text: "Por favor, espere",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    if (!isPending) {
      if (filesFcmPartnerCard.length === 0 && !imgUrlPartnerCard) {
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
        filesFcmPartnerCard,
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

    // if there is an ID: update. If not: create
    if (newValues._id) {
      Swal.close();
      const fcmPartnerId = await dispatch(updateFcmPartner(newValues));
      dispatch(
        setFcmPackage({
          ...fcmPackage,
          currentProps: {
            ...fcmPackage.currentProps,
            isEditable: false,
          },
        })
      );

      if (fcmPartnerId) {
        if (fcmPackage) {
          dispatch(setFcmPackageProperty(fcmPartnerId));
          dispatch(setFcmPackageStep(activeStep + 1));
        }
        // navigate to previous page or profile
        // navigate(`/dashboard/documentation`);
      }
    } else {
      Swal.close();
      const fcmPartnerId = await dispatch(createFcmPartner(newValues));
      if (fcmPartnerId) {
        // submit to parent
        if (fcmPackage) {
          dispatch(setFcmPackageProperty(fcmPartnerId));
          dispatch(setFcmPackageStep(activeStep + 1));
        }
        // navigate(`/dashboard/documentation`);
      }
    }
  };

  const handleConfirmation = async () => {
    const values = { ...fcmPartner };

    if (dayjs(values.expirationDate).isBefore(dayjs().add(14, "days"))) {
      const confirmation = await fireSwalConfirmation(
        "La tarjeta ha expirado o expirará pronto. Se agregará al paquete una renovación de socio. Antes de confirmar, verificar que el comprobante domiciliario no sea anterior a 3 meses"
      );
      if (!confirmation) {
        return;
      }
      dispatch(
        setFcmPackage({
          ...fcmPackage,
          procedures: includeInPackage(
            fcmPackage.procedures,
            {
              packageProperty,
              procedure: "fcmRenewal",
              _id: values._id,
            },
            "packageProperty"
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
                  files={filesFcmPartnerCard}
                  setFiles={setfilesFcmPartnerCard}
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
                label="Nombre (s)*"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper
                name="paternalSurname"
                label="Apellido paterno*"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper
                name="maternalSurname"
                label="Apellido materno*"
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
