import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SimpleSelectWrapper } from "../../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../../helpers/utilities";

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
  const { handleResetStepProps, handleStepProps } = props;

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
      functions: async () => {},
    },
    {
      label:
        "Socio no vinculado a mi cuenta, pero registrado en esta plataforma",
      value: "previousDataBase",
      component: (
        <SearchAndLinkPartner
          handleCancelSelection={handleCancelSelection}
          {...props}
        />
      ),
      functions: async () => {},
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
      functions: async () => {},
      // functions: () => {
      //   setStepProps({
      //     isFirstRegister: false,
      //     isCardLost: false,
      //     isEditable: true,
      //     formWrapperTitle: "Llena el formulario",
      //   });
      // },
    },
    {
      label: "Socio, con credencial extraviada",
      value: "withoutCredential",
      component: (
        <LostPartnerCard handleCancel={handleCancelSelection} {...props} />
      ),
      functions: async () => {},
      // functions: async () => {
      //   setStepProps({
      //     isFirstRegister: false,
      //     isCardLost: true,
      //     isEditable: true,
      //     formTitle: "Llena el formulario",
      //   });
      // },
    },
    {
      label: "Solicitar alta de un nuevo socio en la FCM",
      value: "notRegisteredPartner",
      component: (
        <FcmPartnerFormWrapper
          {...props}
          handleCancel={handleCancelSelection}
        />
      ),
      functions: () => {
        handleStepProps({ isFirstRegister: true });
      },
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

  useEffect(() => {
    handleResetStepProps();
  }, []);

  useEffect(() => {
    if (selectedCase !== "") {
      findObjectByProperty(options, "value", selectedCase).functions();
    }
  }, [selectedCase]);

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
