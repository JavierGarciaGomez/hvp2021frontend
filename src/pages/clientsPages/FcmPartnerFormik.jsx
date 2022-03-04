import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createFcmPartner, updateFcmPartner } from "../../actions/fcmActions";
import { uploadImg } from "../../helpers/uploadImg";
import { fireSwalError, isObjectEmpty } from "../../helpers/utilities";
import { Box, Button, Grid, Typography } from "@mui/material";
import { TextFieldWrapper } from "../../components/formsUI/TextFieldWrapper";
import { DatePickerFieldWrapper } from "../../components/formsUI/DatePickerFieldWrapper";
import { ButtonFormWrapper } from "../../components/formsUI/ButtonFormWrapper";
import { DragImageUpload } from "../../components/formsUI/DragImageUpload";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clientStartLoading } from "../../actions/clientsActions";
import dayjs from "dayjs";

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
  url: "",
};

let formValidation = Yup.object().shape({
  firstName: Yup.string().trim().required("Es obligatorio"),
  paternalSurname: Yup.string().trim().required("Es obligatorio"),
  maternalSurname: Yup.string().trim().required("Es obligatorio"),
  partnerNum: Yup.string().trim().required("Es obligatorio"),
  expirationDate: Yup.date().required("Es obligatorio"),
  postalCode: Yup.string()
    .trim()
    .length(5, "El código postal debe contar con cinco carácteres"),
  city: Yup.string().trim(),
  state: Yup.string().trim(),
  country: Yup.string().trim(),
  homePhone: Yup.string()
    .trim()
    .min(7, "Debe contar al menos con 7 carácteres"),
  mobilePhone: Yup.string()
    .trim()
    .min(7, "Debe contar al menos con 7 carácteres"),
  email: Yup.string().email("Debe ser una forma válida de email"),
  url: "",
});

export const FcmPartnerFormik = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { client } = useSelector((state) => state.clients);
  const { uid } = useSelector((state) => state.auth);
  const [files, setFiles] = useState([]);
  const [formValues, setformValues] = useState(initialValues);
  const [imgUrl, setimgUrl] = useState(null);

  // Load client
  useEffect(() => {
    if (isObjectEmpty(client)) {
      dispatch(clientStartLoading(uid));
    }
  }, [dispatch]);

  // find fcmPartner and set it active
  useEffect(() => {
    if (!isObjectEmpty(client)) {
      let found = client.linkedFcmPartners.find((el) => el._id === id);
      // set active fcmPartner
      if (found) {
        console.log("esto encontré", found);
        // set the image found to be used in the component
        setimgUrl(found.url);
        found.expirationDate = dayjs(found.expirationDate).format("YYYY-MM-DD");
        const foundWithAddress = { ...found, ...found.address };

        return setformValues(foundWithAddress);
      }
    }
  }, [client]);

  console.log("estos son los form values", formValues);

  const handleSubmit = async (values) => {
    // if there is no imgurl or no file, Error
    if (files.length === 0 && !imgUrl) {
      return fireSwalError("Se debe cargar la imagen de la tarjeta");
    }
    // if there is an imgUrl dont refresh the image
    if (files.length > 0) {
      const tempImgUrl = await uploadImg(files[0]);
      values.url = tempImgUrl;
    } else {
      values.url = imgUrl;
    }

    // convert values to address properties

    const { street, number, suburb, postalCode, city, state, country } = values;
    values.address = {
      street,
      number,
      suburb,
      postalCode,
      city,
      state,
      country,
    };

    // if there is an ID: update. If not: create
    if (values._id) {
      const succesfulDispatch = await dispatch(updateFcmPartner(values));

      if (succesfulDispatch) {
        // navigate to previous page or profile
        // navigate(`/dashboard/documentation`);
      }
    } else {
      const succesfulDispatch = await dispatch(createFcmPartner(values));
      if (succesfulDispatch) {
        // navigate(`/dashboard/documentation`);
      }
    }
  };

  return (
    <Fragment>
      <Typography component="h2" variant="h4" mb="2rem">
        Agrega una identificación de socio
      </Typography>

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
          Nota:
        </Typography>
        <Typography mb="1rem">
          Solo es necesario llenar los datos marcados con un asterisco cuando se
          trate de vincular una tarjeta ajena a la cuenta.
        </Typography>
        <Typography>
          Cuando se trate de una tarjeta propia, de una nueva tarjeta o de una
          renovación, se deberán llenar todos los datos.
        </Typography>
        <p></p>
      </Box>

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
            <Grid item xs={12}>
              <Typography component="h4" variant="h5" mb="2rem">
                Tarjeta
              </Typography>
              <Grid item xs={12} md={6}>
                <Typography mb="1rem">
                  Inserta una imagen de la tarjeta con un tamaño máximo de 1mb.
                  Si la tarjeta ya está vencida y cuentas con una nueva, es
                  necesario reemplazar la imagen.
                </Typography>
                <DragImageUpload
                  files={files}
                  setFiles={setFiles}
                  imgUrl={imgUrl}
                  setimgUrl={setimgUrl}
                ></DragImageUpload>
              </Grid>
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
            <Grid item xs={12} md={6}>
              <TextFieldWrapper name="partnerNum" label="Número de socio*" />
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              <DatePickerFieldWrapper
                name="expirationDate"
                label="Fecha de expiración*"
              />
            </Grid>
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
