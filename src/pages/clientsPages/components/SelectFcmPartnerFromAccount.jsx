import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFcmCurrentStepConfig,
  setFcmCurrentStepDataId,
  setFcmPackage,
  setFcmPackageCurrentProps,
  setFcmPackageProp,
  setFcmPackageProperty,
} from "../../../actions/fcmActions";
import { SimpleSelectWrapper } from "../../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../../helpers/utilities";
import { FcmPartnerFormik } from "../FcmPartnerFormik";
import { FcmPartnerCard } from "./FcmPartnerCard";

export const SelectFcmPartnerFromAccount = () => {
  const { client } = useSelector((state) => state.clients);
  const [selectedFcmPartnerId, setselectedFcmPartnerId] = useState("");
  const [selectedFcmPartner, setselectedFcmPartner] = useState({});
  const dispatch = useDispatch();
  const { fcmPackage } = useSelector((state) => state.fcm);

  useEffect(() => {
    if (selectedFcmPartnerId !== "") {
      const found = findObjectByProperty(
        client.linkedFcmPartners,
        "_id",
        selectedFcmPartnerId
      );
      setselectedFcmPartner(found);
      // todo: delete
      dispatch(
        setFcmPackageCurrentProps({
          ...fcmPackage.currentProps,
          isEditable: false,
          needsConfirmation: true,
        })
      );
      dispatch(setFcmPackageProperty(selectedFcmPartnerId));

      dispatch(
        setFcmCurrentStepConfig({ isEditable: false, needsConfirmation: true })
      );
      dispatch(setFcmCurrentStepDataId(selectedFcmPartnerId));
    }
  }, [selectedFcmPartnerId]);

  const handleSubmit = () => {
    dispatch(setFcmPackageProperty(selectedFcmPartnerId));
    dispatch(setFcmCurrentStepDataId(selectedFcmPartnerId));
  };

  const options = client.linkedFcmPartners.map((fcmPartner) => {
    return {
      label: `${fcmPartner.partnerNum} - ${fcmPartner.firstName} ${fcmPartner.paternalSurname}`,
      value: fcmPartner._id,
      component: (
        <FcmPartnerCard
          fcmPartner={selectedFcmPartner}
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
        label="Selecciona un socio"
        value={selectedFcmPartnerId}
        setValue={setselectedFcmPartnerId}
      ></SimpleSelectWrapper>
      {selectedFcmPartnerId !== "" &&
        findObjectByProperty(options, "value", selectedFcmPartnerId).component}
    </Box>
  );
};
