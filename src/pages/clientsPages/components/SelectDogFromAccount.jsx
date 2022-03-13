import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFcmCurrentStepConfig,
  updateStepReferences,
} from "../../../actions/fcmActions";
import { SimpleSelectWrapper } from "../../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../../helpers/utilities";

export const SelectDogFromAccount = () => {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.clients);
  const [selectedDogId, setselectedDogId] = useState("");

  useEffect(() => {
    if (selectedDogId !== "") {
      const found = findObjectByProperty(
        client.linkedDogs,
        "_id",
        selectedDogId
      );

      dispatch(updateStepReferences(found));

      dispatch(
        setFcmCurrentStepConfig({ isEditable: false, needsConfirmation: true })
      );
    }
  }, [selectedDogId]);

  const options = client.linkedDogs.map((element) => {
    return {
      label: `${element.registerNum} - ${element.petName}`,
      value: element._id,
    };
  });

  return (
    <Box>
      <SimpleSelectWrapper
        options={options}
        label="Selecciona un perro"
        value={selectedDogId}
        setValue={setselectedDogId}
      ></SimpleSelectWrapper>
      {selectedDogId !== "" &&
        findObjectByProperty(options, "value", selectedDogId).component}
    </Box>
  );
};
