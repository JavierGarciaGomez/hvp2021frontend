import {
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFcmActiveStepProperty,
  startLoadingFcmPartners,
  updateStepReferences,
} from "../../../actions/fcmActions";
import { userAddFcmPartner } from "../../../actions/userActions";
import {
  excludeFromCollection,
  fireSwalError,
} from "../../../helpers/utilities";

export const SearchAndLinkPartner = ({
  handleCancelSelection,
  handleStepProps,
}) => {
  const dispatch = useDispatch();
  const { allFcm } = useSelector((state) => state.fcm);
  const { allFcmPartners } = allFcm;
  const { client } = useSelector((state) => state.clients);
  const { fcmPackage } = useSelector((state) => state.fcm);

  const [fieldValue, setfieldValue] = useState("");
  const [filteredFcmPartners, setfilteredFcmPartners] = useState([]);

  // todo: delete, because now the partners are in the store
  // loading fcm partners
  useEffect(() => {
    dispatch(startLoadingFcmPartners());
  }, [dispatch]);

  const handleSearch = () => {
    // if the search has less than 3 values. return
    if (fieldValue.length < 3) {
      return fireSwalError(
        "La búsqueda debe contar al menos con tres carácteres"
      );
    }
    //   exclude from fcmPartners the already linked
    const fcmPartnersExcludingLinked = excludeFromCollection(
      allFcmPartners,
      client.linkedFcmPartners
    );

    const fcmPartnersFound = fcmPartnersExcludingLinked.filter((data) =>
      data.partnerNum
        .toLocaleLowerCase()
        .includes(fieldValue.toLocaleLowerCase())
    );
    setfilteredFcmPartners(fcmPartnersFound);
  };

  const handleSubmit = async (fcmPartner) => {
    await dispatch(userAddFcmPartner(client._id, fcmPartner));

    // if is from a package
    if (fcmPackage) {
      // handleNext();
      dispatch(updateStepReferences(fcmPartner));
      handleStepProps({
        isEditable: false,
        formWrapperTitle: "Confirma la información",
      });
      dispatch(setFcmActiveStepProperty("needsConfirmation", true));
    }
  };

  return (
    <Box>
      <Typography mb="3rem">
        Selecciona un socio de nuestra base de datos. Si no lo encuentras, será
        necesario que lo registres, con lo que automáticamente estará vinculado
        a tu cuenta.
      </Typography>
      {/* Input and button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: "2rem",
          mb: "2rem",
          alignItems: "center",
        }}
      >
        <FormControl fullWidth={true} sx={{ flex: 1 }}>
          <TextField
            name="partnerNum"
            label="Número de socio"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => setfieldValue(e.target.value)}
            value={fieldValue}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: "1rem",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Button onClick={handleSearch} fullWidth={true}>
            Buscar
          </Button>
          <Button color="error" fullWidth onClick={handleCancelSelection}>
            Cancelar
          </Button>
        </Box>
      </Box>
      {/* SearchResults */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: "2rem",
          mb: "5rem",
        }}
      >
        {!filteredFcmPartners.length > 0 ? (
          <Typography>No se encontró ningún socio con ese número</Typography>
        ) : (
          filteredFcmPartners.map((fcmPartner) => {
            return (
              <Card
                key={fcmPartner._id}
                sx={{
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                  p: 1,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h3"
                    mb="2rem"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {fcmPartner.partnerNum}
                  </Typography>
                  <Typography mb="2rem">
                    <span className="fw-bold">Nombre: </span>{" "}
                    {` ${fcmPartner.firstName} ${fcmPartner.paternalSurname} ${fcmPartner.maternalSurname}`}
                  </Typography>
                  <Typography mb="2rem">
                    <span className="fw-bold">Fecha de expiración: </span>
                    {` ${dayjs(fcmPartner.expirationDate).format(
                      "DD-MMM-YYYY"
                    )}`}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth={true}
                    onClick={() => {
                      handleSubmit(fcmPartner);
                    }}
                    color="primary"
                  >
                    {fcmPackage ? "Seleccionar" : "Vincular a mi cuenta"}
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
      </Box>
    </Box>
  );
};
