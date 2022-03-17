import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  addFcmProcedure,
  cleanFcmStep,
  createFcmtransfer,
  handleFcmCompleteStep,
  handleNextFcmPackageStep,
  setFcmCurrentStepEditable,
  updateFcmtransfer,
  updateStepReferences,
} from "../../actions/fcmActions";
import {
  fireSwalError,
  isObjectEmpty,
  setUrlValueOrRefreshImage,
} from "../../helpers/utilities";
import { Box, Button, Card, Typography } from "@mui/material";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import {
  checkIfPreviousStepsAreFilled,
  checkIfStepsAreCompleted,
  getFcmDogIdByOriginStep,
  getFcmParterIdByOriginStep,
} from "../../helpers/fcmUtilities";
import { fireSwalWait } from "../../helpers/sweetAlertUtilities";
import { FcmPrevOwnerFormik } from "./components/FcmPrevOwnerFormik";
import { FcmStepperPartnerSelector } from "./FcmStepperPartnerSelector";

export const FcmTransferFormWrapper = () => {
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { client } = useSelector((state) => state.clients);
  const { fcmPackage } = useSelector((state) => state.fcm);

  const { activeStep, currentProps, steps, completedSteps } = fcmPackage;

  const { formTitle, showCancel } = currentProps;
  const [filesFrontINE, setfilesFrontINE] = useState([]);
  const [filesBackINE, setfilesBackINE] = useState([]);
  const [imgUrlFrontIne, setImgUrlFrontIne] = useState(null);
  const [imgUrlBackIne, setImgUrlBackIne] = useState(null);
  const [fcmPartner, setfcmPartner] = useState(null);
  const [isPending, setisPending] = useState(false);
  const [fcmDog, setfcmDog] = useState({});
  const [isPreviousDataLoaded, setisPreviousDataLoaded] = useState(false);
  const currentStep = steps[activeStep];
  const { dataId, stepFromOrigin } = currentStep;

  const [componentData, setcomponentData] = useState({});
  const [prevOwner, setprevOwner] = useState(null);
  const [newOwner, setnewOwner] = useState(null);
  const [isEditable, setisEditable] = useState(true);
  const [arePrevStepsCompleted, setAreprevStepsCompleted] = useState(false);

  /*************************************************************************************************** */
  /************************** Initial values and validation *******************************************************/
  /*************************************************************************************************** */
  //#region
  useEffect(() => {
    setprevOwner({
      firstName: "Javier",
      paternalSurname: "García",
      maternalSurname: "Gómez",
    });
  }, []);

  // const dog = null;

  // const newOwner = {
  //   fullName: "Nombre Paterno Materno",
  //   partnerNum: "XYZ",
  // };

  const [fullDataHaveBeenFilled, setfullDataHaveBeenFilled] = useState(false);

  let initialValues = {
    previousOwner: {
      firstName: "",
      paternalSurname: "",
      maternalSurname: "",
      urlFrontIne: "",
      urlBackIne: "",
    },
  };

  let validationParams = {
    previousOwner: Yup.object({
      firstName: Yup.string().trim().required("Es obligatorio"),
      paternalSurname: Yup.string().trim().required("Es obligatorio"),
      maternalSurname: Yup.string().trim().required("Es obligatorio"),
    }),
  };

  let formValidation = Yup.object().shape(validationParams);

  const [formValues, setformValues] = useState(initialValues);
  //#endregion
  /*************************************************************************************************** */
  /**************************use effects  **************************************************************/
  /*************************************************************************************************** */
  //#region
  useEffect(() => {
    setAreprevStepsCompleted(
      checkIfStepsAreCompleted(completedSteps, [0, 1, 2, 4])
    );
  }, []);

  useEffect(() => {
    if (arePrevStepsCompleted) {
      console.log("esta es la stepdata", currentStep);
      if (currentStep.stepFromOrigin == 2) {
        setnewOwner(steps[0].stepData);
        setfcmDog(steps[2].stepData);
      }
    }
  });

  console.log("estos son los datos hasta ahora");
  console.log({ newOwner, fcmDog });

  // check if there is already a saved transfer
  useEffect(() => {
    if (dataId) {
      let found = client.linkedFcmTransfers.find((el) => el._id === dataId);
      console.log("found", found);
      if (found) {
        setcomponentData({ ...found });
        setImgUrlFrontIne(found.previousOwner.urlFrontIne);
        setImgUrlBackIne(found.previousOwner.urlBackIne);
      }
    } else {
      setcomponentData(null);
      clearImgsData();
    }
  }, [dataId]);

  useEffect(() => {
    if (!isObjectEmpty(componentData)) {
      setformValues({ ...componentData.previousOwner });
    } else {
      setformValues({ ...initialValues });
    }
  }, [componentData]);

  // set fcmpartner and fcmdog
  useEffect(() => {
    console.log("fcmpackage", fcmPackage);
    if (checkIfPreviousStepsAreFilled(fcmPackage, activeStep)) {
      const fcmDogId = getFcmDogIdByOriginStep(fcmPackage, activeStep);
      const found = client.linkedDogs.find((el) => el._id === fcmDogId);
      setfcmDog(() => ({ ...found }));
      const fcmPartnerId = getFcmParterIdByOriginStep(fcmPackage, activeStep);
      const foundfcmPartner = client.linkedFcmPartners.find(
        (el) => el._id === fcmPartnerId
      );

      setfcmPartner(() => ({ ...foundfcmPartner }));
    }
  }, []);

  // set that the data is loaded
  useEffect(() => {
    if (fcmDog && fcmPartner) {
      setisPreviousDataLoaded(true);
    } else {
      // setisPreviousDataLoaded(false);
      setisPreviousDataLoaded(true);
    }
  }, [fcmDog, fcmPartner]);

  //#endregion
  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */
  //#region
  const clearImgsData = () => {
    setImgUrlBackIne(null);
    setImgUrlFrontIne(null);
    setfilesBackINE([]);
    setfilesFrontINE([]);
  };

  const handleSubmit = async (values) => {
    fireSwalWait("Cargando información", "Por favor, espere");
    Swal.fire({
      title: "Cargando información",
      text: "Por favor, espere",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    // check if the images are loaded
    if (filesFrontINE.length === 0 && !imgUrlFrontIne) {
      return fireSwalError("Se debe cargar la imagen frontal del INE");
    }
    if (filesBackINE.length === 0 && !imgUrlBackIne) {
      return fireSwalError("Se debe cargar la imagen trasera del INE");
    }

    let newValues = { ...values };

    // if there is a new file refresh the image
    newValues = await setUrlValueOrRefreshImage(
      newValues,
      filesFrontINE,
      "urlFrontIne",
      imgUrlFrontIne
    );
    newValues = await setUrlValueOrRefreshImage(
      newValues,
      filesBackINE,
      "urlBackIne",
      imgUrlBackIne
    );

    const finalValues = {
      previousOwner: { ...newValues },
      newOwner: { ...fcmPartner },
      dog: { ...fcmDog },
    };

    // close sweet alert
    Swal.close();
    // set current step not editable
    // if there is an ID: update. If not: create
    let fcmTransfer = null;
    if (!finalValues._id) {
      fcmTransfer = await dispatch(createFcmtransfer(finalValues));
    } else {
      fcmTransfer = await dispatch(updateFcmtransfer(finalValues));
    }

    dispatch(
      addFcmProcedure({
        stepFromOrigin: activeStep,
        type: "transfer",
        data: fcmTransfer,
        dataId: fcmTransfer._id,
      })
    );
    dispatch(updateStepReferences(fcmTransfer));
    dispatch(setFcmCurrentStepEditable(false));

    dispatch(handleFcmCompleteStep());
    clearImgsData();

    // navigate(`/dashboard/documentation`);
  };
  //#endregion
  /*************************************************************************************************** */
  /************************** RENDER *******************************************************/
  /*************************************************************************************************** */

  if (!arePrevStepsCompleted) {
    return (
      <Card sx={{ padding: "2rem", mt: "3rem" }}>
        <Typography>
          Para poder realizar este paso antes es necesario completar los 5 pasos
          anteriores, las ediciones a pasos anteriores podrán afectar e incluso
          borrar los datos de este paso.
        </Typography>
      </Card>
    );
  }

  return (
    <Fragment>
      {!isPreviousDataLoaded && (
        <Card sx={{ padding: "2rem" }}>
          <Typography>
            Para poder realizar este paso antes es necesario completar los pasos
            relativos al propietario del perro y al perro.
          </Typography>
        </Card>
      )}
      {isPreviousDataLoaded && (
        <Fragment>
          <Typography component="h2" variant="h5" mb="2rem">
            {formTitle}
          </Typography>

          {!isEditable && (
            <Box sx={{ mb: "3rem" }}>
              <Typography sx={{ mb: "2rem", lineHeight: "1.5" }}>
                Los datos de socio del propietario del padre han sido llenados,
                puedes continuar con el paso siguiente, editar los datos o
                remover la selección.
              </Typography>
              <Box
                sx={{ display: "flex", width: "100%", gap: "3rem", mb: "3rem" }}
              >
                <Button
                  variant="contained"
                  fullWidth={true}
                  onClick={() => {
                    dispatch(handleNextFcmPackageStep());
                  }}
                  color="primary"
                >
                  Siguiente paso
                </Button>

                <Button
                  variant="contained"
                  fullWidth={true}
                  onClick={() => {
                    dispatch(setFcmCurrentStepEditable(true));
                  }}
                  color="primary"
                >
                  Editar información
                </Button>
                <Button
                  variant="contained"
                  fullWidth={true}
                  onClick={() => {
                    dispatch(cleanFcmStep());
                  }}
                  color="error"
                >
                  Remover
                </Button>
              </Box>
            </Box>
          )}

          <Box>
            <Box mb="3rem">
              <Typography component="h4" variant="h5" mb="2rem">
                Datos del perro a transferir
              </Typography>

              <Typography>Nombre: {fcmDog.petName}</Typography>
              <Typography>Número de registro: {fcmDog.registerNum}</Typography>
            </Box>

            <Box mb="3rem">
              <Typography component="h4" variant="h5" mb="2rem">
                Datos del nuevo propietario
              </Typography>
              <Typography>
                Nombre:{" "}
                {`${newOwner.firstName} ${newOwner.paternalSurname} ${newOwner.maternalSurname}`}
              </Typography>
              <Typography>Número de registro: {newOwner.partnerNum}</Typography>
            </Box>
            <Box mb="3rem">
              <Typography component="h4" variant="h5" mb="2rem">
                Datos del propietario anterior
              </Typography>
              <Typography>{`Nombre: ${prevOwner.firstName} ${prevOwner.paternalSurname} ${prevOwner.maternalSurname}`}</Typography>
            </Box>
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
};
