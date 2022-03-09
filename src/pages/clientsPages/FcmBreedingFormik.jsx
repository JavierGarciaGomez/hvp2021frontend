import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  addFcmProcedure,
  addNewFcmStep,
  cleanFcmStep,
  createFcmDog,
  handleFcmCompleteStep,
  handleNextFcmPackageStep,
  setFcmPackageEditable,
  setFcmPackageNeedsConfirmation,
  setFcmPackageProperty,
  updateFcmDog,
} from "../../actions/fcmActions";
import {
  fireSwalError,
  isObjectEmpty,
  setUrlValueOrRefreshImage,
} from "../../helpers/utilities";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { TextFieldWrapper } from "../../components/formsUI/TextFieldWrapper";
import { DatePickerFieldWrapper } from "../../components/formsUI/DatePickerFieldWrapper";
import { ButtonFormWrapper } from "../../components/formsUI/ButtonFormWrapper";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { SelectWrapper } from "../../components/formsUI/SelectWrapper";
import { CheckboxInputWrapper } from "../../components/formsUI/CheckboxInputWrapper";
import { FcmStepperPartnerSelector } from "./FcmStepperPartnerSelector";
import {
  generatePuppiesValidationParams,
  generatePuppiesValues,
} from "../../helpers/fcmUtilities";

export const FcmBreedingFormik = ({ label }) => {
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
    isEditable,
    packageProperty,
    needsConfirmation,
    formTitle,
    showCancel,
  } = currentProps;

  const [fcmDog, setfcmDog] = useState(null);
  const [registersAmount, setregistersAmount] = useState("");
  const [puppiesRegisters, setpuppiesRegisters] = useState([]);

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
  };

  let initialValidationParams = {
    breedingDate: Yup.date().required("Es obligatorio"),
    birthDate: Yup.date().required("Es obligatorio"),
    birthPlace: Yup.string().trim().required("Es obligatorio"),
    malesAlive: Yup.number().required("Es obligatorio"),
    femalesAlive: Yup.number().required("Es obligatorio"),
    death: Yup.number().required("Es obligatorio"),
  };

  const [validationParams, setvalidationParams] = useState(
    initialValidationParams
  );
  const [formValidation, setformValidation] = useState(
    Yup.object().shape(validationParams)
  );
  const [formValues, setformValues] = useState(initialValues);

  /*************************************************************************************************** */
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */

  // find fcmPartner and set it active (searching from id)
  useEffect(() => {
    if (!isObjectEmpty(client)) {
      // let found = client.linkedDogs.find((el) => el._id === id);
      // // set active
      // if (found) {
      //   // set the image found to be used in the component
      //   found.birthDate = dayjs(found.birthDate).format("YYYY-MM-DD");
      //   return setformValues({ ...found });
      // }
    }
  }, []);

  // todo: Doing
  // add initialValues if the register num change
  useEffect(() => {
    setformValues(generatePuppiesValues(formValues, Number(registersAmount)));
    setvalidationParams(
      generatePuppiesValidationParams(validationParams, Number(registersAmount))
    );
  }, [registersAmount]);

  useEffect(() => {
    if (registersAmount > 14) {
      setregistersAmount(14);
      return fireSwalError("No se pueden registrar más de catorce cachorros");
    }
    if (registersAmount >= 0) {
      let tempPuppiesRegisters = [];
      for (let i = 0; i < registersAmount; i++) {
        tempPuppiesRegisters.push({ name: `puppy${i}` });
      }
      setpuppiesRegisters(tempPuppiesRegisters);
    }
  }, [formValues]);

  useEffect(() => {
    setformValidation(Yup.object().shape(validationParams));
  }, [validationParams]);

  // find fcmPartner and set it active (searching from package)
  useEffect(() => {
    if (fcmPackage[packageProperty]) {
      let found = client.linkedDogs.find(
        (el) => el._id === fcmPackage[packageProperty]
      );

      setfcmDog(found);

      // set active
      if (found) {
        // set the image found to be used in the component

        // found.birthDate = dayjs(found.birthDate).format("YYYY-MM-DD");
        return setformValues({ ...found });
      }
    }
  }, [fcmPackage]);
  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */

  const handleSubmit = async (values) => {
    // if the date is going to expire in the next 2 weeks ask confirmation

    Swal.fire({
      title: "Cargando información",
      text: "Por favor, espere",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    if (values.isTransferPending) {
      dispatch(
        addFcmProcedure({
          step: activeStep,
          procedureType: "transfer",
          dataId: values._id,
        })
      );

      dispatch(
        addNewFcmStep({
          label: "Toma perro",
          component: <FcmStepperPartnerSelector label="Toma perro" />,
        })
      );
    }

    let newValues = { ...values };
    // if there is a new file refresh the image

    // if there is an ID: update. If not: create
    if (newValues._id) {
      Swal.close();
      const fcmDogId = await dispatch(updateFcmDog(newValues));
      await dispatch(setFcmPackageEditable(false));

      if (fcmDogId) {
        if (fcmPackage) {
          dispatch(setFcmPackageProperty(fcmDogId));
          dispatch(handleFcmCompleteStep());
        }
        // navigate to previous page or profile
        // navigate(`/dashboard/documentation`);
      }
    } else {
      Swal.close();
      const fcmDogId = await dispatch(createFcmDog(newValues));
      if (fcmDogId) {
        // submit to parent
        if (fcmPackage) {
          dispatch(setFcmPackageProperty(fcmDogId));
          dispatch(handleFcmCompleteStep());
        }
        // navigate(`/dashboard/documentation`);
      }
    }
  };

  const handleConfirmation = async () => {
    const values = { ...fcmDog };

    if (values.isTransferPending) {
      dispatch(
        addFcmProcedure({
          step: activeStep,
          procedureType: "transfer",
          dataId: values._id,
        })
      );
    }

    dispatch(setFcmPackageNeedsConfirmation(false));
    // setneedsConfirmation(false);
    dispatch(handleFcmCompleteStep());
  };

  console.log("form values", formValues);

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
                  dispatch(handleNextFcmPackageStep());
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
                dispatch(setFcmPackageEditable(true));
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
                dispatch(cleanFcmStep());
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
        initialValues={{ ...formValues }}
        validationSchema={formValidation}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        enableReinitialize
      >
        <Form>
          <Grid container spacing={2}>
            {/* DATOS DE IDENTIFICACIÓN */}
            <Grid item xs={12}>
              <Typography component="h4" variant="h5">
                Número de registros
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="registersAmount"
                label="Número de registros"
                disabled={!isEditable}
                type="number"
                value={registersAmount}
                onChange={(e) => {
                  setregistersAmount(e.target.value);
                }}
              />
            </Grid>
            {registersAmount > 0 && (
              <Fragment>
                <Grid item xs={12}>
                  <Typography component="h4" variant="h5">
                    Datos de la cruza
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <DatePickerFieldWrapper
                    name="breedingDate"
                    label="Fecha de cruza"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <DatePickerFieldWrapper
                    name="birthDate"
                    label="Fecha de nacimiento"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper
                    name="birthPlace"
                    label="Lugar de nacimiento"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextFieldWrapper
                    name="malesAlive"
                    label="Machos vivos"
                    disabled={!isEditable}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextFieldWrapper
                    name="femalesAlive"
                    label="Hembras vivas"
                    disabled={!isEditable}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
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
                {console.log("este es el puppysex", formValues)}
                {puppiesRegisters.map((element, index) => {
                  return (
                    <Fragment key={element.name}>
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
                          name={`puppyName${index + 1}`}
                          label="Nombre"
                          disabled={!isEditable}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <SelectWrapper
                          name={`puppySex${index + 1}`}
                          label="Sexo"
                          disabled={!isEditable}
                          options={{
                            male: "Macho",
                            female: "Hembra",
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <TextFieldWrapper
                          name={`puppyColor${index + 1}`}
                          label="Color"
                          disabled={!isEditable}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <CheckboxInputWrapper
                          name={`puppyNeedsTransfer${index + 1}`}
                          label="Se realizará cambio de propietario"
                          disabled={!isEditable}
                        />
                      </Grid>
                    </Fragment>
                  );
                })}
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
              </Fragment>
            )}
          </Grid>
        </Form>
      </Formik>
    </Fragment>
  );
};
