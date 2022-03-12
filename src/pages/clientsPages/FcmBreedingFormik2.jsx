import React, { Fragment, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  addFcmProcedure,
  addNewFcmStep,
  cleanFcmStep,
  handleFcmCompleteStep,
  handleNextFcmPackageStep,
  setFcmBreedingForm,
  setFcmCurrentStepConfig,
  setFcmCurrentStepEditable,
  setFcmPackageEditable,
  setFcmPackageNeedsConfirmation,
} from "../../actions/fcmActions";
import {
  fireSwalConfirmation,
  fireSwalError,
  isObjectEmpty,
} from "../../helpers/utilities";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { TextFieldWrapper } from "../../components/formsUI/TextFieldWrapper";
import { DatePickerFieldWrapper } from "../../components/formsUI/DatePickerFieldWrapper";
import { ButtonFormWrapper } from "../../components/formsUI/ButtonFormWrapper";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { SelectWrapper } from "../../components/formsUI/SelectWrapper";
import { CheckboxInputWrapper } from "../../components/formsUI/CheckboxInputWrapper";
import {
  generatePuppiesValidationParams,
  generatePuppiesValues,
  getTransferStepLabel,
} from "../../helpers/fcmUtilities";
import { fireSwalWait } from "../../helpers/sweetAlertUtilities";

export const FcmBreedingFormik2 = ({ label }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const { id } = useParams();
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { activeStep, steps, breedingForm } = fcmPackage;
  const { config } = steps[activeStep];
  const { isEditable, needsConfirmation, formTitle, showCancel } = config;

  const [fcmDog, setfcmDog] = useState(null);
  const [registersAmount, setregistersAmount] = useState("");
  const [puppiesRegisters, setpuppiesRegisters] = useState([]);
  const [componentData, setcomponentData] = useState(null);
  const formRef = useRef(null);

  /*************************************************************************************************** */
  /************************** Initial values and validation *******************************************************/
  /*************************************************************************************************** */

  let initialValues = {
    breedingDate: "",
    birthDate: "",
    birthPlace: "",
    malesAlive: "",
    femalesAlive: "",
    death: "",
    registersAmount: "",
    puppies: [{ puppyName: "", puppySex: "", puppyNeedsTransfer: "" }],
  };

  let initialValidationParams = {
    breedingDate: Yup.date().required("Es obligatorio"),
    birthDate: Yup.date().required("Es obligatorio"),
    birthPlace: Yup.string().trim().required("Es obligatorio"),
    malesAlive: Yup.number().required("Es obligatorio"),
    femalesAlive: Yup.number().required("Es obligatorio"),
    registersAmount: Yup.number().required("Es obligatorio"),
    death: Yup.number().required("Es obligatorio"),
    puppies: Yup.array(
      Yup.object({
        puppyName: Yup.string().required("Es obligatorio"),
        puppySex: Yup.string().required("Es obligatorio"),
        puppyNeedsTransfer: Yup.boolean(),
      })
    )
      .min(1, "Al menos debe haber un cachorro")
      .max(14, "No pueden haber más de catorce cachorros"),
  };

  const [validationParams, setvalidationParams] = useState(
    initialValidationParams
  );
  const [formValidation, setformValidation] = useState(
    Yup.object().shape(validationParams)
  );
  const [formValues, setformValues] = useState(initialValues);

  const handleConfirmPuppiesTransfer = async (values) => {
    let puppiesTransfers = [];
    for (let i = 1; i <= registersAmount; i++) {
      if (values[`puppyNeedsTransfer${i}`]) {
        puppiesTransfers.push(i + 1);
      }
    }
    if (puppiesTransfers.length > 0) {
      const confirmation = await fireSwalConfirmation(
        `Se está solicitando la transferencia de ${puppiesTransfers.length} cachorros. Por lo que se agregarán los trámites correspondientes`
      );
      if (!confirmation) {
        return false;
      } else {
        puppiesTransfers.map((element, index) => {
          dispatch(
            addFcmProcedure({
              step: activeStep,
              procedureType: "transfer",
              dataId: values._id,
            })
          );
          dispatch(
            addNewFcmStep({
              label: getTransferStepLabel(
                activeStep,
                values[`puppyName${index + 1}`]
              ),
              componentName: "FcmPartnerFormik",
              props: {
                label: "Formato de transferencia",
              },
              stepFromOrigin: activeStep,
              stepDataId: "",
              config: {
                isFirstRegister: false,
                isEditable: true,
                formTitle: "Llena el formulario",
                showCancel: false,
                needsConfirmation: false,
              },
            })
          );
        });
      }
    }
    return true;
  };

  const handleSubmit = async (values) => {
    if (!(await handleConfirmPuppiesTransfer(values))) {
      return;
    }
    fireSwalWait();
    // check transfer puppies
    for (let i = 0; i < registersAmount; i++) {
      if (values[`puppyNeedsTransfer${i + 1}`]) {
      }
    }

    Swal.close();
    let newValues = { ...values };
    newValues.registersAmount = registersAmount;

    // if there is an ID: update. If not: create
    Swal.close();
    dispatch(setFcmBreedingForm(newValues));
    dispatch(
      setFcmCurrentStepConfig({ needsConfirmation: false, isEditable: false })
    );
    dispatch(handleFcmCompleteStep());
  };

  /*************************************************************************************************** */
  /************************** RENDER *******************************************************/
  /*************************************************************************************************** */

  return (
    <Fragment>
      <Typography variant="h4" component="h2" mb="3rem">
        {label}
      </Typography>
      <Typography component="h2" variant="h5" mb="2rem">
        {formTitle}
      </Typography>

      {!isEditable && (
        <Box sx={{ mb: "3rem" }}>
          <Typography sx={{ mb: "2rem", lineHeight: "1.5" }}>
            Los datos han sido llenados, puedes continuar con el paso siguiente,
            editar los datos o remover la selección.
          </Typography>
          <Box sx={{ display: "flex", width: "100%", gap: "3rem", mb: "3rem" }}>
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
                setformValues(initialValues);
                setregistersAmount(0);
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
          En número de registros se establece a cuántos de los cachorros se
          expedirá pedigrí. Si se cambia este número se reiniciará el
          formulario.
        </Typography>
        <Typography mb="1rem">
          En el llenado de los cachorros, primero poner los machos y después las
          hembras.
        </Typography>
      </Box>

      {/* Formik */}

      <Formik
        // initialValues={{
        //   fullName: "",
        //   donationsAmount: 0,
        //   termsAndConditions: false,
        //   donations: [{ institution: "", percentage: 0 }],
        // }}
        initialValues={{ ...formValues }}
        // validationSchema={formValidation}
        // enableReinitialize

        onSubmit={async (values) => {
          console.log("my values", values);
          return new Promise((res) => setTimeout(res, 2500));
        }}
      >
        {({ values, errors, isSubmitting, isValid }) => (
          <Form autoComplete="off">
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
                      <Grid item xs={6} md={3}>
                        <TextFieldWrapper
                          name={`puppies.${index}.puppyName`}
                          label="Nombre"
                          disabled={!isEditable}
                        />
                      </Grid>
                      <Grid item xs={12} sm="auto">
                        <Button
                          disabled={isSubmitting}
                          onClick={() => remove(index)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Fragment>
                  ))}
                  <Grid item>
                    <Button
                      disabled={isSubmitting}
                      variant="contained"
                      onClick={() => push({})}
                    >
                      Add Donation
                    </Button>
                  </Grid>
                </Fragment>
              )}
            </FieldArray>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              startIcon={
                isSubmitting ? <CircularProgress size="0.9rem" /> : undefined
              }
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </Button>
            <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};
