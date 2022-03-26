import { Box, Button, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { ButtonFormWrapper } from "../../../components/formsUI/ButtonFormWrapper";
import { CheckboxInputWrapper } from "../../../components/formsUI/CheckboxInputWrapper";
import { DatePickerFieldWrapper } from "../../../components/formsUI/DatePickerFieldWrapper";
import { DragImageUpload } from "../../../components/formsUI/DragImageUpload";
import { TextFieldWrapper } from "../../../components/formsUI/TextFieldWrapper";
import {
  createFcmDog,
  startLoadingAllFcm,
  updateFcmDog,
} from "../../../actions/fcmActions";
import { transformDatePropertyToInput } from "../../../helpers/dateUtilities";
import {
  checkIfUrlOrFileExist,
  fireSwalError,
  getFullNameOfObject,
  getImgUrlByFileOrUrl,
  isObjectEmpty,
} from "../../../helpers/utilities";
import { fireSwalWait } from "../../../helpers/sweetAlertUtilities";
import dayjs from "dayjs";
import { SelectWrapper } from "../../../components/formsUI/SelectWrapper";
import { fcmCertificatesTypes } from "../../../types/types";
import { FcmTransferShow } from "./FcmTransferShow";
import { FcmTransferEdit } from "./FcmTransferEdit";

// todo
// let emptyFormValues = {
//   dog: {},
//   prevOwner: {},
// };

// todo
// let validationParams = {
//   petName: Yup.string().trim().required("Es obligatorio"),
//   breed: Yup.string().trim().required("Es obligatorio"),
//   color: Yup.string().trim().required("Es obligatorio"),
//   sex: Yup.string().trim().required("Es obligatorio"),
//   birthDate: Yup.date().required("Es obligatorio"),
//   registerType: Yup.string().trim().required("Es obligatorio"),
//   isRegisterPending: Yup.boolean(),
//   isTransferPending: Yup.boolean(),
//   registerNum: Yup.string().when("isRegisterPending", {
//     is: false,
//     then: Yup.string().required("Es obligatorio"),
//   }),
// };

export const FcmTransfer = (props) => {
  const { fcmTransferId, extraProps, onSave } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // let formValidation = Yup.object().shape(validationParams);
  const { allFcm } = useSelector((state) => state.fcm);
  const { allFcmTransfers = [] } = allFcm;
  // const [initialFormValues, setInitialFormValues] = useState(emptyFormValues);

  const [filesFront, setFilesFront] = useState([]);
  const [filesBack, setFilesBack] = useState([]);
  const [isEditable, setisEditable] = useState(false);
  const { id } = useParams();

  const [heading, setHeading] = useState(
    "Transferencia o cambio de propietario"
  );
  const [fcmTransfer, setfcmTransfer] = useState({});
  const [showButtons, setShowButtons] = useState(true);

  /*************************************************************************************************** */
  /************************** useeffects *******************************************************/
  /*************************************************************************************************** */
  //#region
  //   load the fcmParther if there is an id

  useEffect(() => {
    if (allFcmTransfers.length === 0) {
      dispatch(startLoadingAllFcm());
    }
  }, []);

  useEffect(() => {
    if (!isObjectEmpty(extraProps)) {
      setisEditable(extraProps.isEditable);
      setShowButtons(extraProps.showButtons);
    }
  }, [extraProps]);

  useEffect(() => {
    console.log(fcmTransferId);
    if (allFcmTransfers.length > 0) {
      let idToSearch = null;
      if (id) idToSearch = id;
      if (fcmTransferId) idToSearch = fcmTransferId;
      if (!idToSearch) return;

      const fcmTransfer = allFcmTransfers.find(
        (element) => element._id === idToSearch
      );
      console.log(fcmTransfer);
      // setInitialFormValues({ ...fcmDogFormattedDate });
      setisEditable(false);
      setfcmTransfer(fcmTransfer);
    } else {
      setisEditable(true);
    }
  }, [allFcmTransfers]);

  //#endregion
  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */
  //#region

  const checkImages = (values) => {
    if (!values.isRegisterPending) {
      if (!checkIfUrlOrFileExist(filesFront, values.urlFront)) {
        fireSwalError("Se debe cargar la imagen frontal del certificado");
        return false;
      }
      if (!checkIfUrlOrFileExist(filesBack, values.urlBack)) {
        fireSwalError("Se debe cargar la imagen trasera del certificado");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (values) => {
    fireSwalWait();
    if (!checkImages(values)) return;

    const { urlFront, urlBack, isRegisterPending } = values;

    if (!isRegisterPending) {
      values.urlFront = await getImgUrlByFileOrUrl(filesFront, urlFront);
      values.urlBack = await getImgUrlByFileOrUrl(filesBack, urlBack);
    }

    let newValues = isRegisterPending
      ? emptyUnusedValues(values)
      : { ...values };

    if (newValues._id) {
      await dispatch(updateFcmDog(newValues));
    } else {
      return await dispatch(createFcmDog(newValues));
    }
    navigate(-1);
  };

  const handleCancel = () => {
    if (isEditable) {
      return setisEditable(false);
    }
    return navigate(-1);
  };

  const emptyUnusedValues = (values) => {
    const newValues = { ...values };
    newValues.urlFront = "";
    newValues.urlBack = "";
    newValues.registerNum = `En trámite - ${values.petName} - ${dayjs().format(
      "DD-MM-YY HH:mm"
    )}`;

    return newValues;
  };

  //#endregion

  if (!isEditable)
    return (
      <FcmTransferShow
        fcmTransfer={fcmTransfer}
        setisEditable={setisEditable}
        {...props}
      />
    );

  if (isEditable)
    return <FcmTransferEdit fcmTransfer={fcmTransfer} {...props} />;
};
