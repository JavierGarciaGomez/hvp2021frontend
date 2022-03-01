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
import React, { Fragment, useEffect } from "react";
import {
  getFormatIcon,
  getTxtClass,
  organiseDocumentation,
  checkAuthorization,
  findLabelByValue,
  prepareDocumentation,
} from "../../../helpers/utilities";

import { useDispatch, useSelector } from "react-redux";
import {
  documentationFormatTypes,
  documentationStatusTypes,
  documentationTypesTypes,
  roleTypes,
} from "../../../types/types";
import { Link } from "react-router-dom";
import { allDocumentationStartLoading } from "../../../actions/documentationActions";
import { useState } from "react";

export const Documentation = () => {
  const { allDocumentation } = useSelector((state) => state.documentation);
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  // todo: change for prepared
  // todo: exclude not auth
  // todo: organise it
  const [preparedDocumentation, setpreparedDocumentation] = useState([]);

  useEffect(() => {
    dispatch(allDocumentationStartLoading());
  }, []);
  useEffect(() => {
    if (allDocumentation.length > 0) {
      setpreparedDocumentation(prepareDocumentation(allDocumentation, role));
    }
  }, [allDocumentation]);

  const handleDelete = (id) => {};

  return (
    <Fragment>
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
      {preparedDocumentation.map((type) => {
        return (
          <div
            className="documentation__typeContainer mb-5r"
            key={type.typeName}
          >
            <div className="documentation__typeHeadingContainer mb-3r">
              <h3 className="heading-tertiary">
                {findLabelByValue(documentationTypesTypes, type.typeName)}
              </h3>
            </div>
            {type.data.map((topic) => {
              return (
                <div
                  className="documentation__topicContainer mb-3r"
                  key={topic.topicName}
                >
                  <div className="documentation__topicHeadingContainer mb-2r">
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
                            {checkAuthorization(role, roleTypes.manager) && (
                              <TableCell className="fw-bold">
                                Acciones
                              </TableCell>
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {topic.data.map(
                            (row) =>
                              checkAuthorization(
                                role,
                                roleTypes[row.authorization]
                              ) && (
                                <TableRow
                                  key={row._id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    <a href={row.url}>{row.title}</a>
                                  </TableCell>
                                  <TableCell>
                                    {getFormatIcon(row.format)}
                                  </TableCell>
                                  <TableCell>
                                    {dayjs(row.date).format("DD-MMM-YYYY")}
                                  </TableCell>
                                  <TableCell>{row.author.col_code}</TableCell>
                                  <TableCell
                                    className={getTxtClass(row.status)}
                                  >
                                    {findLabelByValue(
                                      documentationStatusTypes,
                                      row.status
                                    )}
                                  </TableCell>
                                  {checkAuthorization(
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
    </Fragment>
  );
};
