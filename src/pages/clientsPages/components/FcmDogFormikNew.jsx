import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createFcmDog, updateFcmDog } from "../../../actions/fcmActions";
import {
  fireSwalConfirmation,
  fireSwalError,
  setUrlValueOrRefreshImage,
} from "../../../helpers/utilities";
import { Box, Button, Grid, Typography } from "@mui/material";
import { TextFieldWrapper } from "../../../components/formsUI/TextFieldWrapper";
import { DatePickerFieldWrapper } from "../../../components/formsUI/DatePickerFieldWrapper";
import { ButtonFormWrapper } from "../../../components/formsUI/ButtonFormWrapper";
import { DragImageUpload } from "../../../components/formsUI/DragImageUpload";
import { useState } from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { fireSwalWait } from "../../../helpers/sweetAlertUtilities";
import { SelectWrapper } from "../../../components/formsUI/SelectWrapper";
import { CheckboxInputWrapper } from "../../../components/formsUI/CheckboxInputWrapper";

export const FcmDogFormikNew = ({ ...props }) => {
  const {
    stepData: fcmDogData,
    stepProps,
    handleSubmitForm,
    handleCancel,
    requiredSex,
  } = props;
  const { isEditable } = stepProps;
  const dispatch = useDispatch();

  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  //#region

  const [filesPedigreeFront, setfilesPedigreeFront] = useState([]);
  const [filesPedigreeBack, setfilesPedigreeBack] = useState([]);
  const [imgUrlPedigreeFront, setImgUrlPedigreeFront] = useState(null);
  const [imgUrlPedigreeBack, setImgUrlPedigreeBack] = useState(null);

  //#endregion
  /*************************************************************************************************** */
  /************************** Initial values and validation *******************************************************/
  /*************************************************************************************************** */
  //#region
  let initialValues = {
    petName: "",
    breed: "",
    color: "",
    sex: "",
    birthDate: "",
    registerNum: "",
    registerType: "",
    isTransferPending: false,
    urlFront: "",
    urlBack: "",
  };

  let validationParams = {
    petName: Yup.string().trim().required("Es obligatorio"),
    breed: Yup.string().trim().required("Es obligatorio"),
    color: Yup.string().trim().required("Es obligatorio"),
    sex: Yup.string().trim().required("Es obligatorio"),
    birthDate: Yup.date().required("Es obligatorio"),
    registerNum: Yup.string().trim().required("Es obligatorio"),
    registerType: Yup.string().trim().required("Es obligatorio"),
  };

  let formValidation = Yup.object().shape(validationParams);

  const [formValues, setformValues] = useState(initialValues);

  //#endregion
  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */
  //#region

  const handleConfirmTransfer = async (values) => {
    if (values.isTransferPending) {
      const confirmation = await fireSwalConfirmation(
        "Se ha marcado que se realizará una transferencia. Por lo que se agregará al paquete, si no es correcto, edite el formulario."
      );

      if (!confirmation) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (values) => {
    if (requiredSex) {
      if (values.sex !== requiredSex) {
        return fireSwalError(
          "El sexo del perro no concide. Edita la información o selecciona otro."
        );
      }
    }
    // if the date is going to expire in the next 2 weeks ask confirmatio
    if (!(await handleConfirmTransfer(values))) {
      return;
    }
    fireSwalWait();

    // images validation
    if (filesPedigreeFront.length === 0 && !imgUrlPedigreeFront) {
      return fireSwalError(
        "Se debe cargar la imagen frontal del certificado del perro"
      );
    }

    if (filesPedigreeBack.length === 0 && !imgUrlPedigreeBack) {
      return fireSwalError(
        "Se debe cargar la imagen trasera del certificado del perro"
      );
    }

    let newValues = { ...values };
    // if there is a new file refresh the image
    newValues = await setUrlValueOrRefreshImage(
      newValues,
      filesPedigreeFront,
      "urlFront",
      imgUrlPedigreeFront
    );

    newValues = await setUrlValueOrRefreshImage(
      newValues,
      filesPedigreeBack,
      "urlBack",
      imgUrlPedigreeBack
    );

    Swal.close();
    let fcmDog = null;
    // if there is an ID: update. If not: create
    if (newValues._id) {
      fcmDog = await dispatch(updateFcmDog(newValues));
    } else {
      fcmDog = await dispatch(createFcmDog(newValues));
    }
    // if there is an error in the dispach return
    if (!fcmDog) {
      return;
    }
    handleSubmitForm(fcmDog);
  };

  //#endregion
  /*************************************************************************************************** */
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */
  //#region
  // find fcmPartner and set it active (searching from id)
  useEffect(() => {
    if (fcmDogData) {
      setImgUrlPedigreeFront(fcmDogData.urlFront);
      setImgUrlPedigreeBack(fcmDogData.urlBack);

      fcmDogData.birthDate = dayjs(fcmDogData.birthDate).format("YYYY-MM-DD");

      setformValues({ ...fcmDogData });
    } else {
      setImgUrlPedigreeFront(null);
      setImgUrlPedigreeBack(null);
    }
  }, [fcmDogData]);

  //#endregion
  /*************************************************************************************************** */
  /************************** RENDER *******************************************************/
  /*************************************************************************************************** */

  return (
    <Formik
      initialValues={{ ...formValues }}
      validationSchema={formValidation}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      enableReinitialize
    >
      {({ values, errors, isSubmitting, resetForm, isValid }) => (
        <Form>
          <Grid container spacing={2}>
            {/* SECTION IMAGES */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography component="h4" variant="h5" mb="2rem">
                    Imágenes
                  </Typography>
                </Grid>
                {/* tarjeta de socio */}

                <Grid item xs={12} md={6}>
                  <Typography mb="2rem">Pedigrí o CPR Frontal</Typography>
                  <DragImageUpload
                    files={filesPedigreeFront}
                    setFiles={setfilesPedigreeFront}
                    imgUrl={imgUrlPedigreeFront}
                    setimgUrl={setImgUrlPedigreeFront}
                    editable={isEditable}
                  ></DragImageUpload>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography mb="2rem">Pedigrí o CPR Reverso</Typography>
                  <DragImageUpload
                    files={filesPedigreeBack}
                    setFiles={setfilesPedigreeBack}
                    imgUrl={imgUrlPedigreeBack}
                    setimgUrl={setImgUrlPedigreeBack}
                    editable={isEditable}
                  ></DragImageUpload>
                </Grid>
              </Grid>
            </Grid>

            {/* DATOS DE IDENTIFICACIÓN */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper
                    name="petName"
                    label="Nombre"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper
                    name="breed"
                    label="Raza"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper
                    name="color"
                    label="Color"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SelectWrapper
                    name="sex"
                    label="Sexo"
                    disabled={!isEditable}
                    options={{
                      male: "Macho",
                      female: "Hembra",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePickerFieldWrapper
                    name="birthDate"
                    label="Fecha de nacimiento"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldWrapper
                    name="registerNum"
                    label="Número de registro"
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <SelectWrapper
                    name="registerType"
                    label="Tipo de registro"
                    disabled={!isEditable}
                    options={{
                      pedigree: "Pedigrí",
                      racePurity: "Certificado de pureza racial",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CheckboxInputWrapper
                    name="isTransferPending"
                    label="Requiere cambio de propietario"
                    disabled={!isEditable}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* BUTTONS */}

            {isEditable && (
              <Grid item xs={12} mb={2}>
                <Box sx={{ display: "flex", width: "100%", gap: "3rem" }}>
                  <ButtonFormWrapper> Guardar</ButtonFormWrapper>

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
