import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFcmPackage } from "../../actions/fcmActions";
import { SimpleSelectWrapper } from "../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../helpers/utilities";
import { LostPartnerCard } from "./components/LostPartnerCard";
import { SearchAndLinkPartner } from "./components/SearchAndLinkPartner";
import { SelectFcmPartnerFromAccount } from "./components/SelectFcmPartnerFromAccount";
import { FcmPartnerFormik } from "./FcmPartnerFormik";

export const FcmStepperPartnerSelector = ({ ...props }) => {
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const dispatch = useDispatch();
  const [selectedCase, setselectedCase] = useState("");
  const { fcmPackage } = useSelector((state) => state.fcm);

  const options = [
    {
      label: "Socio vinculado previamente a mi cuenta",
      value: "previousLinked",
      component: <SelectFcmPartnerFromAccount {...props} />,
      functions: () => {
        dispatch(
          setFcmPackage({
            ...fcmPackage,
            currentProps: {
              ...fcmPackage.currentProps,
              isFirstRegister: false,
              isEditable: false,
            },
          })
        );
      },
    },
    {
      label:
        "Socio no vinculado a mi cuenta, pero registrado en esta plataforma",
      value: "previousDataBase",
      component: <SearchAndLinkPartner {...props} />,
      functions: () => {
        dispatch(
          setFcmPackage({
            ...fcmPackage,
            currentProps: {
              ...fcmPackage.currentProps,
              isFirstRegister: false,
              isEditable: false,
            },
          })
        );
      },
    },
    {
      label: "Socio no registrado en esta plataforma",
      value: "newPartner",
      component: <FcmPartnerFormik {...props} />,
      functions: () => {
        dispatch(
          setFcmPackage({
            ...fcmPackage,
            currentProps: {
              ...fcmPackage.currentProps,
              isFirstRegister: false,
              isEditable: true,
            },
          })
        );
      },
    },
    {
      label: "Socio, con credencial extraviada",
      value: "withoutCredential",
      component: <LostPartnerCard {...props} />,
      functions: () => {
        dispatch(
          setFcmPackage({
            ...fcmPackage,
            currentProps: {
              ...fcmPackage.currentProps,
              isFirstRegister: true,
              isEditable: true,
            },
          })
        );
      },
    },
    {
      label: "Dar de alta a un socio que no está registrado en la FCM",
      value: "notRegisteredPartner",
      component: <FcmPartnerFormik {...props} isFirstRegister={true} />,
      functions: () => {
        dispatch(
          setFcmPackage({
            ...fcmPackage,
            currentProps: {
              ...fcmPackage.currentProps,
              isFirstRegister: true,
              isEditable: true,
            },
          })
        );
      },
    },
  ];

  useEffect(() => {
    selectedCase &&
      findObjectByProperty(options, "value", selectedCase).functions();
  }, [selectedCase]);

  /*************************************************************************************************** */
  /**************************RENDER *********************************************************************/
  /*************************************************************************************************** */

  console.log(
    "22222222222 a ver",
    fcmPackage[fcmPackage.currentProps.packageProperty],
    "está facío"
  );
  return (
    <Box>
      <Typography variant="h4" component="h2" mb="3rem">
        Propietario del padre
      </Typography>
      {fcmPackage[fcmPackage.currentProps.packageProperty] !== "" ? (
        <FcmPartnerFormik {...props} />
      ) : (
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
