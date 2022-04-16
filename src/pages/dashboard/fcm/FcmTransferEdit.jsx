import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createFcmtransfer, updateFcmtransfer } from "../../../actions/fcmActions";
import { FcmDogCard } from "../../../components/fcm/FcmDogCard";
import { FcmPartnerCard } from "../../../components/fcm/FcmPartnerCard";

import { SearchBox } from "../../../components/searchBox/SearchBox";
import BasicTabs from "../../../components/Tabs/BasicTabs";
import { checkIfObjectsAreEmpty } from "../../../helpers/arrayUtilities";
import { fireSwalWait } from "../../../helpers/sweetAlertUtilities";
import { fireSwalError, getFullNameOfObject } from "../../../helpers/utilities";
import { FcmPrevOwnerFormik } from "../../clientsPages/components/FcmPrevOwnerFormik";

export const FcmTransferEdit = (props) => {
  const { fcmTransfer, onCancel, onSave } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allFcm } = useSelector((state) => state.fcm);
  const { allFcmDogs, allFcmPartners } = allFcm;
  const { dog, newOwner, prevOwner } = fcmTransfer;

  const [selectedDog, setselectedDog] = useState(dog || {});
  const [selectedNewOwner, setSelectedNewOwner] = useState(newOwner || {});
  const [selectedPrevOwner, setSelectedPrevOwner] = useState(prevOwner || {});
  const [showTabs, setShowTabs] = useState(false);

  const handleSelectDog = (fcmDog) => {
    setselectedDog(fcmDog);
  };

  const handleSelectNewOwner = (fcmPartner) => {
    setSelectedNewOwner(fcmPartner);
  };

  const handleSelectPrevOwner = async (prevOwner) => {
    await setSelectedPrevOwner(prevOwner);
    setShowTabs(false);
  };

  const handlePrevOwnerCancel = () => {
    setShowTabs(false);
  };

  const handleSubmit = async () => {
    fireSwalWait();

    if (checkIfObjectsAreEmpty([selectedDog, selectedNewOwner, selectedPrevOwner])) return fireSwalError("Tienes que llenar los datos completos");
    const newFcmTransfer = {
      ...fcmTransfer,
      dog: selectedDog,
      newOwner: selectedNewOwner,
      prevOwner: selectedPrevOwner,
    };

    console.log(newFcmTransfer);

    let savedFcmTransfer = null;
    if (newFcmTransfer._id) {
      savedFcmTransfer = await dispatch(updateFcmtransfer(newFcmTransfer));
    } else {
      savedFcmTransfer = await dispatch(createFcmtransfer(newFcmTransfer));
    }

    if (onSave) return onSave();
    savedFcmTransfer && navigate(-1);
  };

  const handleCancel = () => {
    if (onCancel) return onCancel();
    navigate(-1);
  };

  return (
    <Box>
      <Box mb="3rem">
        <Typography variant="h4" component="h2">
          Transferencia o cambio de propietario
        </Typography>
      </Box>
      <Box mb="3rem">
        <Typography component="h4" variant="h5" mb="1rem">
          Perro a transferir
        </Typography>
        <Box mb="1rem">
          <Typography sx={{ fontWeight: "bold" }}>Perro seleccionado</Typography>

          <Typography>Nombre: {selectedDog.petName}</Typography>
          <Typography>Número de registro: {selectedDog.registerNum}</Typography>
        </Box>

        <SearchBox onSelect={handleSelectDog} searchData={allFcmDogs} CardComponent={FcmDogCard} searchParams={["registerNum", "petName"]} searchFieldLabel="Nombre o número e regstro" />
      </Box>
      <Box mb="3rem">
        <Typography component="h4" variant="h5" mb="1rem">
          Nuevo propietario
        </Typography>
        <Box mb="1rem">
          <Typography sx={{ fontWeight: "bold" }}>Socio seleccionado</Typography>
          <Typography>Nombre: {getFullNameOfObject(selectedNewOwner)}</Typography>
          <Typography>Número de registro: {selectedNewOwner.partnerNum || ""}</Typography>
        </Box>
        <SearchBox
          onSelect={handleSelectNewOwner}
          searchData={allFcmPartners}
          CardComponent={FcmPartnerCard}
          searchParams={["partnerNum", "paternalSurname", "maternalSurname"]}
          searchFieldLabel="Número de socio o apellidos"
        />
      </Box>
      <Box mb="3rem">
        <Typography component="h4" variant="h5" mb="1rem">
          Antiguo propietario
        </Typography>
        <Box mb="2rem">
          <Box mb="1rem">
            <Typography sx={{ fontWeight: "bold" }}>Persona seleccionada</Typography>
            <Typography>Nombre: {getFullNameOfObject(selectedPrevOwner)}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            <Box
              component="img"
              src={selectedPrevOwner.urlFrontIne}
              sx={{
                maxWidth: { xs: "66%", md: "40%" },
              }}
            ></Box>
            <Box
              component="img"
              src={selectedPrevOwner.urlBackIne}
              sx={{
                maxWidth: { xs: "66%", md: "40%" },
              }}
            ></Box>
          </Box>
        </Box>

        {showTabs ? (
          <BasicTabs
            tabs={[
              {
                tabLabel: "LLena el formato manual",
                TabComponent: FcmPrevOwnerFormik,
                tabComponentProps: {
                  prevOwner: selectedPrevOwner,
                },
              },
              {
                tabLabel: "Selecciona un socio registrado",
                TabComponent: SearchBox,
                tabComponentProps: { prevOwner: selectedPrevOwner },
              },
            ]}
            handleSubmitForm={handleSelectPrevOwner}
            handleCancel={handlePrevOwnerCancel}
            onSelect={handleSelectPrevOwner}
            searchData={allFcmPartners}
            CardComponent={FcmPartnerCard}
            searchParams={["partnerNum", "paternalSurname", "maternalSurname"]}
            searchFieldLabel="Número de socio o apellidos"
          />
        ) : (
          <Box>
            <Button
              onClick={() => {
                setShowTabs(true);
              }}
            >
              Muestra pestañas de edición
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button variant="outlined" onClick={handleSubmit} size="large">
          Guardar
        </Button>
        <Button variant="outlined" color="error" onClick={handleCancel} size="large">
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};
