import { CollectionsOutlined } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fcmPackageLoaded, startLoadingAllFcm } from "../../actions/fcmActions";
import { getFullNameOfObject, isObjectEmpty } from "../../helpers/utilities";
import { fcmStepTypes } from "../../types/types";
import { FcmPrintPackageBreedForm } from "./FcmPrintPackageBreedForm";
import { FcmPrintPackageFcmDog } from "./FcmPrintPackageFcmDog";
import { FcmPrintPackageFcmPartnerData } from "./FcmPrintPackageFcmPartnerData";
import { FcmPrintPackageFcmPrevOwner } from "./FcmPrintPackageFcmPrevOwner";
import { FcmPrintPackageSummary } from "./FcmPrintPackageSummary";
import { FcmPrintResponsiveLetter } from "./FcmPrintResponsiveLetter";

export const PackagePdf = () => {
  const { fcmPackageId } = useParams();
  const { allFcm, fcmPackage } = useSelector((state) => state.fcm);

  const { steps } = fcmPackage;
  const {
    allFcmPackages = [],
    allFcmDogs,
    allFcmTransfers,
    allFcmPartners,
  } = allFcm;
  const dispatch = useDispatch();
  const [fcmPartners, setFcmPartners] = useState([]);
  const [fcmDogs, setFcmDogs] = useState([]);
  const [prevOwners, setPrevOwners] = useState([]);
  const [responsiveLetters, setResponsiveLetters] = useState([]);
  const [breedingFullData, setBreedingFullData] = useState({});
  const [summaryData, setSummaryData] = useState({});

  /*************************************************************************************************** */
  /************************** useeffects *******************************************************/
  /*************************************************************************************************** */
  //#region
  //   load the fcmParther if there is an fcmPackageId

  useEffect(() => {
    if (allFcmPackages.length === 0) {
      dispatch(startLoadingAllFcm());
    }
  }, []);

  useEffect(() => {
    if (fcmPackageId && allFcmPackages.length > 0) {
      const fcmPackage = allFcmPackages.find(
        (element) => element._id === fcmPackageId
      );

      dispatch(fcmPackageLoaded(fcmPackage));
    } else {
    }
  }, [allFcmPackages]);

  useEffect(() => {
    const tempFcmPartners = [];
    const tempFcmDogs = [];
    const tempPrevOwners = [];
    const tempResponsiveLetters = [];
    const newRegisters = [];
    const renewals = [];
    const transfers = [];

    steps.forEach((step) => {
      if (step.stepType === fcmStepTypes.fcmPartnerStep) {
        const foundFcmPartner = allFcmPartners.find(
          (fcmPartner) => fcmPartner._id === step.dataId
        );
        tempFcmPartners.push(foundFcmPartner);

        if (foundFcmPartner.isCardLost) {
          tempResponsiveLetters.push(foundFcmPartner);
        }

        if (foundFcmPartner.isPending) {
          newRegisters.push(foundFcmPartner);
        }

        if (
          dayjs(foundFcmPartner.expirationDate).isBefore(
            dayjs().add(14, "days")
          )
        ) {
          renewals.push(foundFcmPartner);
        }
      }

      if (step.stepType === fcmStepTypes.fcmDogStep) {
        const foundFcmDog = allFcmDogs.find(
          (element) => element._id === step.dataId
        );
        tempFcmDogs.push(foundFcmDog);
      }

      // transfers that the pervOwner are not the same owner of parent and mothers
      if (step.stepType === fcmStepTypes.fcmTransferStep) {
        const foundFcmTransfer = allFcmTransfers.find(
          (element) => element._id === step.dataId
        );

        transfers.push(
          allFcmTransfers.find((element) => element._id === step.dataId)
        );

        if (foundFcmTransfer) {
          let dataIsFoundInAnotherStep = false;
          // check if the fcmTransferNewOwnerName is not the same from the others
          steps.forEach((step) => {
            if (step.stepType === fcmStepTypes.fcmPartnerStep) {
              const foundFcmPartner = allFcmPartners.find(
                (fcmPartner) => fcmPartner._id === step.dataId
              );
              if (
                getFullNameOfObject(foundFcmPartner).toLowerCase() ===
                getFullNameOfObject(foundFcmTransfer.prevOwner).toLowerCase()
              ) {
                dataIsFoundInAnotherStep = true;
              } else {
                tempPrevOwners.forEach((tempPrevOwner) => {
                  if (
                    getFullNameOfObject(tempPrevOwner).toLowerCase() ===
                    getFullNameOfObject(
                      foundFcmTransfer.prevOwner
                    ).toLowerCase()
                  ) {
                    dataIsFoundInAnotherStep = true;
                  }
                });
              }
            }
          });
          if (!dataIsFoundInAnotherStep) {
            tempPrevOwners.push(foundFcmTransfer.prevOwner);
          }
        }
      }
    });

    const fcmPartnerMaleOwner = allFcmPartners.find(
      (element) => element._id === steps[0].dataId
    );
    const fcmPartnerFemaleOwner = allFcmPartners.find(
      (element) => element._id === steps[1].dataId
    );
    const fcmDogMale = allFcmDogs.find(
      (element) => element._id === steps[2].dataId
    );
    const fcmDogFemale = allFcmDogs.find(
      (element) => element._id === steps[3].dataId
    );

    if (steps[4]?.stepData) {
      setBreedingFullData({
        ...steps[4].stepData,
        fcmPartnerMaleOwner,
        fcmPartnerFemaleOwner,
        fcmDogMale,
        fcmDogFemale,
      });
      setSummaryData({
        user: fcmPackage.creator.email,
        applicationDate: fcmPackage.applicationDate,
        inspectionDate: fcmPackage.medicalInspection.inspectionDate,
        certificates: [...steps[4]?.stepData?.puppies],
        newRegisters,
        renewals,
        transfers,
      });
    }

    setFcmPartners(tempFcmPartners);
    setFcmDogs(tempFcmDogs);
    setPrevOwners(tempPrevOwners);
    setResponsiveLetters(tempResponsiveLetters);
  }, [fcmPackage]);

  console.log(summaryData);

  //#endregion

  return (
    //   all
    <Box sx={{ padding: "3rem" }}>
      {/* breeding */}
      {!isObjectEmpty(summaryData) && (
        <FcmPrintPackageSummary summaryData={summaryData} />
      )}
      <div className="u-pagebreak" />
      {!isObjectEmpty(breedingFullData) && (
        <FcmPrintPackageBreedForm breedingData={breedingFullData} />
      )}
      <div className="u-pagebreak" />

      {fcmPartners.map((element) => (
        <Fragment key={element._id}>
          <FcmPrintPackageFcmPartnerData fcmPartner={element} />
          <div className="u-pagebreak" />
        </Fragment>
      ))}
      {fcmDogs.map((element) => (
        <Fragment key={element._id}>
          <FcmPrintPackageFcmDog fcmDog={element} />
          <div className="u-pagebreak" />
        </Fragment>
      ))}
      {prevOwners.map((element) => (
        <Fragment key={getFullNameOfObject(element)}>
          <FcmPrintPackageFcmPrevOwner prevOwner={element} />
          <div className="u-pagebreak" />
        </Fragment>
      ))}
      {responsiveLetters.map((element) => (
        <Fragment key={`${element._id}`}>
          <FcmPrintResponsiveLetter responsiveLetter={element} />
          <div className="u-pagebreak" />
        </Fragment>
      ))}
    </Box>
  );
};
