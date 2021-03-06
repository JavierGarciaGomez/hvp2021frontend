import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFcmActiveStepProperty, updateStepReferences } from "../../../actions/fcmActions";
import { SimpleSelectWrapper } from "../../../components/formsUI/SimpleSelectWrapper";
import { findObjectById } from "../../../helpers/utilities";

export const SelectFcmDogFromAccount = ({ handleCancelSelection, handleStepProps }) => {
  const { client } = useSelector((state) => state.clients);
  const [selectedFcmDogId, setselectedFcmDogId] = useState("");

  const dispatch = useDispatch();

  // if a parther is selected set the dataId to the step
  useEffect(() => {
    if (selectedFcmDogId !== "") {
      const found = findObjectById(client.linkedDogs, selectedFcmDogId);

      dispatch(updateStepReferences(found));
      handleStepProps({
        isEditable: false,
        formWrapperTitle: "Confirma la información",
      });
      dispatch(setFcmActiveStepProperty("needsConfirmation", true));
    }
  }, [selectedFcmDogId]);

  const options = client.linkedDogs.map((fcmDog) => {
    console.log("fcmDog", fcmDog);
    return {
      label: `${fcmDog.registerNum} - ${fcmDog.petName}`,
      value: fcmDog._id,
    };
  });

  console.log("opciones", options);

  return (
    <Box>
      <Typography mb="3rem">Selecciona un perro vinculado a tu cuenta o cancela para regresar a las opciones iniciales</Typography>
      <SimpleSelectWrapper options={options} label="Selecciona un perro" value={selectedFcmDogId} setValue={setselectedFcmDogId}></SimpleSelectWrapper>
      <Button color="error" fullWidth onClick={handleCancelSelection}>
        Cancelar
      </Button>
    </Box>
  );
};
