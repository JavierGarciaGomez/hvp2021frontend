import React, { useEffect } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Box, Button, Grid } from "@mui/material";
import { TextFieldWrapper } from "../../../components/formsUI/TextFieldWrapper";
import { DatePickerFieldWrapper } from "../../../components/formsUI/DatePickerFieldWrapper";
import { ButtonFormWrapper } from "../../../components/formsUI/ButtonFormWrapper";
import { useState } from "react";
import { SelectWrapper } from "../../../components/formsUI/SelectWrapper";

/*************************************************************************************************** */
/************************** Initial values and validation *******************************************************/
/*************************************************************************************************** */

const emptyFormValues = {
  petName: "",
  breed: "",
  color: "",
  sex: "",
  birthDate: "",
  size: "",
  birthPlace: "",
};
const validationSchema = Yup.object().shape({
  petName: Yup.string().trim().required("Es obligatorio"),
  breed: Yup.string().trim().required("Es obligatorio"),
  color: Yup.string().trim().required("Es obligatorio"),
  sex: Yup.string().trim().required("Es obligatorio"),
  birthDate: Yup.date().required("Es obligatorio"),
  size: Yup.string().trim().required("Es obligatorio"),
  birthPlace: Yup.string().trim().required("Es obligatorio"),
});

export const FcmUnregisteredDogForm = ({ onSubmit, formValues = null, onCancel, isEditable = true, ...props }) => {
  console.log({ isEditable });
  console.log("unregistered", { ...props });
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const [initialFormValues, setInitialFormValues] = useState(emptyFormValues);

  // TODO: When to delete puppies: a) when reset. All clear. b) Cuando se da click a eliminar cachorro.

  /*************************************************************************************************** */
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */

  useEffect(() => {
    if (formValues) {
      setInitialFormValues({ ...formValues });
    } else {
      setInitialFormValues(emptyFormValues);
    }
  }, [formValues]);

  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */

  /*************************************************************************************************** */
  /************************** RENDER *******************************************************/
  /*************************************************************************************************** */

  return (
    <Formik
      initialValues={{ ...initialFormValues }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      enableReinitialize
    >
      {({ values, errors, isSubmitting, isValid, resetForm }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextFieldWrapper name="petName" label="Nombre" disabled={!isEditable} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFieldWrapper name="breed" label="Raza" disabled={!isEditable} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper name="color" label="Color" disabled={!isEditable} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <SelectWrapper
                    name="sex"
                    label="Sexo"
                    disabled={!isEditable}
                    options={{
                      MALE: "MACHO",
                      FEMALE: "HEMBRA",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper name="size" label="Tamaño" disabled={!isEditable} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePickerFieldWrapper name="birthDate" label="Fecha de nacimiento" disabled={!isEditable} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFieldWrapper name="birthPlace" label="Lugar de nacimiento" disabled={!isEditable} />
                </Grid>
              </Grid>
            </Grid>

            {/* BUTTONS */}

            {isEditable && (
              <Grid item xs={12} mb={2}>
                <Box sx={{ display: "flex", width: "100%", gap: "3rem" }}>
                  <ButtonFormWrapper> Guardar</ButtonFormWrapper>
                  {formValues && (
                    <Button
                      variant="contained"
                      fullWidth={true}
                      onClick={() => {
                        resetForm();
                        onCancel();
                      }}
                      color="error"
                    >
                      Cancelar
                    </Button>
                  )}
                </Box>
              </Grid>
            )}
          </Grid>
          <Box>
            <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
