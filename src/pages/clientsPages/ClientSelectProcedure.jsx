import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const linksData = [
  {
    label: "Dar de alta a socio ya registrado",
    desc: "Trámite para dar de alta los datos de un socio con credencial vigente. Para socios Ya registrados. Un socio con registro vigente es necesario para todos los trámites de la Federación Canófila Mexicana.",
    link: "/clients/fcmPartner/new",
  },
  {
    label: "Dar de alta a socio ya registrado",
    desc: "Trámite para dar de alta los datos de un socio con credencial vigente. Para socios Ya registrados. Un socio con registro vigente es necesario para todos los trámites de la Federación Canófila Mexicana.",
    link: "fcmPartnerNew",
  },
  {
    label: "Dar de alta a socio ya registrado",
    desc: "Trámite para dar de alta los datos de un socio con credencial vigente. Para socios Ya registrados. Un socio con registro vigente es necesario para todos los trámites de la Federación Canófila Mexicana.",
    link: "fcmPartnerNew",
  },
];

export const ClientSelectProcedure = () => {
  return (
    <Fragment>
      <h2 className="heading--secondary"> Inicia un nuevo trámite </h2>{" "}
      <div className="proceduresWrapper">
        {linksData.map((element) => {
          return (
            <Link to={element.link}>
              <div className="procedure">
                <div className="procedure_name">{element.label}</div>{" "}
                <div className="procedure_desc">{element.desc}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </Fragment>
  );
};
