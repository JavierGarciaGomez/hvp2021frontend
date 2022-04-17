import React, { useEffect, useState } from "react";
import { fcmPackageGroupTypes, fcmPackagesTypes } from "../../../types/types";
import { FcmPackageSummarySingleDog } from "./FcmPackageSummarySingleDog";
import { FcmPackageSummaryLitter } from "./FcmPackageSummaryLitter";
import { useSelector } from "react-redux";
import { FcmPackageSummaryPartner } from "./FcmPackageSummaryPartner";
import { FcmPackageSummaryTransfer } from "./FcmPackageSummaryTransfer";

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
    if (packageType === fcmPackagesTypes.PARTNERSHIP) return setFcmPackageGroup(fcmPackageGroupTypes.partner);
    if (packageType === fcmPackagesTypes.TRANSFER) return setFcmPackageGroup(fcmPackageGroupTypes.transfer);
  }, [packageType]);

  if (fcmPackageGroup === fcmPackageGroupTypes.singleDog) {
    return <FcmPackageSummarySingleDog />;
  }

  if (fcmPackageGroup === fcmPackageGroupTypes.litter) {
    return <FcmPackageSummaryLitter />;
  }
  if (fcmPackageGroup === fcmPackageGroupTypes.partner) {
    return <FcmPackageSummaryPartner />;
  }
  if (fcmPackageGroup === fcmPackageGroupTypes.transfer) {
    return <FcmPackageSummaryTransfer />;
  }
};
