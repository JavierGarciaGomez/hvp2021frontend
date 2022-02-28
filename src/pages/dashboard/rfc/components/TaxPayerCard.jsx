import React from "react";
import { Link } from "react-router-dom";

export const TaxPayerCard = ({ taxpayer }) => {
  const { _id, rfc, name, email, phone, address, notes } = taxpayer;
  return (
    <div className="col-12 col-md-5 bg-default m-3">
      <div className="c-card-body">
        <h5 className="c-card-title  fs-2">
          <span className="fw-bold">RFC: </span>
          {rfc}
        </h5>
        <p className="c-card-text mb-3">
          <span className="fw-bold">Nombre o razón social: </span>
          {name}
        </p>
        <p>
          <span className="fw-bold">Correo electrónico: </span>
          {email}
        </p>
        <p>
          <span className="fw-bold">Teléfono: </span>
          {phone}
        </p>
        <p>
          <span className="fw-bold">Dirección: </span>
          {address}
        </p>
        <p>
          <span className="fw-bold">Notas: </span>
          {notes}
        </p>
        <Link to={`${_id}`}>
          <button className="btn btn-primary">Editar</button>
        </Link>
      </div>
    </div>
  );
};
