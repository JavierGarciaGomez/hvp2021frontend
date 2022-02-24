import { OndemandVideo } from "@mui/icons-material";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import {
  getFormatIcon,
  getTxtClass,
  organiseDocumentation,
} from "../../../helpers/utilities";

const dummyData = [
  {
    format: "video",
    link: "https://www.youtube.com/watch?v=74xNmKeJv3E",
    title: "Política de recursos humanos del Hospital Veterinario Peninsular",
    type: "Lineamientos",
    topic: "Recursos humanos",
    date: dayjs("12-25-1995"),
    author: "Javier García",
    status: "Actualizado",
  },
  {
    format: "pdf",
    link: "https://www.youtube.com/watch?v=74xNmKeJv3E",
    title: "Política de recursos humanos del Hospital Veterinario Peninsular",
    type: "Guías y protocolos",
    topic: "Recursos humanos",
    date: dayjs("12-25-1995"),
    author: "Javier García",
    status: "No vigente",
  },
  {
    format: "vide",
    link: "https://www.youtube.com/watch?v=74xNmKeJv3E",
    title: "Política de recursos humanos del Hospital Veterinario Peninsular",
    type: "Guías y protocolos",
    topic: "Recursos humanos",
    date: dayjs("12-25-1995"),
    author: "Javier García",
    status: "Actualizado",
  },
];

const organisedDocumentation = organiseDocumentation(dummyData);
console.log("imprimo la doc", organisedDocumentation);

export const Documentation = () => {
  return (
    <Container className="mt-5r">
      <div className="heading__container mb-2r">
        <div className="heading--secondary">Documentación de apoyo</div>
      </div>
      <div className="mb-3r">
        <Typography>
          La documentación que se presenta acá tiene por objeto orientar a los
          usuarios de esta plataforma con respecto a sus actividades cotidianas
          así como en el manejo de esta plataforma
        </Typography>
      </div>
      {organisedDocumentation.map((type) => {
        return (
          <div
            className="documentation__typeContainer mb-3r"
            key={type.typeName}
          >
            <div className="documentation__typeHeadingContainer">
              <h3 className="heading-tertiary">{type.typeName}</h3>
            </div>
            {type.data.map((topic) => {
              return (
                <div className="documentation__topicContainer mb-2r">
                  <div className="documentation__topicHeadingContainer">
                    <h4>{topic.topicName}</h4>
                  </div>
                  <div className="documentation__tableContainer">
                    <TableContainer>
                      <Table
                        sx={{ minWidth: "100%" }}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell className="fw-bold">Título</TableCell>
                            <TableCell className="fw-bold">Formato</TableCell>
                            <TableCell className="fw-bold">Fecha</TableCell>
                            <TableCell className="fw-bold">Autor</TableCell>
                            <TableCell className="fw-bold">Estado</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {topic.data.map((row) => (
                            <TableRow
                              key={row._id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <a href={row.link}>{row.title}</a>
                              </TableCell>
                              <TableCell>{getFormatIcon(row.format)}</TableCell>
                              <TableCell>
                                {dayjs(row.date).format("DD-MMM-YYYY")}
                              </TableCell>
                              <TableCell>{row.author}</TableCell>
                              <TableCell className={getTxtClass(row.status)}>
                                {row.status}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  {topic.data.map((entry) => {
                    return <p>{entry.title}</p>;
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </Container>
  );
};
