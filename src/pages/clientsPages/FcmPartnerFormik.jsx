import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createFcmPartner, updateFcmPartner } from "../../actions/fcmActions";
import { uploadImg } from "../../helpers/uploadImg";
import {
  fireSwalError,
  isObjectEmpty,
  setUrlValueOrRefreshImage,
} from "../../helpers/utilities";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  Typography,
} from "@mui/material";
import { TextFieldWrapper } from "../../components/formsUI/TextFieldWrapper";
import { DatePickerFieldWrapper } from "../../components/formsUI/DatePickerFieldWrapper";
import { ButtonFormWrapper } from "../../components/formsUI/ButtonFormWrapper";
import { DragImageUpload } from "../../components/formsUI/DragImageUpload";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clientStartLoading } from "../../actions/clientsActions";
import dayjs from "dayjs";

export const FcmPartnerFormik = ({
  handleSetFatherOwnerId,
  handleNext,
  isFirstRegister = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { client } = useSelector((state) => state.clients);
  const { uid } = useSelector((state) => state.auth);
  const [filesFcmPartnerCard, setfilesFcmPartnerCard] = useState([]);
  const [filesProofOfResidency, setfilesProofOfResidency] = useState([]);
  const [filesFrontINE, setfilesFrontINE] = useState([]);
  const [filesBackINE, setfilesBackINE] = useState([]);
  const [imgUrlPartnerCard, setImgUrlPartnerCard] = useState(null);
  const [imgUrlProofOfResidency, setImgUrlProofOfResidency] = useState(null);
  const [imgUrlFrontIne, setImgUrlFrontIne] = useState(null);
  const [imgUrlBackIne, setImgUrlBackIne] = useState(null);

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

  if (!isFirstRegister) {
    validationParams = {
      ...validationParams,
      partnerNum: Yup.string().trim().required("Es obligatorio"),
      expirationDate: Yup.date().required("Es obligatorio"),
    };
  }

  let formValidation = Yup.object().shape(validationParams);

  const [formValues, setformValues] = useState(initialValues);

  // find fcmPartner and set it active
  useEffect(() => {
    if (!isObjectEmpty(client)) {
      let found = client.linkedFcmPartners.find((el) => el._id === id);
      // set active fcmPartner
      if (found) {
        console.log("esto encontré", found);
        // set the image found to be used in the component
        setImgUrlPartnerCard(found.urlPartnerCard);
        setImgUrlProofOfResidency(found.urlProofOfResidency);
        setImgUrlFrontIne(found.urlFrontIne);
        setImgUrlBackIne(found.urlBackIne);

        found.expirationDate = dayjs(found.expirationDate).format("YYYY-MM-DD");
        const { address } = found;

        const foundWithAddress = { ...found, ...address };
        console.log("foundwithaddress", foundWithAddress);

        return setformValues(foundWithAddress);
      }
    }
  }, [client]);

  const handleSubmit = async (values) => {
    // if there is no imgurl or no file, Error
    if (!isFirstRegister) {
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

    if (!isFirstRegister) {
      newValues = await setUrlValueOrRefreshImage(
        newValues,
        filesFcmPartnerCard,
        "urlPartnerCard",
        imgUrlPartnerCard
      );
    } else {
      newValues.partnerNum = `En trámite - ${newValues.firstName} ${newValues.paternalSurname}`;
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
      const fcmPartnerId = await dispatch(updateFcmPartner(newValues));

      if (fcmPartnerId) {
        if (handleSetFatherOwnerId) {
          handleSetFatherOwnerId(fcmPartnerId);
          handleNext();
        }
        // navigate to previous page or profile
        // navigate(`/dashboard/documentation`);
      }
    } else {
      const fcmPartnerId = await dispatch(createFcmPartner(newValues));
      if (fcmPartnerId) {
        // submit to parent
        if (handleSetFatherOwnerId) {
          handleSetFatherOwnerId(fcmPartnerId);
          handleNext();
        }
        // navigate(`/dashboard/documentation`);
      }
    }
  };

  return (
    <Fragment>
      <Typography component="h2" variant="h4" mb="2rem">
        Agrega una identificación de socio
      </Typography>

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
        <Typography component="h3" variant="h5" mb="2rem" fontWeight="bold">
          Notas:
        </Typography>
        <Typography mb="1rem">
          Solo es necesario llenar los datos marcados con un asterisco cuando se
          trate de vincular una tarjeta ajena a la cuenta.
        </Typography>
        <Typography mb="1rem">
          Cuando se trate de una tarjeta propia, de una nueva tarjeta o de una
          renovación, se deberán llenar todos los datos.
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
        <p></p>
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
            {!isFirstRegister && (
              <Grid item xs={12} md={6}>
                <Typography mb="2rem">Tarjeta de socio</Typography>
                <DragImageUpload
                  files={filesFcmPartnerCard}
                  setFiles={setfilesFcmPartnerCard}
                  imgUrl={imgUrlPartnerCard}
                  setimgUrl={setImgUrlPartnerCard}
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
              ></DragImageUpload>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography mb="2rem">INE frente</Typography>
              <DragImageUpload
                files={filesFrontINE}
                setFiles={setfilesFrontINE}
                imgUrl={imgUrlFrontIne}
                setimgUrl={setImgUrlFrontIne}
              ></DragImageUpload>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography mb="2rem">INE reverso</Typography>
              <DragImageUpload
                files={filesBackINE}
                setFiles={setfilesBackINE}
                imgUrl={imgUrlBackIne}
                setimgUrl={setImgUrlBackIne}
              ></DragImageUpload>
            </Grid>
            {/* DATOS DE IDENTIFICACIÓN */}
            <Grid item xs={12}>
              <Typography component="h4" variant="h5">
                Datos de Identificación
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper name="firstName" label="Nombre (s)*" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper
                name="paternalSurname"
                label="Apellido paterno*"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper
                name="maternalSurname"
                label="Apellido materno*"
              />
            </Grid>
            {!isFirstRegister && (
              <Fragment>
                <Grid item xs={12} md={6}>
                  <TextFieldWrapper
                    name="partnerNum"
                    label="Número de socio*"
                  />
                </Grid>{" "}
                <Grid item xs={12} md={6}>
                  <DatePickerFieldWrapper
                    name="expirationDate"
                    label="Fecha de expiración*"
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
              <TextFieldWrapper name="street" label="Calle" />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextFieldWrapper name="number" label="Número" />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextFieldWrapper
                name="suburb"
                label="Colonia o fraccionamiento"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextFieldWrapper name="postalCode" label="Código postal" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper name="city" label="Ciudad" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper name="state" label="State" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper name="country" label="Country" />
            </Grid>
            {/* CONTACT */}
            <Grid item xs={12}>
              <Typography component="h4" variant="h5">
                Contacto
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper name="homePhone" label="Teléfono" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper name="mobilePhone" label="Teléfono móvil" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldWrapper name="email" label="Correo electrónico" />
            </Grid>
            <Grid item xs={6}>
              <ButtonFormWrapper> Guardar</ButtonFormWrapper>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth={true}
                // onClick={handleSubmit}
                color="error"
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Fragment>
  );
};
