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
  checkAutorization,
  getFormatIcon,
  getTxtClass,
  organiseDocumentation,
} from "../../../helpers/utilities";

import { useSelector } from "react-redux";
import { roleTypes } from "../../../types/types";
import { Link } from "react-router-dom";

const dummyData = [
  {
    _id: 1,
    format: "video",
    link: "https://www.youtube.com/watch?v=74xNmKeJv3E",
    title: "Restringido",
    type: "Lineamientos",
    topic: "Recursos humanos",
    date: dayjs("12-25-1995"),
    author: "Javier García",
    status: "Actualizado",
    authorization: "Colaborador",
  },
  {
    _id: 2,
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
    _id: 3,
    format: "video",
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

export const Documentation = () => {
  const { role } = useSelector((state) => state.auth);

  const handleDelete = (id) => {};

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
      <div className="mb-3r">
        <Link to="new">
          <button className="btn btn-primary">Agregar nuevo documento</button>
        </Link>
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
                <div
                  className="documentation__topicContainer mb-2r"
                  key={topic.topicName}
                >
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
                            <TableCell
                              className="fw-bold"
                              sx={{ width: "50%" }}
                            >
                              Título
                            </TableCell>
                            <TableCell className="fw-bold">Formato</TableCell>
                            <TableCell className="fw-bold">Fecha</TableCell>
                            <TableCell className="fw-bold">Autor</TableCell>
                            <TableCell className="fw-bold">Estado</TableCell>
                            {checkAutorization(role, roleTypes.manager) && (
                              <TableCell className="fw-bold">
                                Acciones
                              </TableCell>
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {topic.data.map(
                            (row) =>
                              checkAutorization(role, row.authorization) && (
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
                                  <TableCell>
                                    {getFormatIcon(row.format)}
                                  </TableCell>
                                  <TableCell>
                                    {dayjs(row.date).format("DD-MMM-YYYY")}
                                  </TableCell>
                                  <TableCell>{row.author}</TableCell>
                                  <TableCell
                                    className={getTxtClass(row.status)}
                                  >
                                    {row.status}
                                  </TableCell>
                                  {checkAutorization(
                                    role,
                                    roleTypes.manager
                                  ) && (
                                    <TableCell>
                                      <div className="documentation__actions">
                                        <Link to={`${row._id}`}>
                                          <button className="btn btn-primary">
                                            Editar
                                          </button>
                                        </Link>
                                        <button
                                          className="btn btn-danger"
                                          onClick={() => {
                                            handleDelete(row._id);
                                          }}
                                        >
                                          Borrar
                                        </button>
                                      </div>
                                    </TableCell>
                                  )}
                                </TableRow>
                              )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </Container>
  );
};
