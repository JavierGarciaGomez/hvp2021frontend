import React, { Fragment, useMemo, useState } from "react";
import { InputGroup } from "../../../components/ui/InputGroup";
import queryString from "query-string";

import { useForm } from "../../../hooks/useForm";
import { useLocation, useNavigate } from "react-router-dom";
import { TaxPayerCard } from "./TaxPayerCard";

const dummyData = [
  {
    rfc: "GAGJ850722",
    name: "Javier Humberto García Gómez",
    address: "Calle 14, número 100. Colonia Montecristo. CP 97133",
    phone: "635026146",
    email: "javieron.garcia@gmail.com",
  },
  {
    rfc: "GAGJ850722",
    name: "Javier Humberto García Gómez",
    address: "Calle 14, número 100. Colonia Montecristo. CP 97133",
    phone: "635026146",
    email: "javieron.garcia@gmail.com",
  },
  { rfc: "GAGJGEVAEVE" },
  { rfc: "PGEBEAEGREA" },
  { rfc: "GEAEGAREEAS" },
];

export const CreateNewRFC = () => {
  const { values: newFormValues, handleInputChange: handleFormInputChange } =
    useForm({
      rfc: "",
      name: "",
      address: "",
      phone: "",
      email: "",
    });
  const { rfc, name, address, phone, email } = newFormValues;

  const [search, setsearch] = useState("");

  const handleSearchChange = (e) => {
    setsearch(e.target.value);
    console.log(search);
  };

  const taxpayers = useMemo(() => {
    return dummyData.filter((data) =>
      data.rfc.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }, [search]);

  console.log(taxpayers);

  return (
    <Fragment>
      <div className="row m-5">
        <div className="db-rfc__header fs-2 mb-5">Registro de RFC</div>
        <form action="">
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
                value={email}
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
