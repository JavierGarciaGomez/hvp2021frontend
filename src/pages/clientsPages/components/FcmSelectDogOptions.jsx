import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SimpleSelectWrapper } from "../../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../../helpers/utilities";
import { FcmPartnerFormWrapper } from "./FcmPartnerFormWrapper";

import { SearchAndLinkPartner } from "./SearchAndLinkPartner";
import { SelectFcmDogFromAccount } from "./SelectFcmDogFromAccount";

export const FcmSelectDogOptions = ({ ...props }) => {
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */

  const [selectedCase, setselectedCase] = useState("");
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { handleResetStepProps } = props;

  const handleCancelSelection = () => {
    setselectedCase("");
  };

  // todo try to delete the functions

  const options = [
    {
      label: "Perro vinculado previamente a mi cuenta",
      value: "previousLinked",
      component: (
        <SelectFcmDogFromAccount
          handleCancelSelection={handleCancelSelection}
          {...props}
        />
      ),
      functions: async () => {},
    },
    {
      label:
        "Perro no vinculado a mi cuenta, pero registrado en esta plataforma",
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
      label: "Perro no registrado en esta plataforma",
      value: "newPartner",
      component: (
        <FcmPartnerFormWrapper
          handleCancel={handleCancelSelection}
          {...props}
        />
      ),
      functions: async () => {},
    },
  ];

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
