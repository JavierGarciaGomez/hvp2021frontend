import React, { Fragment } from "react";
import { useForm } from "../../../../hooks/useForm";

export const MiscForm = ({
  handleData,
  title,
  handleShowForm,
  initialValues,
}) => {
  const { values, handleInputChange } = useForm(initialValues);

  const { label, value } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleData(values);
  };

  return (
    <Fragment>
      <div className="db-rfc__header fs-2 mb-5">{title}</div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 mb-3">
            <label htmlFor="" className="form-label mb-3">
              Etiqueta
            </label>
            <input
              type="text"
              className="form-control mb-3"
              name="label"
              placeholder="Etiqueta"
              value={label}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="" className="form-label mb-3">
              Valor
            </label>
            <input
              type="text"
              className="form-control mb-3"
              name="value"
              placeholder="Valor"
              value={value}
              onChange={handleInputChange}
            />
          </div>

          <div className="d-flex justify-content-evenly">
            <button className="btn btn-primary" type="submit">
              Guardar cambios
            </button>
            <button className="btn btn-danger" onClick={handleShowForm}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};
