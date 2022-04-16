import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFcmActiveStepProperty, updateStepReferences } from "../../../actions/fcmActions";
import { SimpleSelectWrapper } from "../../../components/formsUI/SimpleSelectWrapper";
import { findObjectById } from "../../../helpers/utilities";

export const SelectFcmPartnerFromAccount = ({ handleCancelSelection, handleStepProps }) => {
  const { client } = useSelector((state) => state.clients);
  const [selectedFcmPartnerId, setselectedFcmPartnerId] = useState("");

  const dispatch = useDispatch();

  // if a parther is selected set the dataId to the step
  useEffect(() => {
    if (selectedFcmPartnerId !== "") {
      const found = findObjectById(client.linkedFcmPartners, selectedFcmPartnerId);

      dispatch(updateStepReferences(found));
      handleStepProps({
        isEditable: false,
        formWrapperTitle: "Confirma la información",
      });
      dispatch(setFcmActiveStepProperty("needsConfirmation", true));
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
      <Typography mb="3rem">Selecciona un socio vinculado a tu cuenta o cancela para regresar a las opciones iniciales</Typography>
      <SimpleSelectWrapper options={options} label="Selecciona un socio" value={selectedFcmPartnerId} setValue={setselectedFcmPartnerId}></SimpleSelectWrapper>
      <Button color="error" fullWidth onClick={handleCancelSelection}>
        Cancelar
      </Button>
    </Box>
  );
};
