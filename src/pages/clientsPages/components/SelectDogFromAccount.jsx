import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFcmPackage,
  setFcmPackageCurrentProps,
  setFcmPackageProp,
  setFcmPackageProperty,
} from "../../../actions/fcmActions";
import { SimpleSelectWrapper } from "../../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../../helpers/utilities";
import { FcmPartnerFormik } from "../FcmPartnerFormik";
import { FcmPartnerCard } from "./FcmPartnerCard";

export const SelectDogFromAccount = () => {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.clients);
  const [selectedDogId, setselectedDogId] = useState("");
  const [selectedDog, setselectedDog] = useState({});
  const { fcmPackage } = useSelector((state) => state.fcm);

  useEffect(() => {
    if (selectedDogId !== "") {
      const found = findObjectByProperty(
        client.linkedDogs,
        "_id",
        selectedDogId
      );
      setselectedDog(found);

      dispatch(
        setFcmPackageCurrentProps({
          ...fcmPackage.currentProps,
          isEditable: false,
          needsConfirmation: true,
        })
      );
      dispatch(setFcmPackageProperty(selectedDogId));
    }
  }, [selectedDogId]);

  const handleSubmit = () => {
    dispatch(setFcmPackageProperty(selectedDogId));
  };

  const options = client.linkedDogs.map((element) => {
    return {
      label: `${element.registerNum} - ${element.petName}`,
      value: element._id,
      component: (
        <FcmPartnerCard
          fcmPartner={selectedDog}
          usedInProcedure={true}
          handleClickBtn={handleSubmit}
        />
      ),
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
