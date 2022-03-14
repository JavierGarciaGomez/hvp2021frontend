import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFcmCurrentStepConfig } from "../../../actions/fcmActions";
import { SimpleSelectWrapper } from "../../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../../helpers/utilities";
import { FcmPartnerFormik } from "../FcmPartnerFormik";
import { FcmPartnerFormWrapper } from "./FcmPartnerFormWrapper";
import { LostPartnerCard } from "./LostPartnerCard";
import { SearchAndLinkPartner } from "./SearchAndLinkPartner";
import { SelectFcmPartnerFromAccount } from "./SelectFcmPartnerFromAccount";

export const FcmSelectPartnerOptions = ({ ...props }) => {
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const dispatch = useDispatch();
  const [selectedCase, setselectedCase] = useState("");
  const { fcmPackage } = useSelector((state) => state.fcm);

  const handleCancelSelection = () => {
    setselectedCase("");
  };

  // todo try to delete the functions

  const options = [
    {
      label: "Socio vinculado previamente a mi cuenta",
      value: "previousLinked",
      component: (
        <SelectFcmPartnerFromAccount
          handleCancelSelection={handleCancelSelection}
          {...props}
        />
      ),
    },
    {
      label:
        "Socio no vinculado a mi cuenta, pero registrado en esta plataforma",
      value: "previousDataBase",
      component: <SearchAndLinkPartner />,
    },
    {
      label: "Socio no registrado en esta plataforma",
      value: "newPartner",
      component: (
        <FcmPartnerFormWrapper
          handleCancel={handleCancelSelection}
          {...props}
        />
      ),
    },
    {
      label: "Socio, con credencial extraviada",
      value: "withoutCredential",
      component: <LostPartnerCard />,
      functions: () => {
        dispatch(
          setFcmCurrentStepConfig({
            isFirstRegister: false,
            isEditable: true,
            isCardLost: true,
          })
        );
      },
    },
    {
      label: "Dar de alta a un socio que no está registrado en la FCM",
      value: "notRegisteredPartner",
      component: <FcmPartnerFormik />,
    },
  ];

  // // when a case is selected. Execute functions to change props
  // useEffect(() => {
  //   selectedCase &&
  //     findObjectByProperty(options, "value", selectedCase).functions();
  // }, [selectedCase]);

  // when the step changes. erase selection.
  useEffect(() => {
    setselectedCase("");
  }, [fcmPackage.activeStep]);

  /*************************************************************************************************** */
  /**************************RENDER *********************************************************************/
  /*************************************************************************************************** */

  return (
    <Box>
      {selectedCase === "" ? (
        <SimpleSelectWrapper
          options={options}
          label="Selecciona el caso"
          value={selectedCase}
          setValue={setselectedCase}
        />
      ) : (
        findObjectByProperty(options, "value", selectedCase).component
      )}
    </Box>
  );
};
