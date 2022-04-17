import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cleanFcmPackage, createFcmPackage, setFcmPackageStatus, updateFcmPackage } from "../../../actions/fcmActions";
import { fireSwalConfirmation } from "../../../helpers/utilities";
import { fcmPackageStatusTypes } from "../../../types/types";

export const FcmPackageSummarySendButton = () => {
  const [isAlreadyReviewed, setIsAlreadyReviewed] = useState(false);
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { status } = fcmPackage;
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAlreadyReviewed(!(status === fcmPackageStatusTypes.filling || status === fcmPackageStatusTypes.sentByClient));
  }, [status]);

  const handleSendData = async () => {
    const confirmation = await fireSwalConfirmation("¿Estás seguro de enviar? Una vez enviado, no se podrá editar la información");
    if (!confirmation) {
      return;
    }

    dispatch(setFcmPackageStatus(fcmPackageStatusTypes.sentByClient));
    if (id) {
      await dispatch(updateFcmPackage(id));
    } else {
      await dispatch(createFcmPackage());
    }
    navigate("/clients");
    await dispatch(cleanFcmPackage());
  };

  return (
    <>
      {!isAlreadyReviewed ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleSendData}>Enviar información</Button>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};
