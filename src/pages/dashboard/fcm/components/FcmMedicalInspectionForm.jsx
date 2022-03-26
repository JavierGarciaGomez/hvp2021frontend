import React, { Fragment, useEffect, useState } from "react";
import { Button, Grid, InputLabel, Typography } from "@mui/material";
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
import { TextAreaWrapper } from "../../../../components/formsUI/TextAreaWrapper";

// todo set breed by step data

let initialValues = {
  inspectionDate: "",
  observations: "",
};
let initialValidationParams = {
  inspectionDate: Yup.date().required("Es obligatorio"),
  observations: Yup.string(),
};

export const FcmMedicalInspectionForm = (props) => {
  const {
    medicalInspectionData,
    showCancelButton = true,
    extraProps,
    onCancel,
    onSave,
  } = props;
  useEffect(() => {
    if (!isObjectEmpty(extraProps)) {
      setIsEditable(extraProps.isEditable);
    }
  }, [extraProps]);

  console.log(medicalInspectionData);

  const [isEditable, setIsEditable] = useState(true);
  const [formValues, setformValues] = useState(initialValues);

  useEffect(() => {
    if (!isObjectEmpty(medicalInspectionData)) {
      setformValues({ ...medicalInspectionData });
      setIsEditable(false);
    } else {
      setformValues(initialValues);
    }
  }, [medicalInspectionData]);

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
            <Grid item xs={6} md={12}>
              <DatePickerFieldWrapper
                name="inspectionDate"
                label="Fecha de inspección"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={6} md={12}>
              <InputLabel>Observaciones</InputLabel>
              <TextAreaWrapper
                name="observations"
                label="Observaciones"
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <Box sx={{ display: "flex", width: "100%", gap: "3rem" }}>
                {isEditable && (
                  <ButtonFormWrapper variant="text"> Guardar</ButtonFormWrapper>
                )}
                {!isEditable && (
                  <Button
                    fullWidth={true}
                    onClick={() => {
                      setIsEditable(true);
                    }}
                  >
                    Editar
                  </Button>
                )}

                {isEditable && showCancelButton && (
                  <Button
                    fullWidth={true}
                    onClick={() => {
                      resetForm();
                      setIsEditable(false);
                    }}
                    color="error"
                  >
                    Cancelar
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
          {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};
