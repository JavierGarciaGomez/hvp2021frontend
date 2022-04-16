import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFcmCurrentStepEditable,
  
} from "../../actions/fcmActions";
import { SimpleSelectWrapper } from "../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../helpers/utilities";

import { SearchAndLinkDog } from "./components/SearchAndLinkDog";

import { SelectDogFromAccount } from "./components/SelectDogFromAccount";

import { FcmDogFormik } from "./FcmDogFormik";

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
        dispatch(setFcmCurrentStepEditable(false));
      },
    },
    {
      label:
        "Perro no vinculado a mi cuenta, pero registrado en esta plataforma",
      value: "previousDataBase",
      component: <SearchAndLinkDog />,
      functions: () => {
        dispatch(setFcmCurrentStepEditable(false));
      },
    },
    {
      label: "Perro no registrado en esta plataforma",
      value: "notRegistered",
      component: <FcmDogFormik />,
      functions: () => {
        dispatch(setFcmCurrentStepEditable(true));
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

  /*************************************************************************************************** */
  /**************************RENDER *********************************************************************/
  /*************************************************************************************************** */

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
    </Box>
  );
};
