import React, { Fragment, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  addFcmCertificateProcedure,
  addFcmProcedure,
  addNewFcmStep,
  cleanFcmStep,
  handleFcmCompleteStep,
  handleNextFcmPackageStep,
  removeFcmProcedure,
  removeFcmPuppiesTransfersSteps,
  setFcmBreedingForm,
  setFcmCurrentStepConfig,
  setFcmCurrentStepEditable,
  setFcmCurrentStepObject,
} from "../../actions/fcmActions";
import { fireSwalConfirmation, isObjectEmpty } from "../../helpers/utilities";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { TextFieldWrapper } from "../../components/formsUI/TextFieldWrapper";
import { DatePickerFieldWrapper } from "../../components/formsUI/DatePickerFieldWrapper";
import { ButtonFormWrapper } from "../../components/formsUI/ButtonFormWrapper";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { SelectWrapper } from "../../components/formsUI/SelectWrapper";
import { CheckboxInputWrapper } from "../../components/formsUI/CheckboxInputWrapper";
import { getTransferStepLabel } from "../../helpers/fcmUtilities";
import { fireSwalWait } from "../../helpers/sweetAlertUtilities";

export const FcmBreedingFormik = ({ label }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */

  const { fcmPackage } = useSelector((state) => state.fcm);
  const { activeStep, steps, breedingForm } = fcmPackage;
  const { config } = steps[activeStep];
  const { isEditable, formTitle, showCancel } = config;

  const [registersAmount, setregistersAmount] = useState("");
  const [puppiesRegisters, setpuppiesRegisters] = useState([]);

  /*************************************************************************************************** */
  /************************** Initial values and validation *******************************************************/
  /*************************************************************************************************** */

  let emptyPuppy = {
    puppyName: "",
    puppySex: "",
    puppyNeedsTransfer: false,
    puppyColor: "",
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
        puppyName: Yup.string().required("Es obligatorio"),
        puppySex: Yup.string().required("Es obligatorio"),
        puppyNeedsTransfer: Yup.boolean(),
        puppyColor: Yup.string().required("Es obligatorio"),
      })
    )
      .min(1, "Al menos debe haber un cachorro")
      .max(14, "No pueden haber más de catorce cachorros"),
  };

  const [formValues, setformValues] = useState(initialValues);

  /*************************************************************************************************** */
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */

  useEffect(() => {
    if (!isObjectEmpty(breedingForm)) {
      setformValues({ ...breedingForm });
    } else {
      setformValues(initialValues);
    }
  }, [breedingForm]);

  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */
  const handleConfirmPuppiesTransfer = async (values) => {
    // get the puppies with transfers
    let puppiesTransfers = values.puppies.filter(
      (element) => element.puppyNeedsTransfer
    );

    if (puppiesTransfers.length > 0) {
      const confirmation = await fireSwalConfirmation(
        `Se está solicitando la transferencia de ${puppiesTransfers.length} cachorros. Por lo que se agregarán los trámites correspondientes`
      );
      if (!confirmation) {
        return false;
      } else {
        puppiesTransfers.map((element, index) => {
          dispatch(
            addNewFcmStep({
              label: getTransferStepLabel(activeStep, element.puppyName),
              componentName: "FcmTransferPuppy",
              props: {
                label: getTransferStepLabel(activeStep, element.puppyName),
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
              stepObject: element,
            })
          );
        });
      }
    }
    // remove puppies without transfers
    dispatch(removeFcmPuppiesTransfersSteps(puppiesTransfers));

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

    dispatch(
      removeFcmProcedure({ stepFromOrigin: activeStep, type: "certificate" })
    );
    newValues.puppies.map((element) => {
      dispatch(
        addFcmCertificateProcedure({
          stepFromOrigin: activeStep,
          type: "certificate",
          data: element.puppyName,
          dataId: newValues._id,
        })
      );
    });

    dispatch(setFcmBreedingForm(newValues));
    dispatch(setFcmCurrentStepObject(newValues));
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
          Solo llenar los datos de los cachorros de los cuales se pretenda
          obtener el registro.
        </Typography>
        <Typography mb="1rem">
          En el llenado de los cachorros, primero poner los machos y después las
          hembras.
        </Typography>
      </Box>

      {/* Formik */}

      <Formik
        initialValues={{ ...formValues }}
        validationSchema={Yup.object().shape(initialValidationParams)}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        enableReinitialize
      >
        {({ values, errors, isSubmitting, isValid }) => (
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
                            name={`puppies.${index}.puppyName`}
                            label="Nombre"
                            disabled={!isEditable}
                          />
                        </Grid>
                        <Grid item xs={4} md={2}>
                          <SelectWrapper
                            name={`puppies.${index}.puppySex`}
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
                            name={`puppies.${index}.puppyColor`}
                            label="Color"
                            disabled={!isEditable}
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <CheckboxInputWrapper
                            name={`puppies.${index}.puppyNeedsTransfer`}
                            label="Se realizará cambio de propietario"
                            disabled={!isEditable}
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
                  </Box>
                </Grid>
              )}
            </Grid>
            <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};
