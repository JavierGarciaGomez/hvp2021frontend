import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";

import React, { Fragment } from "react";
import { dogSexTypes } from "../../types/types";
import { BoxLabelValueData } from "./components/BoxLabelValueData";

export const FcmPrintPackageBreedForm = ({ breedingData }) => {
  const {
    birthDate,
    birthPlace,
    breedingDate,
    death,
    femalesAlive,
    malesAlive,
    puppies,
    fcmDogFemale,
    fcmDogMale,
    fcmPartnerFemaleOwner,
    fcmPartnerMaleOwner,
    inspectionDate,
    observations,
    fcmCode,
  } = breedingData;

  console.log(breedingData);

  console.log(breedingData);
  let puppiesSpaces = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
  ];

  return (
    <Box mb="10rem">
      {/* header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxHeight: "50px",
        }}
      >
        <Box sx={{ height: "50px" }}>
          <Box
            component="img"
            src="https://res.cloudinary.com/dwalcv9li/image/upload/v1648300900/samples/images_zsilt8.png"
            sx={{ height: "100%", display: "block", width: "auto" }}
          ></Box>
        </Box>
        <Box>
          <Typography component="h2" variant="h5">
            CERTIFICADO DE CRUZA
          </Typography>
        </Box>
        <Box>
          <Typography>
            Registro número: <Typography variant="span">{fcmCode}</Typography>
          </Typography>
        </Box>
      </Box>
      {/* male dog */}
      <Box sx={{ mt: "1rem" }}>
        <Box>
          <Box sx={{ backgroundColor: "grey.300", textAlign: "center" }}>
            <Typography>CERTIFICO QUE EL PERRO</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <BoxLabelValueData label="Nombre" value={fcmDogMale.petName} />
          </Box>
          <Box>
            <BoxLabelValueData label="Raza" value={fcmDogMale.breed} />
          </Box>
          <Box>
            <BoxLabelValueData label="Color" value={fcmDogMale.color} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <BoxLabelValueData
              label="Registro"
              value={fcmDogMale.registerNum}
            />
          </Box>
          <Box>
            <Typography>
              ADN:
              <Typography variant="span">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              Datos del propietario
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <BoxLabelValueData
              label="Nombre (s)"
              value={fcmPartnerMaleOwner.firstName}
              vertical={true}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <BoxLabelValueData
              label="Primer apellido"
              value={fcmPartnerMaleOwner.paternalSurname}
              vertical={true}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <BoxLabelValueData
              label="Primer apellido"
              value={fcmPartnerMaleOwner.maternalSurname}
              vertical={true}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <BoxLabelValueData
              label="Socio"
              value={
                fcmPartnerMaleOwner.isCardLost ? (
                  <Fragment>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </Fragment>
                ) : (
                  fcmPartnerMaleOwner.partnerNum
                )
              }
              vertical={true}
            />
          </Box>
        </Box>
      </Box>
      {/* female dog */}
      <Box sx={{ mt: "1rem" }}>
        <Box>
          <Box sx={{ backgroundColor: "grey.300", textAlign: "center" }}>
            <Typography>SE CRUZÓ CON LA PERRA</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <BoxLabelValueData label="Nombre" value={fcmDogFemale.petName} />
          </Box>
          <Box>
            <BoxLabelValueData label="Raza" value={fcmDogFemale.breed} />
          </Box>
          <Box>
            <BoxLabelValueData label="Color" value={fcmDogFemale.color} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <BoxLabelValueData
              label="Registro"
              value={fcmDogFemale.registerNum}
            />
          </Box>
          <Box>
            <Typography>
              ADN:
              <Typography variant="span">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              Datos del propietario
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <BoxLabelValueData
              label="Nombre (s)"
              value={fcmPartnerFemaleOwner.firstName}
              vertical={true}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <BoxLabelValueData
              label="Primer apellido"
              value={fcmPartnerFemaleOwner.paternalSurname}
              vertical={true}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <BoxLabelValueData
              label="Primer apellido"
              value={fcmPartnerFemaleOwner.maternalSurname}
              vertical={true}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <BoxLabelValueData
              label="Socio"
              value={
                fcmPartnerFemaleOwner.isCardLost ? (
                  <Fragment>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </Fragment>
                ) : (
                  fcmPartnerFemaleOwner.partnerNum
                )
              }
              vertical={true}
            />
          </Box>
        </Box>
      </Box>
      {/* Signatures */}
      <Box sx={{ mt: "1rem" }}>
        <Box>
          <Box sx={{ backgroundColor: "grey.300", textAlign: "center" }}>
            <Typography>FIRMAS</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <Box sx={{ flex: "1" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              Nombre y firma del dueño o cocriador del macho
            </Box>
            <Box
              sx={{
                height: "50px",
                borderBottom: "1px solid black",
                margin: "0rem 10rem",
              }}
            ></Box>
          </Box>

          <Box sx={{ flex: "1" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              Nombre y firma del dueño o cocriador de la hembra
            </Box>
            <Box
              sx={{
                height: "50px",
                borderBottom: "1px solid black",
                margin: "0rem 5rem",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
      {/* DATOS DE LA CRUZA */}
      <Box sx={{ mt: "1rem" }}>
        <Box>
          <Box sx={{ backgroundColor: "grey.300", textAlign: "center" }}>
            <Typography>DATOS DE LA CRUZA</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <Box>
            <BoxLabelValueData
              label="Fecha de la cruza"
              value={dayjs(breedingDate).format("DD-MMM-YYYY")}
            />
          </Box>
          <Box>
            <BoxLabelValueData
              label="Fecha de nacimiento"
              value={dayjs(birthDate).format("DD-MMM-YYYY")}
            />
          </Box>
          <Box>
            <BoxLabelValueData label="Lugar de nacimiento" value={birthPlace} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <BoxLabelValueData label="Machos vivos" value={malesAlive} />
          <BoxLabelValueData label="Hembras vivas" value={femalesAlive} />
          <BoxLabelValueData label="Muertos" value={death} />
        </Box>
      </Box>
      {/* Puppies list */}
      <Box sx={{ mt: "1rem" }}>
        <Box>
          <Box sx={{ backgroundColor: "grey.300", textAlign: "center" }}>
            <Typography>DATOS DE LOS CACHORROS</Typography>
          </Box>
        </Box>
        <Grid container spacing={1}>
          <Grid
            item
            xs={4}
            sx={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Código de barras
          </Grid>
          <Grid item xs={1} sx={{ textAlign: "center", fontWeight: "bold" }}>
            id
          </Grid>
          <Grid item xs={3} sx={{ textAlign: "center", fontWeight: "bold" }}>
            Nombre
          </Grid>
          <Grid item xs={1} sx={{ textAlign: "center", fontWeight: "bold" }}>
            Sexo
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "center", fontWeight: "bold" }}>
            Color
          </Grid>
          <Grid item xs={1} sx={{ textAlign: "center" }}>
            ADN
          </Grid>
          {puppiesSpaces.map((letter, index) => {
            return (
              <Fragment key={letter}>
                <Grid
                  item
                  xs={4}
                  sx={{
                    textAlign: "center",
                    minHeight: "50px",
                    border: "1px black solid",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {letter}
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {puppies[index]?.petName}
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {dogSexTypes[puppies[index]?.sex]}
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {puppies[index]?.color}
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ADN
                </Grid>

                {index === 7 && <div className="u-pagebreak"></div>}
              </Fragment>
            );
          })}
        </Grid>
      </Box>
      {/* DATOS DE LA CRUZA */}
      <Box sx={{ mt: "1rem" }}>
        <Box>
          <Box sx={{ backgroundColor: "grey.300", textAlign: "center" }}>
            <Typography>OBSERVACIONES</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ textAlign: "center" }}>
              Fecha de la inspección:
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              {" "}
              {dayjs(inspectionDate).format("DD-MMM-YYYY")}
            </Typography>
          </Box>
          <Box sx={{ flex: 2 }}>
            <Typography sx={{ textAlign: "center" }}>Observaciones:</Typography>
            <Typography variant="span"> {observations}</Typography>
          </Box>
          <Box sx={{ flex: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              {" "}
              Nombre y firma del médico inspector
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
