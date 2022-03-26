import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  createFcmDog,
  removeFcmPuppy,
  removeFcmSteps,
  setFcmStepProperty,
  updateFcmDog,
  updateStepReferencesByStep,
} from "../../../../actions/fcmActions";
import { FcmDogCard } from "../../../../components/fcm/FcmDogCard";
import { FcmPartnerCard } from "../../../../components/fcm/FcmPartnerCard";
import { SearchBox } from "../../../../components/searchBox/SearchBox";
import { fireSwalWait } from "../../../../helpers/sweetAlertUtilities";
import { fireSwalConfirmation } from "../../../../helpers/utilities";
import { fcmStepTypes } from "../../../../types/types";
import { FcmDog } from "../FcmDog";
import { FcmPartner } from "../FcmPartner";
import { FcmTransfer } from "../FcmTransfer";
import { FcmBreedingFormWrapper } from "./FcmBreedingFormWrapper";

export const FcmRevisionPanel = ({
  stepIndex,
  setShowRevisionPanel,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const { fcmPackage, allFcm } = useSelector((state) => state.fcm);
  const { allFcmPartners, allFcmDogs } = allFcm;
  const { steps } = fcmPackage;
  const reviewedStep = steps[stepIndex];
  const { stepType, isValidated } = reviewedStep;
  const [extraProps, setExtraProps] = useState({
    isEditable: false,
    showButtons: false,
  });
  const [selectAnother, setSelectAnother] = useState(false);

  const [searchData, setSearchData] = useState([]);
  const [selectAnotherProps, setSelectAnotherProps] = useState({});

  const [prevPuppies, setPrevPuppies] = useState([]);
  const [showSelectAnother, setShowSelectAnother] = useState(true);

  /**************************Handler************************************ */
  const handleValidate = () => {
    dispatch(setFcmStepProperty(stepIndex, "isValidated", true));
    setShowRevisionPanel(false);
  };

  const handleInvalidate = () => {
    dispatch(setFcmStepProperty(stepIndex, "isValidated", false));
  };

  const handleEdit = () => {
    setExtraProps((prev) => ({
      ...prev,
      isEditable: true,
      showButtons: true,
      navigateBack: false,
    }));
  };

  const handleSelectAnother = () => {
    setSelectAnother((prev) => !prev);
  };

  const handleSelectNew = (selectedItem) => {
    setSelectAnother(false);
    dispatch(setFcmStepProperty(stepIndex, "dataId", selectedItem._id));
  };

  const handleSave = (values) => {
    handleExtraProps({ isEditable: false, showButtons: false });
    if (stepType === fcmStepTypes.fcmBreedingStep) {
      handleSaveBreedingForm(values);
    }
  };

  const handleSaveBreedingForm = async (values) => {
    fireSwalWait();

    // remove extra unused puppies
    if (prevPuppies.length > values.puppies.length) {
      for (let i = values.puppies.length; i < prevPuppies.length; i++) {
        console.log(prevPuppies[i]);
        await dispatch(removeFcmPuppy(prevPuppies[i], fcmPackage.creator));
      }
    }

    Swal.close();
    // create dogs as fcm
    let newPuppies = [];
    for (let puppy of values.puppies) {
      let fcmPuppy = null;
      puppy.birthDate = values.birthDate;
      puppy.breed = steps[2].stepData.breed;
      puppy.registerNum = `En trámite - ${puppy.petName} - ${dayjs().format(
        "DD-MM-YY HH:mm"
      )}`;

      if (puppy._id) {
        fcmPuppy = await dispatch(updateFcmDog(puppy, false));
      } else {
        fcmPuppy = await dispatch(createFcmDog(puppy, false));
      }

      newPuppies.push(fcmPuppy);
    }

    values.puppies = newPuppies;

    dispatch(updateStepReferencesByStep(stepIndex, values));
  };

  const handleExtraProps = (newProps) => {
    setExtraProps((prev) => ({ ...prev, ...newProps }));
  };

  const handleCancel = () => {
    if (extraProps.isEditable) {
      handleExtraProps({ isEditable: false, showButtons: false });
    } else {
      onCancel();
    }
  };

  /**************************Use effects************************************ */

  useEffect(() => {
    switch (stepType) {
      case fcmStepTypes.fcmPartnerStep:
        setShowSelectAnother(true);
        setSelectAnotherProps({
          onSelect: handleSelectNew,
          searchData: allFcmPartners,
          CardComponent: FcmPartnerCard,
          searchParams: ["partnerNum", "paternalSurname", "maternalSurname"],
          searchFieldLabel: "Número de socio o apellidos",
        });

      case fcmStepTypes.fcmDogStep:
        setShowSelectAnother(true);
        setSelectAnotherProps({
          onSelect: handleSelectNew,
          searchData: allFcmDogs,
          CardComponent: FcmDogCard,
          searchParams: ["registerNum", "petName"],
          searchFieldLabel: "Número de registro o nombre",
        });

      case fcmStepTypes.fcmBreedingStep:
        setShowSelectAnother(false);
        setPrevPuppies(steps[stepIndex].stepData.puppies);

      case fcmStepTypes.fcmTransferStep:
        setShowSelectAnother(false);

      default:
        break;
    }
  }, [reviewedStep]);

  console.log(stepType);
  console.log(prevPuppies);

  return (
    <Paper
      mb="4rem"
      elevation={20}
      sx={{ backgroundColor: "transparent", padding: "2rem" }}
    >
      <Box>
        <Typography component="h3" variant="h5">
          Panel de revisión
        </Typography>
      </Box>
      {stepType === fcmStepTypes.fcmPartnerStep && (
        <Fragment>
          {selectAnother ? (
            <SearchBox {...selectAnotherProps} />
          ) : (
            <FcmPartner
              fcmPartnerid={reviewedStep.dataId}
              extraProps={extraProps}
              handleExtraProps={handleExtraProps}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </Fragment>
      )}
      {stepType === fcmStepTypes.fcmDogStep && (
        <Fragment>
          {selectAnother ? (
            <SearchBox {...selectAnotherProps} />
          ) : (
            <FcmDog
              fcmDogId={reviewedStep.dataId}
              extraProps={extraProps}
              handleExtraProps={handleExtraProps}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </Fragment>
      )}
      {stepType === fcmStepTypes.fcmBreedingStep && (
        <FcmBreedingFormWrapper
          breedingData={reviewedStep.stepData}
          extraProps={extraProps}
          handleExtraProps={handleExtraProps}
          onSave={handleSave}
          onCancel={handleCancel}
          allowEditPuppiesTransfers={false}
        />
      )}
      {stepType === fcmStepTypes.fcmTransferStep && (
        <FcmTransfer
          fcmTransferId={reviewedStep.dataId}
          extraProps={extraProps}
          handleExtraProps={handleExtraProps}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {isValidated ? (
        <Paper sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button onClick={handleInvalidate} color="error">
            Invalidar
          </Button>
          <Button onClick={handleCancel} color="error">
            Cancelar
          </Button>
        </Paper>
      ) : extraProps.isEditable ? (
        <Paper sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button onClick={handleCancel} color="error">
            Cancelar
          </Button>
        </Paper>
      ) : (
        <Paper sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button onClick={handleValidate}>Validar</Button>

          <Button onClick={handleEdit}>Editar</Button>
          {showSelectAnother && (
            <Button onClick={handleSelectAnother}>Seleccionar otro</Button>
          )}

          <Button onClick={handleCancel} color="error">
            Cancelar
          </Button>
        </Paper>
      )}
    </Paper>
  );
};
