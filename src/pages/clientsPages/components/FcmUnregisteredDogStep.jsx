import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { cleanFcmStep, handleFcmCompleteStep, updateStepReferences } from "../../../actions/fcmActions";
import { fireSwalSuccess, isObjectEmpty } from "../../../helpers/utilities";
import { Box, Button, Grid, Typography } from "@mui/material";
import { TextFieldWrapper } from "../../../components/formsUI/TextFieldWrapper";
import { DatePickerFieldWrapper } from "../../../components/formsUI/DatePickerFieldWrapper";
import { ButtonFormWrapper } from "../../../components/formsUI/ButtonFormWrapper";
import { useState } from "react";
import { SelectWrapper } from "../../../components/formsUI/SelectWrapper";
import { fireSwalWait } from "../../../helpers/sweetAlertUtilities";
import { propertiesToUpperCase } from "../../../helpers/objectUtilities";
import { FcmUnregisteredDogForm } from "./FcmUnregisteredDogForm";

/*************************************************************************************************** */
/************************** Initial values and validation *******************************************************/
/*************************************************************************************************** */

export const FcmUnregisteredDogStep = () => {
  const dispatch = useDispatch();

  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */

  const { fcmPackage } = useSelector((state) => state.fcm);
  const { activeStep, steps } = fcmPackage;
  const currentStep = steps[activeStep];
  const { stepData, stepLabel } = currentStep;
  const [isEditable, setisEditable] = useState(true);
  const [initialFormValues, setInitialFormValues] = useState(null);

  // TODO: When to delete puppies: a) when reset. All clear. b) Cuando se da click a eliminar cachorro.

  /*************************************************************************************************** */
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */

  useEffect(() => {
    if (!isObjectEmpty(stepData)) {
      setInitialFormValues({ ...stepData });
      setisEditable(false);
    } else {
      setInitialFormValues(null);
    }
  }, [stepData]);

  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */

  const handleSubmit = async (values) => {
    const upperCaseValues = propertiesToUpperCase(values);

    fireSwalWait();
    // todo save to fcmpackage. Dispatch
    console.log({ ...upperCaseValues });
    dispatch(updateStepReferences({ ...upperCaseValues }));
    dispatch(handleFcmCompleteStep());
    fireSwalSuccess("Éxito");
  };

  const handleCancel = () => {
    setisEditable(false);
  };

  /*************************************************************************************************** */
  /************************** RENDER *******************************************************/
  /*************************************************************************************************** */

  return (
    <Fragment>
      <Typography variant="h4" component="h2" mb="3rem">
        {stepLabel}
      </Typography>

      <Typography component="h2" variant="h5" mb="2rem">
        Llena el formulario
      </Typography>
      {!isEditable && (
        <Box sx={{ mb: "3rem" }}>
          <Typography sx={{ mb: "2rem", lineHeight: "1.5" }}>Los datos han sido llenados, puedes continuar con el paso siguiente, editar los datos o remover la selección.</Typography>
          <Box sx={{ display: "flex", width: "100%", gap: "3rem", mb: "3rem" }}>
            <Button
              fullWidth={true}
              onClick={() => {
                setisEditable(true);
              }}
              color="primary"
            >
              Editar información
            </Button>
            <Button
              fullWidth={true}
              onClick={() => {
                dispatch(cleanFcmStep());
                // setformValues(initialValues);
                // setregistersAmount(0);
                setisEditable(true);
              }}
              color="error"
            >
              Remover
            </Button>
          </Box>
        </Box>
      )}

      <FcmUnregisteredDogForm onSubmit={handleSubmit} formValues={initialFormValues} onCancel={handleCancel} isEditable={isEditable} />
    </Fragment>
  );
};
