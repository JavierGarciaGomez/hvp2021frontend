import { CollectionsOutlined } from "@mui/icons-material";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fcmPackageLoaded, startLoadingAllFcm } from "../../actions/fcmActions";
import { getFullNameOfObject, isObjectEmpty } from "../../helpers/utilities";
import { fcmPackageGroupTypes, fcmPackagesTypes, fcmStepTypes } from "../../types/types";
import { FcmPrintPackageBreedForm } from "./FcmPrintPackageBreedForm";
import { FcmPrintPackageFcmDog } from "./FcmPrintPackageFcmDog";
import { FcmPrintPackageFcmPartnerData } from "./FcmPrintPackageFcmPartnerData";
import { FcmPrintPackageFcmPrevOwner } from "./FcmPrintPackageFcmPrevOwner";
import { FcmPrintPackageSummary } from "./FcmPrintPackageSummary";
import { FcmPrintResponsiveLetter } from "./FcmPrintResponsiveLetter";
import { PackagePrintLitter } from "./PackagePrintLitter";
import { PackagePrintSingleDog } from "./PackagePrintSingleDog";

export const PackagePrint = () => {
  const [fcmPackageGroup, setFcmPackageGroup] = useState(null);
  const { fcmPackageId } = useParams();
  const { allFcm, fcmPackage } = useSelector((state) => state.fcm);

  const { steps } = fcmPackage;
  const { allFcmPackages = [], allFcmDogs, allFcmTransfers, allFcmPartners } = allFcm;
  const dispatch = useDispatch();
  const [fcmPartners, setFcmPartners] = useState([]);
  const [fcmDogs, setFcmDogs] = useState([]);
  const [prevOwners, setPrevOwners] = useState([]);
  const [responsiveLetters, setResponsiveLetters] = useState([]);
  const [breedingFullData, setBreedingFullData] = useState({});
  const [summaryData, setSummaryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { packageType } = fcmPackage;

  /*************************************************************************************************** */
  /************************** useeffects *******************************************************/
  /*************************************************************************************************** */
  //#region
  //   load the fcmParther if there is an fcmPackageId

  useEffect(() => {
    if (packageType === fcmPackagesTypes.PEDIGREE || packageType === fcmPackagesTypes.RACEPURITY) {
      return setFcmPackageGroup(fcmPackageGroupTypes.litter);
    }
    if (
      packageType === fcmPackagesTypes.INITIALRACEPURITY ||
      packageType === fcmPackagesTypes.INITIALREGISTER ||
      packageType === fcmPackagesTypes.CONTESTCERTIFICATE
    ) {
      return setFcmPackageGroup(fcmPackageGroupTypes.singleDog);
    }
  }, [packageType]);

  useEffect(() => {
    if (allFcmPackages.length === 0) {
      dispatch(startLoadingAllFcm());
    }
  }, []);

  useEffect(() => {
    if (fcmPackageId && allFcmPackages.length > 0) {
      const fcmPackage = allFcmPackages.find((element) => element._id === fcmPackageId);

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
        const foundFcmPartner = allFcmPartners.find((fcmPartner) => fcmPartner._id === step.dataId);
        tempFcmPartners.push(foundFcmPartner);

        if (foundFcmPartner.isCardLost) {
          tempResponsiveLetters.push(foundFcmPartner);
        }

        if (foundFcmPartner.isPending) {
          newRegisters.push(foundFcmPartner);
        }

        if (dayjs(foundFcmPartner.expirationDate).isBefore(dayjs().add(14, "days"))) {
          renewals.push(foundFcmPartner);
        }
      }

      if (step.stepType === fcmStepTypes.fcmDogStep) {
        const foundFcmDog = allFcmDogs.find((element) => element._id === step.dataId);
        tempFcmDogs.push(foundFcmDog);
      }

      // transfers that the pervOwner are not the same owner of parent and mothers
      if (step.stepType === fcmStepTypes.fcmTransferStep) {
        const foundFcmTransfer = allFcmTransfers.find((element) => element._id === step.dataId);

        transfers.push(allFcmTransfers.find((element) => element._id === step.dataId));

        if (foundFcmTransfer) {
          let dataIsFoundInAnotherStep = false;
          // check if the fcmTransferNewOwnerName is not the same from the others
          steps.forEach((step) => {
            if (step.stepType === fcmStepTypes.fcmPartnerStep) {
              const foundFcmPartner = allFcmPartners.find((fcmPartner) => fcmPartner._id === step.dataId);
              if (getFullNameOfObject(foundFcmPartner).toLowerCase() === getFullNameOfObject(foundFcmTransfer.prevOwner).toLowerCase()) {
                dataIsFoundInAnotherStep = true;
              } else {
                tempPrevOwners.forEach((tempPrevOwner) => {
                  if (getFullNameOfObject(tempPrevOwner).toLowerCase() === getFullNameOfObject(foundFcmTransfer.prevOwner).toLowerCase()) {
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

    setFcmPartners(tempFcmPartners);
    setFcmDogs(tempFcmDogs);
    setPrevOwners(tempPrevOwners);
    setResponsiveLetters(tempResponsiveLetters);
  }, [fcmPackage]);

  //#endregion

  if (fcmPackageGroup === fcmPackageGroupTypes.litter) {
    return <PackagePrintLitter />;
  }
  if (fcmPackageGroup === fcmPackageGroupTypes.singleDog) {
    return <PackagePrintSingleDog />;
  }
  return <CircularProgress />;
};
