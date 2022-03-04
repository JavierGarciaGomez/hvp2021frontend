import dayjs from "dayjs";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ClientProfile = () => {
  const { client } = useSelector((state) => state.clients);

  return (
    <Fragment>
      <h2 className="heading--secondary">Perfil del cliente </h2>
      <h3 className="heading--tertiary">Datos del perfil</h3>
      <div className="profileData"></div>
      <h3 className="heading--tertiary">
        Cuentas de socio asociadas a esta cuenta
      </h3>
      <div className="l-cardsWrapper">
        {client.linkedFcmPartners.map((fcmPartner) => {
          return (
            <div className="c-card" key={fcmPartner._id}>
              <div className="c-card_top">
                <div className="heading--tertiary">{fcmPartner.partnerNum}</div>
              </div>
              <div className="c-card_body">
                <p>
                  <span className="fw-bold">Nombre: </span>
                  {` ${fcmPartner.firstName} ${fcmPartner.paternalSurname} ${fcmPartner.maternalSurname}`}
                </p>
                <p>
                  <span className="fw-bold">Fecha de expiración: </span>
                  {` ${dayjs(fcmPartner.expirationDate).format("DD-MMM-YYYY")}`}
                </p>
                {fcmPartner.homePhone && (
                  <p>
                    <span className="fw-bold">Teléfono: </span>
                    {` ${fcmPartner.homePhone}`}
                  </p>
                )}
                {fcmPartner.mobilePhone && (
                  <p>
                    <span className="fw-bold">Teléfono móvil: </span>
                    {` ${fcmPartner.mobilePhone}`}
                  </p>
                )}
                {fcmPartner.email && (
                  <p>
                    <span className="fw-bold">Teléfono móvil: </span>
                    {` ${fcmPartner.email}`}
                  </p>
                )}
              </div>
              <div className="c-card_footer">
                <div>
                  <Link to={`/clients/fcmPartner/${fcmPartner._id}`}>
                    <button className="c-button u-center">Editar</button>
                  </Link>
                </div>
                <div>
                  <button className="c-button -danger u-center">
                    Desvincular
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
