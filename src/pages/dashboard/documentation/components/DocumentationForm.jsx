import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { collaboratorsStartLoading } from "../../../../actions/collaboratorActions";
import {
  allDocumentationStartLoading,
  createDocumentation,
  documentationUpdate,
} from "../../../../actions/documentationActions";
import {
  getLabelsAndValuesFromCollection,
  getRoleTypesLabelsAndValues,
} from "../../../../helpers/utilities";
import { useForm } from "../../../../hooks/useForm";
import {
  documentationFormatTypes,
  documentationStatusTypes,
  documentationTypesTypes,
} from "../../../../types/types";

let initialValues = {
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

export const DocumentationForm = ({}) => {
  const dispatch = useDispatch();
  const { docId } = useParams();
  const navigate = useNavigate();

  const { allDocumentation } = useSelector((state) => state.documentation);
  const { collaborators } = useSelector((state) => state.collaborator);
  const { values, handleInputChange, setFullValues } = useForm(initialValues);

  // Load documentation and collaborators
  useEffect(() => {
    const executeAsync = async () => {
      if (allDocumentation.length === 0) {
        await dispatch(allDocumentationStartLoading());
      }
      await dispatch(collaboratorsStartLoading(false));
    };
    executeAsync();
  }, [dispatch]);

  // find documentation and set it active
  useEffect(() => {
    // find documentation
    if (allDocumentation.length > 0) {
      let found = allDocumentation.find((el) => el._id === docId);
      // set active documentation
      if (found) {
        found.author = found.author._id;
        return setFullValues({ ...found });
      }
    }
  }, [allDocumentation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If has an id is existent so update, else create
    if (values._id) {
      const succesfulDispatch = await dispatch(
        documentationUpdate({ ...values })
      );
      if (succesfulDispatch) {
        navigate(`/dashboard/documentation`);
      }
    } else {
      const succesfulDispatch = await dispatch(
        createDocumentation({ ...values })
      );
      if (succesfulDispatch) {
        navigate(`/dashboard/documentation`);
      }
    }
  };

  return (
    <div className="p-5">
      <div className="mb-3r">
        <h2 className="heading--secondary">
          {values._id ? "Editar documento" : "Crear documento"}
        </h2>
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
              value={values.status}
              name="status"
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
            <Link to={`/dashboard/documentation`}>
              <button className="btn btn-danger" type="button">
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
