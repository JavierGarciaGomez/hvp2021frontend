import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFcmPackage } from "../../actions/fcmActions";
import { SimpleSelectWrapper } from "../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../helpers/utilities";
import { LostPartnerCard } from "./components/LostPartnerCard";
import { SearchAndLinkPartner } from "./components/SearchAndLinkPartner";
import { SelectDogFromAccount } from "./components/SelectDogFromAccount";
import { SelectFcmPartnerFromAccount } from "./components/SelectFcmPartnerFromAccount";
import { FcmDogFormik } from "./FcmDogFormik";
import { FcmPartnerFormik } from "./FcmPartnerFormik";

export const FcmStepperDogSelector = ({ label }) => {
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const dispatch = useDispatch();
  const [selectedCase, setselectedCase] = useState("");
  const { fcmPackage } = useSelector((state) => state.fcm);

  const options = [
    {
      label: "Perro vinculado previamente a mi cuenta",
      value: "previousLinked",
      component: <SelectDogFromAccount />,
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
        "Perro no vinculado a mi cuenta, pero registrado en esta plataforma",
      value: "previousDataBase",
      component: <SearchAndLinkPartner />,
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
      label: "Perro no registrado en esta plataforma",
      value: "notRegistered",
      component: <FcmDogFormik />,
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
  ];

  useEffect(() => {
    selectedCase &&
      findObjectByProperty(options, "value", selectedCase).functions();
  }, [selectedCase]);

  useEffect(() => {
    setselectedCase("");
  }, [fcmPackage.activeStep]);

  useEffect(() => {
    if (fcmPackage[fcmPackage.currentProps.packageProperty] !== "") {
      dispatch(
        setFcmPackage({
          ...fcmPackage,
          currentProps: {
            ...fcmPackage.currentProps,
            isFirstRegister: true,
            isEditable: false,
          },
        })
      );
    }
  }, [fcmPackage.currentProps.packageProperty]);

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
        {label}
      </Typography>
      {fcmPackage[fcmPackage.currentProps.packageProperty] !== "" ? (
        <FcmDogFormik />
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
