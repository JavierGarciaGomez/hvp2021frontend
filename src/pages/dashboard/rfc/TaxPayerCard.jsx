import React from "react";

export const TaxPayerCard = ({ taxpayer }) => {
  const { rfc, name, email, phone, address } = taxpayer;
  return (
    <div className="col-12 col-md-5 bg-default m-3">
      <div class="card-body">
        <h5 class="card-title  fs-2">
          <span className="fw-bold">RFC: </span>
          {rfc}
        </h5>
        <p class="card-text mb-3">
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
      </div>
    </div>
  );
};
