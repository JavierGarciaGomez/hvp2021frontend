import React, { Fragment, useMemo, useState } from "react";
import { InputGroup } from "../../../components/ui/InputGroup";
import queryString from "query-string";

import { useForm } from "../../../hooks/useForm";
import { useLocation, useNavigate } from "react-router-dom";
import { TaxPayerCard } from "./components/TaxPayerCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { rfcCreate, rfcStartLoading } from "../../../actions/rfcActions";

export const CreateNewRFC = () => {
  const dispatch = useDispatch();
  const { allRfc } = useSelector((state) => state.rfc);

  // start loading rfc
  useEffect(() => {
    dispatch(rfcStartLoading());
  }, [dispatch]);

  const { values: newFormValues, handleInputChange: handleFormInputChange } =
    useForm({
      rfc: "",
      name: "",
      address: "",
      phone: "",
      email: "",
      notes: "",
    });
  const { rfc, name, address, phone, email, notes } = newFormValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(rfcCreate(newFormValues));
  };

  const [search, setsearch] = useState("");

  const handleSearchChange = (e) => {
    setsearch(e.target.value);
  };

  const taxpayers = useMemo(() => {
    return allRfc.filter((data) =>
      data.rfc.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }, [search, allRfc]);

  return (
    <Fragment>
      <div className="row m-5">
        <div className="db-rfc__header fs-2 mb-5">Registro de RFC</div>
        <form onSubmit={handleSubmit}>
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
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary" type="submit">
                Registrar
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="row m-5">
        <div className="fs-2 mb-5">Búsqueda de usuarios</div>
        <form>
          <input
            type="text"
            placeholder="Introduce el RFC"
            className="form-control"
            name="searchText"
            onChange={handleSearchChange}
          />
        </form>
      </div>

      {taxpayers.length === 0 && <div>No hay contribuyentes con ese RFC</div>}
      <div className="row m-5 d-flex justify-content-around">
        {taxpayers.map((taxpayer) => (
          <TaxPayerCard taxpayer={taxpayer} />
        ))}
      </div>
    </Fragment>
  );
};
