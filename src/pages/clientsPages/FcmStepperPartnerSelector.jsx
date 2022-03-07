import { Box, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { SimpleSelectWrapper } from "../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../helpers/utilities";
import { LostPartnerCard } from "./components/LostPartnerCard";
import { SearchAndLinkPartner } from "./components/SearchAndLinkPartner";
import { SelectFcmPartnerFromAccount } from "./components/SelectFcmPartnerFromAccount";
import { FcmPartnerFormik } from "./FcmPartnerFormik";

export const FcmStepperPartnerSelector = ({ ...props }) => {
  const { packageProperty, needsConfirmation } = { ...props };
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const [selectedCase, setselectedCase] = useState("");
  const { fcmPackage } = useSelector((state) => state.fcm);

  const options = [
    {
      label: "Socio vinculado previamente a mi cuenta",
      value: "previousLinked",
      component: <SelectFcmPartnerFromAccount {...props} />,
    },
    {
      label:
        "Socio no vinculado a mi cuenta, pero registrado en esta plataforma",
      value: "previousDataBase",
      component: <SearchAndLinkPartner {...props} />,
    },
    {
      label: "Socio no registrado en esta plataforma",
      value: "newPartner",
      component: <FcmPartnerFormik {...props} />,
    },
    {
      label: "Socio, con credencial extraviada",
      value: "withoutCredential",
      component: <LostPartnerCard />,
    },
    {
      label: "Dar de alta a un socio que no está registrado en la FCM",
      value: "notRegisteredPartner",
      component: <FcmPartnerFormik {...props} />,
    },
  ];

  /*************************************************************************************************** */
  /**************************RENDER *********************************************************************/
  /*************************************************************************************************** */

  return (
    <Box>
      <Typography variant="h4" component="h2" mb="3rem">
        Propietario del padre
      </Typography>
      {fcmPackage[packageProperty] && <FcmPartnerFormik {...props} />}
      {!fcmPackage[packageProperty] && (
        <Fragment>
          <SimpleSelectWrapper
            options={options}
            label="Selecciona el caso"
            value={selectedCase}
            setValue={setselectedCase}
          />
          {/* change according to selection */}
          {selectedCase !== "" &&
            findObjectByProperty(options, "value", selectedCase).component}
        </Fragment>
      )}

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
