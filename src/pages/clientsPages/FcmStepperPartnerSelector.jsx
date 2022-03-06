import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { SimpleSelectWrapper } from "../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../helpers/utilities";
import { SearchAndLinkPartner } from "./components/SearchAndLinkPartner";
import { SelectFcmPartnerFromAccount } from "./components/SelectFcmPartnerFromAccount";
import { FcmPartnerFormik } from "./FcmPartnerFormik";

export const FcmStepperPartnerSelector = ({
  handleSetFatherOwnerId,
  handleNext,
}) => {
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */

  const [selectedCase, setselectedCase] = useState("");

  const options = [
    {
      label: "Socio vinculado previamente a mi cuenta",
      value: "previousLinked",
      component: (
        <SelectFcmPartnerFromAccount
          handleSetFatherOwnerId={handleSetFatherOwnerId}
          handleNext={handleNext}
        />
      ),
    },
    {
      label:
        "Socio no vinculado a mi cuenta, pero registrado en esta plataforma",
      value: "previousDataBase",
      component: (
        <SearchAndLinkPartner
          handleSetFatherOwnerId={handleSetFatherOwnerId}
          handleNext={handleNext}
          usedInProcedure={true}
        />
      ),
    },
    {
      label: "Socio no registrado en esta plataforma",
      value: "newPartner",
      component: (
        <FcmPartnerFormik
          handleSetFatherOwnerId={handleSetFatherOwnerId}
          handleNext={handleNext}
        />
      ),
    },
    {
      label: "Socio, con credencial extraviada",
      value: "withoutCredential",
    },
    {
      label: "Dar de alta a un socio que no está registrado en la FCM",
      value: "notRegisteredPartner",
      component: (
        <FcmPartnerFormik
          handleSetFatherOwnerId={handleSetFatherOwnerId}
          handleNext={handleNext}
          isFirstRegister={true}
        />
      ),
    },
  ];

  /*************************************************************************************************** */
  /**************************RENDER *********************************************************************/
  /*************************************************************************************************** */

  return (
    <Box>
      <Typography variant="h5" component="h2" mb="3rem">
        Propietario del padre
      </Typography>
      <SimpleSelectWrapper
        options={options}
        label="Selecciona el caso"
        value={selectedCase}
        setValue={setselectedCase}
      />
      {/* change according to selection */}
      {selectedCase !== "" &&
        findObjectByProperty(options, "value", selectedCase).component}
      {/* <FormControl fullWidth>
        <InputLabel>Selecciona el trámite</InputLabel>
        <Select label="Propietario del Padre" onChange={handleSelect}>
          {options.map((element) => {
            return (
              <MenuItem key={element.value} value={element.value}>
                {element.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl> */}
      {/* <FcmPartnerFormik /> */}
    </Box>
  );
};
