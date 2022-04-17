import React, { useEffect, useState } from "react";
import { fcmPackageGroupTypes, fcmPackagesTypes } from "../../../types/types";
import { FcmPackageSummarySingleDog } from "./FcmPackageSummarySingleDog";
import { FcmPackageSummaryLitter } from "./FcmPackageSummaryLitter";
import { useSelector } from "react-redux";

export const FcmPackageSummary = () => {
  const [fcmPackageGroup, setFcmPackageGroup] = useState(fcmPackageGroupTypes.litter);
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { packageType } = fcmPackage;

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

  if (fcmPackageGroup === fcmPackageGroupTypes.singleDog) {
    return <FcmPackageSummarySingleDog />;
  }

  if (fcmPackageGroup === fcmPackageGroupTypes.litter) {
    return <FcmPackageSummaryLitter />;
  }
};
