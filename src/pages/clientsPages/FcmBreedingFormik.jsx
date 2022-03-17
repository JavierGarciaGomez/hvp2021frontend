import React, { Fragment, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  cleanFcmStep,
  handleFcmCompleteStep,
  handleNextFcmPackageStep,
  setFcmCurrentStepEditable,
  createFcmDog,
  updateFcmDog,
  updateStepReferences,
  addOrRemoveFcmTransferSteps,
  removeFcmSteps,
  addAndRemoveFcmProcedures,
  addOrRemoveFcmPartnerSteps,
  checkAndAddFcmPartnerStep,
  checkAndAddFcmTransferStep,
  addAndRemoveFcmCertificatesProcedures,
} from "../../actions/fcmActions";
import { fireSwalConfirmation, isObjectEmpty } from "../../helpers/utilities";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { TextFieldWrapper } from "../../components/formsUI/TextFieldWrapper";
import { DatePickerFieldWrapper } from "../../components/formsUI/DatePickerFieldWrapper";
import { ButtonFormWrapper } from "../../components/formsUI/ButtonFormWrapper";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { SelectWrapper } from "../../components/formsUI/SelectWrapper";
import { CheckboxInputWrapper } from "../../components/formsUI/CheckboxInputWrapper";
import {
  checkIfStepsAreCompleted,
  getTransferStepLabel,
} from "../../helpers/fcmUtilities";
import { fireSwalWait } from "../../helpers/sweetAlertUtilities";
import dayjs from "dayjs";

export const FcmBreedingFormik = ({ label }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */

  const { fcmPackage } = useSelector((state) => state.fcm);
  const { activeStep, steps, breedingForm, completedSteps } = fcmPackage;

  const { config } = steps[activeStep];
  const { isEditable, formTitle, showCancel } = config;

  const [registersAmount, setregistersAmount] = useState("");
  const [puppiesRegisters, setpuppiesRegisters] = useState([]);
  const [puppyTransfers, setPuppyTransfers] = useState([]);
  const [arePrevStepsCompleted, setAreprevStepsCompleted] = useState(false);
  const [haveParentsSameBreed, sethaveParentsSameBreed] = useState(false);

  // TODO: When to delete puppies: a) when reset. All clear. b) Cuando se da click a eliminar cachorro.
  /*************************************************************************************************** */
  /************************** Initial values and validation *******************************************************/
  /*************************************************************************************************** */

  console.log(haveParentsSameBreed);
  // todo: put this data again
  // let emptyPuppy = {
  //   petName: "",
  //   breed: steps[2].stepData?.breed || "",
  //   color: "",
  //   sex: "",
  //   birthDate: "",
  //   registerNum: "",
  //   registerType: "pedigree",
  //   urlFront: null,
  //   urlBack: null,
  //   isRegisterPending: true,
  //   isTransferPending: false,
  // };
  let emptyPuppy = {
    petName: "Perrito",
    breed: steps[2].stepData?.breed || "",
    color: "Azul",
    sex: "male",
    birthDate: "",
    registerNum: "",
    registerType: "pedigree",
    urlFront: null,
    urlBack: null,
    isRegisterPending: true,
    isTransferPending: true,
  };
  // todo: put this data again
  // let initialValues = {
  //   breedingDate: "",
  //   birthDate: "",
  //   birthPlace: "",
  //   malesAlive: "",
  //   femalesAlive: "",
  //   death: "",
  //   puppies: [emptyPuppy],
  // };

  let initialValues = {
    breedingDate: "2022-03-17",
    birthDate: "2022-03-17",
    birthPlace: "Merida",
    malesAlive: "1",
    femalesAlive: "1",
    death: "1",
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

  const [formValues, setformValues] = useState(initialValues);

  /*************************************************************************************************** */
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */

  useEffect(() => {
    setAreprevStepsCompleted(
      checkIfStepsAreCompleted(completedSteps, [0, 1, 2, 3])
    );
  }, []);

  // check if the parents are from the same breed
  useEffect(() => {
    if (arePrevStepsCompleted) {
      console.log(steps[2].stepData.breed.toLowerCase());
      console.log(steps[3].stepData.breed.toLowerCase());
      if (
        steps[2].stepData.breed.toLowerCase() ===
        steps[3].stepData.breed.toLowerCase()
      ) {
        sethaveParentsSameBreed(true);
      }
    }
  }, [arePrevStepsCompleted]);

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

  const handleSubmit = async (values) => {
    if (!(await handleConfirmPuppiesTransfer(values))) {
      return;
    }
    fireSwalWait();

    // check transfer puppies

    for (let i = 0; i < registersAmount; i++) {
      if (values[`isTransferPending${i + 1}`]) {
      }
    }

    // adding registers amount
    let newValues = { ...values };
    newValues.registersAmount = registersAmount;

    Swal.close();

    dispatch(removeFcmSteps());
    // create dogs as fcm
    let newPuppies = [];
    for (let puppy of values.puppies) {
      let fcmPuppy = null;
      puppy.birthDate = values.birthDate;
      puppy.registerNum = `En trámite - ${puppy.petName} - ${dayjs().format(
        "DD-MM-YY HH:mm"
      )}`;

      console.log("puppy", puppy);

      if (puppy._id) {
        fcmPuppy = await dispatch(updateFcmDog(puppy));
      } else {
        fcmPuppy = await dispatch(createFcmDog(puppy));
      }
      // replace pupy values with new puppy

      dispatch(checkAndAddFcmPartnerStep(fcmPuppy));
      dispatch(checkAndAddFcmTransferStep(fcmPuppy));
      dispatch(addAndRemoveFcmCertificatesProcedures(puppy));

      newPuppies.push(fcmPuppy);
    }

    newValues.puppies = newPuppies;

    dispatch(updateStepReferences(newValues));

    dispatch(handleFcmCompleteStep());
  };

  const handleConfirmPuppiesTransfer = async (values) => {
    // get the puppies with transfers
    setPuppyTransfers(
      values.puppies.filter((element) => element.isTransferPending)
    );

    if (puppyTransfers.length > 0) {
      const confirmation = await fireSwalConfirmation(
        `Se está solicitando la transferencia de ${puppyTransfers.length} cachorros. Por lo que se agregarán los trámites correspondientes`
      );
      if (!confirmation) {
        return false;
      }
    }
    return true;
  };

  /*************************************************************************************************** */
  /************************** RENDER *******************************************************/
  /*************************************************************************************************** */

  if (!arePrevStepsCompleted || !haveParentsSameBreed) {
    return (
      <Card sx={{ padding: "2rem" }}>
        <Typography>
          Para poder realizar este paso antes es necesario completar los 4 pasos
          anteriores y verificar que ambos padres sean de la misma raza.
        </Typography>
      </Card>
    );
  }

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
