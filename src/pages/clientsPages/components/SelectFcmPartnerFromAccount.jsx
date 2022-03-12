import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFcmCurrentStepConfig,
  setFcmCurrentStepDataId,
  setFcmPackageProperty,
} from "../../../actions/fcmActions";
import { SimpleSelectWrapper } from "../../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../../helpers/utilities";

export const SelectFcmPartnerFromAccount = () => {
  const { client } = useSelector((state) => state.clients);
  const [selectedFcmPartnerId, setselectedFcmPartnerId] = useState("");

  const dispatch = useDispatch();

  // if a parther is selected set the dataId to the step
  useEffect(() => {
    if (selectedFcmPartnerId !== "") {
      dispatch(setFcmPackageProperty(selectedFcmPartnerId));
      dispatch(
        setFcmCurrentStepConfig({ isEditable: false, needsConfirmation: true })
      );
      dispatch(setFcmCurrentStepDataId(selectedFcmPartnerId));
    }
  }, [selectedFcmPartnerId]);

  const options = client.linkedFcmPartners.map((fcmPartner) => {
    return {
      label: `${fcmPartner.partnerNum} - ${fcmPartner.firstName} ${fcmPartner.paternalSurname}`,
      value: fcmPartner._id,
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
    </Box>
  );
};
