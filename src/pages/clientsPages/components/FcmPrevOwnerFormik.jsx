import React, { Fragment, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Box, Button, Grid, Typography } from "@mui/material";
import { TextFieldWrapper } from "../../../components/formsUI/TextFieldWrapper";

import { DragImageUpload } from "../../../components/formsUI/DragImageUpload";
import { useState } from "react";
import { ButtonFormWrapper } from "../../../components/formsUI/ButtonFormWrapper";
import { fireSwalWait } from "../../../helpers/sweetAlertUtilities";
import { fireSwalError, isObjectEmpty, setUrlValueOrRefreshImage } from "../../../helpers/utilities";
import Swal from "sweetalert2";
import { propertiesToUpperCase } from "../../../helpers/objectUtilities";

let initialValues = {
  firstName: "",
  paternalSurname: "",
  maternalSurname: "",
  urlFrontIne: "",
  urlBackIne: "",
};

export const FcmPrevOwnerFormik = ({ handleSubmitForm, prevOwner, handleCancel }) => {
  const [filesFrontINE, setfilesFrontINE] = useState([]);
  const [filesBackINE, setfilesBackINE] = useState([]);

  const [formValues, setformValues] = useState(initialValues);

  let validationParams = {
    firstName: Yup.string().trim().required("Es obligatorio"),
    paternalSurname: Yup.string().trim().required("Es obligatorio"),
    maternalSurname: Yup.string().trim().required("Es obligatorio"),
  };

  let formValidation = Yup.object().shape(validationParams);

  useEffect(() => {
    if (!isObjectEmpty(prevOwner)) {
      return setformValues({ ...prevOwner });
    }
    setformValues(initialValues);
  }, []);

  const handleSubmit = async (values) => {
    const upperCaseValues = propertiesToUpperCase(values);

    fireSwalWait("Cargando información", "Por favor, espere");

    if (filesFrontINE.length === 0 && !values.urlFrontIne) {
      return fireSwalError("Se debe cargar la imagen frontal del INE");
    }
    if (filesBackINE.length === 0 && !values.urlBackIne) {
      return fireSwalError("Se debe cargar la imagen trasera del INE");
    }

    let newValues = { ...upperCaseValues };

    // if there is a new file refresh the image
    newValues = await setUrlValueOrRefreshImage(newValues, filesFrontINE, "urlFrontIne");
    newValues = await setUrlValueOrRefreshImage(newValues, filesBackINE, "urlBackIne");

    handleSubmitForm(newValues);
    Swal.close();
  };

  return (
    <Fragment>
      <Fragment>
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
          <Typography mb="1rem">Las imágenes deben tener un tamaño máximo de 1mb.</Typography>
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
          {({ values, errors, isSubmitting, isValid }) => (
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
                  <TextFieldWrapper name="firstName" label="Nombre (s)" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper name="paternalSurname" label="Apellido paterno" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper name="maternalSurname" label="Apellido materno" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography mb="2rem">INE frente</Typography>
                  <DragImageUpload files={filesFrontINE} imgUrl={values.urlFrontIne} setFiles={setfilesFrontINE}></DragImageUpload>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography mb="2rem">INE reverso</Typography>
                  <DragImageUpload files={filesBackINE} setFiles={setfilesBackINE} imgUrl={values.urlBackIne}></DragImageUpload>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <Box sx={{ display: "flex", width: "100%", gap: "3rem" }}>
                    <ButtonFormWrapper> Guardar</ButtonFormWrapper>

                    <Button variant="contained" fullWidth={true} onClick={handleCancel} color="error">
                      Cancelar
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
            </Form>
          )}
        </Formik>
      </Fragment>
    </Fragment>
  );
};
