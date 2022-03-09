import { Box, Button, FormControl, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFcmProcedure, setFcmPackage } from "../../../actions/fcmActions";
import { fireSwalSuccess, includeInPackage } from "../../../helpers/utilities";
import { FcmPartnerFormik } from "../FcmPartnerFormik";

export const LostPartnerCard = () => {
  const dispatch = useDispatch();
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { activeStep, currentProps } = fcmPackage;
  const [showForm, setshowForm] = useState(false);
  const handleSubmit = () => {
    fireSwalSuccess("Carta responsiva agregada al paquete");
    dispatch(
      addFcmProcedure({
        step: activeStep,
        procedureType: "responsiveLetter",
        dataId: "responsiveLetter",
      })
    );
    setshowForm(true);
  };
  return (
    <Fragment>
      {!showForm && (
        <Box mb="4rem">
          <Typography mb="2rem">
            En caso de que el socio haya extraviado su tarjeta, nuestra
            recomendación es ponerse en contacto con la Federación Canófila
            Mexicana para solicitar su reposición o, al menos, los datos de la
            tarjeta. Sin embargo, es posible realizar el trámite, siempre que el
            cliente suscriba una carta responsiva.
          </Typography>

          <Box
            sx={{
              bgcolor: "grey.300",
              padding: "2rem",
              color: "gray.contrastText",
              lineHeight: 1.5,
              borderRadius: 2,
              boxShadow: 5,
              mb: "3rem",
            }}
          >
            Por medio, del presente, señalo que no tengo en mi posesión la
            credencial de la Federación Canófila Mexicana en la que constan mis
            datos de afiliación, sin embargo, aseguro que soy socio VIGENTE de
            esta asociación. Por lo que autorizo a esta a obtener los datos
            correspondientes en su base de datos. En este orden de ideas, asumo
            las consecuencias que pudieran ocurrir por no ser socio vigente como
            es el caso de retrasos en el trámite o la necesidad de hacer
            trámites posteriores.
          </Box>
          <Button
            variant="contained"
            fullWidth={true}
            onClick={handleSubmit}
            color="primary"
          >
            Acepto las condiciones
          </Button>
        </Box>
      )}

      {showForm && <FcmPartnerFormik />}
    </Fragment>
  );
};
