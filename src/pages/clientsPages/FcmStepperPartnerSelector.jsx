import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFcmCurrentStepConfig,
  setFcmCurrentStepEditable,
  setFcmPackage,
  setFcmPackageCurrentProps,
  setFcmPackageEditable,
} from "../../actions/fcmActions";
import { SimpleSelectWrapper } from "../../components/formsUI/SimpleSelectWrapper";
import { findObjectByProperty } from "../../helpers/utilities";
import { LostPartnerCard } from "./components/LostPartnerCard";
import { SearchAndLinkPartner } from "./components/SearchAndLinkPartner";
import { SelectFcmPartnerFromAccount } from "./components/SelectFcmPartnerFromAccount";
import { FcmPartnerFormik } from "./FcmPartnerFormik";

export const FcmStepperPartnerSelector = ({ label }) => {
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const dispatch = useDispatch();
  const [selectedCase, setselectedCase] = useState("");
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { activeStep, steps } = fcmPackage;
  const { componentName, props, stepFromOrigin, dataId, config } =
    steps[activeStep];

  const options = [
    {
      label: "Socio vinculado previamente a mi cuenta",
      value: "previousLinked",
      component: <SelectFcmPartnerFromAccount />,
      functions: () => {
        dispatch(
          setFcmCurrentStepConfig({
            isFirstRegister: false,
            isEditable: false,
          })
        );
      },
    },
    {
      label:
        "Socio no vinculado a mi cuenta, pero registrado en esta plataforma",
      value: "previousDataBase",
      component: <SearchAndLinkPartner />,
      functions: () => {
        dispatch(
          setFcmCurrentStepConfig({
            isFirstRegister: false,
            isEditable: false,
          })
        );
      },
    },
    {
      label: "Socio no registrado en esta plataforma",
      value: "newPartner",
      component: <FcmPartnerFormik />,
      functions: () => {
        dispatch(
          setFcmCurrentStepConfig({
            isFirstRegister: false,
            isEditable: true,
          })
        );
      },
    },
    {
      label: "Socio, con credencial extraviada",
      value: "withoutCredential",
      component: <LostPartnerCard />,
      functions: () => {
        dispatch(
          setFcmCurrentStepConfig({
            isFirstRegister: true,
            isEditable: true,
          })
        );
      },
    },
    {
      label: "Dar de alta a un socio que no está registrado en la FCM",
      value: "notRegisteredPartner",
      component: <FcmPartnerFormik />,
      functions: () => {
        dispatch(
          setFcmCurrentStepConfig({
            isFirstRegister: true,
            isEditable: true,
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

  /*************************************************************************************************** */
  /**************************RENDER *********************************************************************/
  /*************************************************************************************************** */

  return (
    <Box>
      <Typography variant="h4" component="h2" mb="3rem">
        {label}
      </Typography>
      {dataId ? (
        <FcmPartnerFormik />
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
