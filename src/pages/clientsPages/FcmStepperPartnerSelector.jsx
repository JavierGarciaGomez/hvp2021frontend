import {
  Box,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SimpleSelectWrapper } from "../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../helpers/utilities";
import { SearchAndLinkPartner } from "./components/SearchAndLinkPartner";
import { FcmPartnerFormik } from "./FcmPartnerFormik";

export const FcmStepperPartnerSelector = ({
  handleSetFatherOwnerId,
  handleNext,
}) => {
  const [selectedCase, setselectedCase] = useState("");

  const options = [
    {
      label: "Socio vinculado previamente a mi cuenta",
      value: "previousLinked",
      component: <SearchAndLinkPartner />,
    },
    {
      label:
        "Socio no vinculado a mi cuenta, pero registrado en esta plataforma",
      value: "previousDataBase",
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
      label: "Socio, con credencial estraviada",
      value: "withoutCredential",
    },
    {
      label: "Dar de alta a un socio que no está registrado en la FCM",
      value: "notRegisteredPartner",
    },
  ];

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
