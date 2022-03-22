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
  createFcmPartner,
  startLoadingAllFcm,
  updateFcmPartner,
} from "../../../actions/fcmActions";
import { transformDatePropertyToInput } from "../../../helpers/dateUtilities";
import {
  checkIfUrlOrFileExist,
  fireSwalError,
  getFullNameOfObject,
  getImgUrlByFileOrUrl,
} from "../../../helpers/utilities";
import { fireSwalWait } from "../../../helpers/sweetAlertUtilities";
import dayjs from "dayjs";

let emptyFormValues = {
  firstName: "",
  paternalSurname: "",
  maternalSurname: "",
  partnerNum: "",
  expirationDate: "",
  address: {
    street: "",
    number: "",
    suburb: "",
    postalCode: "",
    city: "",
    state: "Yucatán",
    country: "México",
  },
  homePhone: "",
  mobilePhone: "",
  email: "",
  urlPartnerCard: null,
  urlProofOfResidency: null,
  urlFrontIne: "",
  urlBackIne: "",
  isPending: false,
  isCardLost: false,
};

let validationParams = {
  isPending: Yup.boolean(),
  isCardLost: Yup.boolean(),
  firstName: Yup.string().trim().required("Es obligatorio"),
  paternalSurname: Yup.string().trim().required("Es obligatorio"),
  maternalSurname: Yup.string().trim().required("Es obligatorio"),
  partnerNum: Yup.string().when(["isPending", "isCardLost"], {
    is: false,
    then: Yup.string().required("Es obligatorio"),
  }),
  expirationDate: Yup.date().when(["isPending", "isCardLost"], {
    is: false,
    then: Yup.date().required("Es obligatorio"),
  }),
  address: Yup.object({
    street: Yup.string().trim().required("Es obligatorio"),
    number: Yup.string().trim().required("Es obligatorio"),
    suburb: Yup.string().trim().required("Es obligatorio"),
    postalCode: Yup.string()
      .trim()
      .length(5, "El código postal debe contar con cinco carácteres")
      .required("Es obligatorio"),
    city: Yup.string().trim().required("Es obligatorio"),
    state: Yup.string().trim().required("Es obligatorio"),
    country: Yup.string().trim().required("Es obligatorio"),
  }),

  homePhone: Yup.string()
    .trim()
    .min(7, "Debe contar al menos con 7 carácteres"),
  mobilePhone: Yup.string()
    .trim()
    .min(7, "Debe contar al menos con 7 carácteres"),
  email: Yup.string()
    .email("Debe ser una forma válida de email")
    .required("Es obligatorio"),
};

export const FcmPartner = ({ fcmPartnerid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let formValidation = Yup.object().shape(validationParams);
  const { allFcm } = useSelector((state) => state.fcm);
  const { allFcmPartners = [] } = allFcm;
  const [initialFormValues, setInitialFormValues] = useState(emptyFormValues);

  const [filesFcmPartner, setfilesFcmPartner] = useState([]);
  const [filesProofOfResidency, setfilesProofOfResidency] = useState([]);
  const [filesFrontINE, setfilesFrontINE] = useState([]);
  const [filesBackINE, setfilesBackINE] = useState([]);
  const [isEditable, setisEditable] = useState(true);
  const { id } = useParams();
  const [fcmPartner, setfcmPartner] = useState(null);
  const [heading, setHeading] = useState("Crear socio nuevo");

  console.log(fcmPartnerid);

  /*************************************************************************************************** */
  /************************** useeffects *******************************************************/
  /*************************************************************************************************** */
  //#region
  //   load the fcmParther if there is an id

  useEffect(() => {
    if (allFcmPartners.length === 0) {
      dispatch(startLoadingAllFcm());
    }
  }, []);

  useEffect(() => {
    if (allFcmPartners.length > 0) {
      console.log(fcmPartnerid);
      let idToSearch = null;
      if (id) idToSearch = id;
      if (fcmPartnerid) idToSearch = fcmPartnerid;

      console.log(idToSearch);
      console.log(allFcmPartners);
      if (!idToSearch) return;

      const fcmPartner = allFcmPartners.find(
        (element) => element._id === idToSearch
      );

      console.log(fcmPartner);
      const fcmPartnerFormattedDate = transformDatePropertyToInput(
        fcmPartner,
        "expirationDate"
      );
      setfcmPartner(fcmPartnerFormattedDate);
      setInitialFormValues({ ...fcmPartnerFormattedDate });
      setisEditable(false);
      setHeading(
        `Socio ${getFullNameOfObject(fcmPartner) || ""} - ${
          fcmPartner?.partnerNum || ""
        }`
      );
    }
  }, [allFcmPartners]);

  //#endregion
  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */
  //#region

  const checkImages = (values) => {
    if (!values.isPending && !values.isCardLost) {
      if (!checkIfUrlOrFileExist(filesFcmPartner, values.urlPartnerCard)) {
        fireSwalError("Se debe cargar la imagen de la tarjeta de socio");
        return false;
      }
    }
    if (
      !checkIfUrlOrFileExist(filesProofOfResidency, values.urlProofOfResidency)
    ) {
      fireSwalError("Se debe cargar la imagen de la tarjeta de socio");
      return false;
    }
    if (!checkIfUrlOrFileExist(filesFrontINE, values.urlFrontIne)) {
      fireSwalError("Se debe cargar la imagen frontal del INE");
      return false;
    }
    if (!checkIfUrlOrFileExist(filesBackINE, values.urlBackIne)) {
      fireSwalError("Se debe cargar la imagen trasera del INE");
      return false;
    }
    return true;
  };

  const handleSubmit = async (values) => {
    fireSwalWait();
    if (!checkImages(values)) return;

    const {
      urlPartnerCard,
      urlProofOfResidency,
      urlFrontIne,
      urlBackIne,
      isPending,
      isCardLost,
    } = values;

    if (!isPending && !isCardLost) {
      values.urlPartnerCard = await getImgUrlByFileOrUrl(
        filesFcmPartner,
        urlPartnerCard
      );
    }

    values.urlProofOfResidency = await getImgUrlByFileOrUrl(
      filesProofOfResidency,
      urlProofOfResidency
    );

    values.urlFrontIne = await getImgUrlByFileOrUrl(filesFrontINE, urlFrontIne);
    values.urlBackIne = await getImgUrlByFileOrUrl(filesBackINE, urlBackIne);

    let newValues =
      isPending || isCardLost ? emptyUnusedValues(values) : { ...values };

    console.log("estos son new values", newValues);

    if (newValues._id) {
      await dispatch(updateFcmPartner(newValues));
    } else {
      return await dispatch(createFcmPartner(newValues));
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
    newValues.urlPartnerCard = "";
    newValues.expirationDate = null;
    if (values.isPending) {
      newValues.partnerNum = `En trámite - ${getFullNameOfObject(
        values
      )} - ${dayjs().format("DD-MM-YY HH:mm")}`;
    } else if (values.isCardLost) {
      newValues.partnerNum = `Extravío - ${getFullNameOfObject(
        values
      )} - ${dayjs().format("DD-MM-YY HH:mm")}`;
    }
    return newValues;
  };

  //#endregion

  return (
    <Box>
      <Typography component="h2" variant="h5" mb="2rem">
        {heading}
      </Typography>
      {/* Notas */}
      <Box
        sx={{
          bgcolor: "grey.300",
          p: "2rem",
          borderRadius: 2,
          boxShadow: 5,
          mb: "5rem",
        }}
      >
        <Typography component="h3" variant="h6" mb="1rem" fontWeight="bold">
          Notas:
        </Typography>
        <Typography mb="1rem">
          Las imágenes deben tener un tamaño máximo de 1mb.
        </Typography>
        <Typography mb="1rem">
          Si la tarjeta ya está vencida y cuentas con una nueva, es necesario
          reemplazar la imagen.
        </Typography>
        <Typography mb="1rem">
          Si se va a realizar la renovación de un nuevo socio, es importante que
          el comprobante domiciliario no sea anterior a 3 meses. En su caso,
          reemplazar la imagen
        </Typography>
      </Box>
      {/* Formulario */}
      <Formik
        initialValues={{ ...initialFormValues }}
        validationSchema={formValidation}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        enableReinitialize
      >
        {({ values, errors, isSubmitting, isValid, resetForm }) => (
          <Form>
            <Grid container spacing={2}>
              {/* CONDICIONES INICIALES */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography component="h4" variant="h5">
                      Condiciones iniciales
                    </Typography>
                  </Grid>
                  {!values.isCardLost && (
                    <Grid item xs={6}>
                      <CheckboxInputWrapper
                        name="isPending"
                        label="Es nuevo socio"
                        disabled={!isEditable}
                      />
                    </Grid>
                  )}

                  {!values.isPending && (
                    <Grid item xs={6}>
                      <CheckboxInputWrapper
                        name="isCardLost"
                        label="La tarjeta está extraviada"
                        disabled={!isEditable}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              {/* DATOS DE IDENTIFICACIÓN */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography component="h4" variant="h5">
                      Datos de Identificación
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextFieldWrapper
                      name="firstName"
                      label="Nombre (s)"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextFieldWrapper
                      name="paternalSurname"
                      label="Apellido paterno"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextFieldWrapper
                      name="maternalSurname"
                      label="Apellido materno"
                      disabled={!isEditable}
                    />
                  </Grid>

                  <Fragment>
                    {!values.isPending && (
                      <Grid item xs={12} md={6}>
                        <TextFieldWrapper
                          name="partnerNum"
                          label="Número de socio"
                          disabled={!isEditable}
                        />
                      </Grid>
                    )}
                    {!values.isPending && !values.isCardLost && (
                      <Grid item xs={12} md={6}>
                        <DatePickerFieldWrapper
                          name="expirationDate"
                          label="Fecha de expiración"
                          disabled={!isEditable}
                        />
                      </Grid>
                    )}
                  </Fragment>
                </Grid>
              </Grid>

              {/* ADDRESS */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography component="h4" variant="h5">
                      Dirección
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextFieldWrapper
                      name="address.street"
                      label="Calle"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextFieldWrapper
                      name="address.number"
                      label="Número"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextFieldWrapper
                      name="address.suburb"
                      label="Colonia o fraccionamiento"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextFieldWrapper
                      name="address.postalCode"
                      label="Código postal"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextFieldWrapper
                      name="address.city"
                      label="Ciudad"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextFieldWrapper
                      name="address.state"
                      label="Estado"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextFieldWrapper
                      name="address.country"
                      label="País"
                      disabled={!isEditable}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* CONTACT */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography component="h4" variant="h5">
                      Contacto
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextFieldWrapper
                      name="homePhone"
                      label="Teléfono"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextFieldWrapper
                      name="mobilePhone"
                      label="Teléfono móvil"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} mb={2}>
                    <TextFieldWrapper
                      name="email"
                      label="Correo electrónico"
                      disabled={!isEditable}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* SECTION IMAGES */}
              <Grid item xs={12} mb="2rem">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography component="h4" variant="h5" mb="2rem">
                      Imágenes
                    </Typography>
                  </Grid>
                  {/* tarjeta de socio */}
                  {!values.isCardLost && !values.isPending && (
                    <Grid item xs={12} md={6}>
                      <Typography mb="2rem">Tarjeta de socio</Typography>
                      <DragImageUpload
                        files={filesFcmPartner}
                        setFiles={setfilesFcmPartner}
                        imgUrl={values.urlPartnerCard}
                        editable={isEditable}
                      ></DragImageUpload>
                      <Box
                        sx={{
                          mt: "1rem",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() => {
                            window.open(values.urlPartnerCard);
                          }}
                        >
                          Ver imagen
                        </Button>
                      </Box>
                    </Grid>
                  )}
                  <Grid item xs={12} md={6}>
                    <Typography mb="2rem">Comprobante domicilario</Typography>
                    <DragImageUpload
                      files={filesProofOfResidency}
                      setFiles={setfilesProofOfResidency}
                      imgUrl={values.urlProofOfResidency}
                      editable={isEditable}
                    ></DragImageUpload>
                    <Box
                      sx={{
                        mt: "1rem",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        size="small"
                        onClick={() => {
                          window.open(values.urlProofOfResidency);
                        }}
                      >
                        Ver imagen
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography mb="2rem">INE frente</Typography>
                    <DragImageUpload
                      files={filesFrontINE}
                      setFiles={setfilesFrontINE}
                      imgUrl={values.urlFrontIne}
                      editable={isEditable}
                    ></DragImageUpload>
                    <Box
                      sx={{
                        mt: "1rem",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        size="small"
                        onClick={() => {
                          window.open(values.urlFrontIne);
                        }}
                      >
                        Ver imagen
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography mb="2rem">INE reverso</Typography>
                    <DragImageUpload
                      files={filesBackINE}
                      setFiles={setfilesBackINE}
                      imgUrl={values.urlBackIne}
                      editable={isEditable}
                    ></DragImageUpload>
                    <Box
                      sx={{
                        mt: "1rem",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        size="small"
                        onClick={() => {
                          window.open(values.urlBackIne);
                        }}
                      >
                        Ver imagen
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/* BUTTONS */}

              <Grid item xs={12} mb={2}>
                <Box sx={{ display: "flex", width: "100%", gap: "3rem" }}>
                  {isEditable ? (
                    <ButtonFormWrapper variant="text">
                      Guardar
                    </ButtonFormWrapper>
                  ) : (
                    <Button
                      fullWidth={true}
                      onClick={() => {
                        setisEditable(true);
                      }}
                    >
                      Editar
                    </Button>
                  )}

                  <Button
                    fullWidth={true}
                    onClick={() => {
                      resetForm();
                      handleCancel();
                    }}
                    color="error"
                  >
                    Cancelar
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box>
              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
