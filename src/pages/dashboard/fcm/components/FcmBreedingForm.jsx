import React, { Fragment, useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { DatePickerFieldWrapper } from "../../../../components/formsUI/DatePickerFieldWrapper";
import { TextFieldWrapper } from "../../../../components/formsUI/TextFieldWrapper";
import { SelectWrapper } from "../../../../components/formsUI/SelectWrapper";
import { CheckboxInputWrapper } from "../../../../components/formsUI/CheckboxInputWrapper";
import { ButtonFormWrapper } from "../../../../components/formsUI/ButtonFormWrapper";
import { fireSwalError, isObjectEmpty } from "../../../../helpers/utilities";

// todo set breed by step data
let emptyPuppy = {
  petName: "",
  breed: "",
  color: "",
  sex: "",
  birthDate: "",
  registerNum: "",
  registerType: "pedigree",
  urlFront: null,
  urlBack: null,
  isRegisterPending: true,
  isTransferPending: false,
};

let initialValues = {
  breedingDate: "",
  birthDate: "",
  birthPlace: "",
  malesAlive: "",
  femalesAlive: "",
  death: "",
  puppies: [emptyPuppy],
};
let initialValidationParams = {
  breedingDate: Yup.date().required("Es obligatorio"),
  birthDate: Yup.date().required("Es obligatorio"),
  birthPlace: Yup.string().trim().required("Es obligatorio"),
  malesAlive: Yup.number().required("Es obligatorio"),
  femalesAlive: Yup.number().required("Es obligatorio"),
  death: Yup.number().required("Es obligatorio"),
  puppies: Yup.array(
    Yup.object({
      petName: Yup.string().required("Es obligatorio"),
      sex: Yup.string().required("Es obligatorio"),
      isTransferPending: Yup.boolean(),
      color: Yup.string().required("Es obligatorio"),
    })
  )
    .min(1, "Al menos debe haber un cachorro")
    .max(14, "No pueden haber más de catorce cachorros"),
};

export const FcmBreedingForm = (props) => {
  const {
    breedingData,
    showCancelButton = true,
    extraProps,
    onCancel,
    onSave,
    allowEditPuppiesTransfers,
  } = props;
  useEffect(() => {
    if (!isObjectEmpty(extraProps)) {
      setIsEditable(extraProps.isEditable);
    }
  }, [extraProps]);

  const [isEditable, setIsEditable] = useState(true);
  const [formValues, setformValues] = useState(initialValues);

  useEffect(() => {
    if (!isObjectEmpty(breedingData)) {
      setformValues({ ...breedingData });
      setIsEditable(false);
    } else {
      setformValues(initialValues);
    }
  }, [breedingData]);

  const handleSubmit = (values) => {
    onSave(values);
  };
  const handleCancel = () => {
    onCancel();
  };
  return (
    <Formik
      initialValues={{ ...formValues }}
      validationSchema={Yup.object().shape(initialValidationParams)}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      enableReinitialize
    >
      {({ values, errors, isSubmitting, isValid, resetForm }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h4" variant="h5">
                Datos de la cruza
              </Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <DatePickerFieldWrapper
                name="breedingDate"
                label="Fecha de cruza"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <DatePickerFieldWrapper
                name="birthDate"
                label="Fecha de nacimiento"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextFieldWrapper
                name="birthPlace"
                label="Lugar de nacimiento"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextFieldWrapper
                name="malesAlive"
                label="Machos vivos"
                disabled={!isEditable}
                type="number"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextFieldWrapper
                name="femalesAlive"
                label="Hembras vivas"
                disabled={!isEditable}
                type="number"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextFieldWrapper
                name="death"
                label="Muertos"
                disabled={!isEditable}
                type="number"
              />
            </Grid>
            <Grid item xs={12} mt="4rem">
              <Typography component="h4" variant="h5">
                Datos de los cachorros
              </Typography>
            </Grid>

            <FieldArray name="puppies">
              {({ push, remove }) => (
                <Fragment>
                  {values.puppies.map((_, index) => (
                    <Fragment key={index}>
                      <Grid item xs={12}>
                        <Typography
                          component="h5"
                          variant="h6"
                          textAlign={"center"}
                        >
                          {`Cachorro ${index + 1}`}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} md={3}>
                        <TextFieldWrapper
                          name={`puppies.${index}.petName`}
                          label="Nombre"
                          disabled={!isEditable}
                        />
                      </Grid>
                      <Grid item xs={4} md={2}>
                        <SelectWrapper
                          name={`puppies.${index}.sex`}
                          label="Sexo"
                          disabled={!isEditable}
                          options={{
                            male: "Macho",
                            female: "Hembra",
                          }}
                        />
                      </Grid>
                      <Grid item xs={4} md={2}>
                        <TextFieldWrapper
                          name={`puppies.${index}.color`}
                          label="Color"
                          disabled={!isEditable}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <CheckboxInputWrapper
                          name={`puppies.${index}.isTransferPending`}
                          label="Se realizará cambio de propietario"
                          disabled={!isEditable || !allowEditPuppiesTransfers}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        md={2}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {isEditable && (
                          <Button
                            disabled={isSubmitting}
                            onClick={() => {
                              if (values.puppies.length === 1) {
                                return;
                              }
                              if (
                                values.puppies[index].isTransferPending &&
                                !allowEditPuppiesTransfers
                              ) {
                                return fireSwalError(
                                  "No se puede eliminar un cachorro con una transferencia pendiente"
                                );
                              }
                              remove(index);
                            }}
                            color="error"
                          >
                            Eliminar
                          </Button>
                        )}
                      </Grid>
                    </Fragment>
                  ))}
                  {isEditable && (
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: "4rem",
                      }}
                    >
                      <Button
                        disabled={isSubmitting}
                        variant="contained"
                        color="secondary"
                        onClick={() => push(emptyPuppy)}
                      >
                        Agrega cachorro
                      </Button>
                    </Grid>
                  )}
                </Fragment>
              )}
            </FieldArray>

            {isEditable && (
              <Grid item xs={12} mb={2}>
                <Box sx={{ display: "flex", width: "100%", gap: "3rem" }}>
                  <ButtonFormWrapper> Guardar</ButtonFormWrapper>
                  {showCancelButton && (
                    <Button
                      variant="contained"
                      fullWidth={true}
                      onClick={() => {
                        resetForm();
                        handleCancel();
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
          <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
        </Form>
      )}
    </Formik>
  );
};
