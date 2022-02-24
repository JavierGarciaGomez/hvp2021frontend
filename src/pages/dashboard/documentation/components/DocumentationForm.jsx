import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  activityRegisterStartUpdate,
  createActivityRegister,
} from "../../../../actions/activityRegisterActions";
import { collaboratorsStartLoading } from "../../../../actions/collaboratorActions";
import {
  findLabelByValue,
  findValueByLabel,
  fireSwalError,
  getKeyByValue,
  getLabelsAndValuesFromCollection,
  getRoleTypes,
  getRoleTypesLabelsAndValues,
} from "../../../../helpers/utilities";
import { useForm } from "../../../../hooks/useForm";
import {
  documentationFormatTypes,
  documentationStatusTypes,
  documentationTypesTypes,
} from "../../../../types/types";

export const DocumentationForm = ({
  activityRegister = null,
  handleShowForm,
  showCancel,
  showEndDate,
  isNewActivity,
}) => {
  const dispatch = useDispatch();

  const { activityRegisterTypes = [], activeRegister } = useSelector(
    (state) => state.activityRegister
  );
  const { collaborators, isLoading: collaboratorsIsLoading } = useSelector(
    (state) => state.collaborator
  );
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const executeAsync = async () => {
      await dispatch(collaboratorsStartLoading(false));
    };

    executeAsync();

    setisLoading(false);
  }, [dispatch]);

  let initialEmptyValues = {
    type: "guides",
    topic: "",
    title: "",
    url: "",
    format: "video",
    creationDate: "",
    lastUpdateDate: "",
    version: 0,
    author: "AAA",
    status: "updated",
    authorization: "collaborator",
  };

  const { values, handleInputChange } = useForm(initialEmptyValues);

  const handleSubmit = async (e) => {
    console.log("ESTO ES EL FORM", values);
    e.preventDefault();

    // if (isNewActivity) {
    //   if (values.activity === "" || values.startingTime === "") {
    //     return fireSwalError(
    //       "No puedes crear un registro sin determinar primero una actividad y una hora de inicio"
    //     );
    //   }

    //   dispatch(
    //     createActivityRegister({
    //       ...values,
    //     })
    //   );
    //   handleShowForm();
    // } else {
    //   dispatch(
    //     activityRegisterStartUpdate({
    //       ...values,
    //     })
    //   );
    //   if (showCancel) {
    //     handleShowForm();
    //   }
    // }
  };

  return (
    <div className="p-5">
      <div className="mb-3r">
        <h2 className="heading--secondary">Editar actividad</h2>
      </div>

      <div className="l-singleCardContainer mb-3r">
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-6 mb-3">
            <label htmlFor="" className="form-label mb-3">
              Selecciona el tipo
            </label>
            <select
              className="form-select mb-3 form-control"
              aria-label="Default select example"
              value={values.type}
              name="type"
              onChange={handleInputChange}
            >
              {documentationTypesTypes.map((element) => {
                return (
                  <option key={element.value} value={element.value}>
                    {element.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="" className="form-label mb-3">
              Tema
            </label>
            <input
              type="text"
              className="form-control mb-3"
              name="topic"
              value={values.topic}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="" className="form-label mb-3">
              Título
            </label>
            <input
              type="text"
              className="form-control mb-3"
              name="title"
              value={values.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="" className="form-label mb-3">
              URL
            </label>
            <input
              type="text"
              className="form-control mb-3"
              name="url"
              value={values.url}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="" className="form-label mb-3">
              Formato
            </label>
            <select
              className="form-select mb-3 form-control"
              aria-label="Default select example"
              value={values.format}
              name="format"
              onChange={handleInputChange}
            >
              {documentationFormatTypes.map((element) => {
                return (
                  <option key={element.value} value={element.value}>
                    {element.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="" className="form-label mb-3">
              Autor
            </label>
            <select
              className="form-select mb-3 form-control"
              aria-label="Default select example"
              value={values.author}
              name="author"
              onChange={handleInputChange}
            >
              {/* TODO cargar la lista de colaboradores */}
              {getLabelsAndValuesFromCollection(
                collaborators,
                "col_code",
                "_id"
              ).map((element) => {
                return (
                  <option key={element.value} value={element.value}>
                    {element.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="" className="form-label mb-3">
              Fecha de creación o expedición
            </label>
            <input
              type="date"
              className="form-control mb-3"
              name="creationDate"
              value={values.creationDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="" className="form-label mb-3">
              Última actualización
            </label>
            <input
              type="date"
              className="form-control mb-3"
              name="lastUpdateDate"
              value={values.lastUpdateDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="" className="form-label mb-3">
              Versión
            </label>
            <input
              type="number"
              className="form-control mb-3"
              name="version"
              value={values.version}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="" className="form-label mb-3">
              Estado
            </label>
            <select
              className="form-select mb-3 form-control"
              aria-label="Default select example"
              value={values.format}
              name="format"
              onChange={handleInputChange}
            >
              {documentationStatusTypes.map((element) => {
                return (
                  <option key={element.value} value={element.value}>
                    {element.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="" className="form-label mb-3">
              Nivel de autorización
            </label>
            <select
              className="form-select mb-3 form-control"
              aria-label="Default select example"
              value={values.authorization}
              name="authorization"
              onChange={handleInputChange}
            >
              {getRoleTypesLabelsAndValues().map((element) => {
                return (
                  <option key={element.value} value={element.value}>
                    {element.label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="d-flex justify-content-evenly">
            <button className="btn btn-primary" type="submit">
              Guardar
            </button>
            {showCancel && (
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleShowForm}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
