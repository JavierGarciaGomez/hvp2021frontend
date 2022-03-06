import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SimpleSelectWrapper } from "../../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../../helpers/utilities";
import { FcmPartnerFormik } from "../FcmPartnerFormik";
import { FcmPartnerCard } from "./FcmPartnerCard";

export const SelectFcmPartnerFromAccount = ({
  handleSetFatherOwnerId,
  handleNext,
}) => {
  const { client } = useSelector((state) => state.clients);
  const [selectedFcmPartnerId, setselectedFcmPartnerId] = useState("");
  const [selectedFcmPartner, setselectedFcmPartner] = useState({});

  useEffect(() => {
    if (selectedFcmPartnerId !== "") {
      const found = findObjectByProperty(
        client.linkedFcmPartners,
        "_id",
        selectedFcmPartnerId
      );
      setselectedFcmPartner(found);
    }
  }, [selectedFcmPartnerId]);

  const handleSubmit = () => {
    console.log("select, handle", handleSetFatherOwnerId);
    handleSetFatherOwnerId(selectedFcmPartnerId);
    handleNext();
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
