import React, { Fragment, useMemo, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { rfcDelete, rfcUpdate } from "../../../actions/rfcActions";
import { useNavigate, useParams } from "react-router-dom";

export const EditRFC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get the rfc
  const { rfcId } = useParams();
  const { allRfc } = useSelector((state) => state.rfc);
  const foundedRfc = allRfc.find((rfc) => rfc._id === rfcId);

  const { values: newFormValues, handleInputChange: handleFormInputChange } =
    useForm({ ...foundedRfc });
  const { rfc, name, address, phone, email, notes } = newFormValues;

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(rfcUpdate(newFormValues));
    navigate("/dashboard/rfc");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(rfcDelete(newFormValues));
    navigate("/dashboard/rfc");
  };

  return (
    <Fragment>
      <div className="row m-5">
        <div className="db-rfc__header fs-2 mb-5">Actualizar RFC</div>
        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="" className="form-label mb-3">
                RFC
              </label>
              <input
                type="text"
                className="form-control mb-3"
                name="rfc"
                placeholder="RFC"
                value={rfc}
                onChange={handleFormInputChange}
                minLength="13"
                maxLength="13"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="" className="form-label mb-3">
                Nombre o razón social
              </label>
              <input
                type="text"
                className="form-control mb-3"
                name="name"
                placeholder="nombre o razón social"
                value={name}
                onChange={handleFormInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="" className="form-label mb-3">
                Teléfono
              </label>
              <input
                type="text"
                className="form-control mb-3"
                name="phone"
                placeholder="teléfono"
                value={phone}
                onChange={handleFormInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="" className="form-label mb-3">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control mb-3"
                name="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={handleFormInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label mb-3">
                Dirección
              </label>
              <textarea
                className="form-control mb-3"
                name="address"
                placeholder="Dirección"
                value={address}
                onChange={handleFormInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label mb-3">
                Notas
              </label>
              <textarea
                className="form-control mb-3"
                name="notes"
                placeholder="Notas"
                value={notes}
                onChange={handleFormInputChange}
              />
            </div>
            <div className="d-flex justify-content-around">
              <button className="btn btn-primary" type="submit">
                Actualizar
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
