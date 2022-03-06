import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const linksData = [
  {
    label: "Tramitar pedigree (certificado de cruza)",
    desc: "Trámite Pedigree.",
    link: "/clients/procedure/pedigree",
  },
  {
    label: "Dar de alta a socio ya registrado",
    desc: "Trámite para dar de alta los datos de un socio con credencial vigente. Para socios Ya registrados. Un socio con registro vigente es necesario para todos los trámites de la Federación Canófila Mexicana.",
    link: "/clients/fcmPartner/new",
  },

  {
    label: "Dar de alta a un perro con Pedigree",
    desc: "Trámite para dar de alta a un perro con Pedigree con el objeto de que pueda ser utilizado en otro trámite. Es necesario que antes de llenar este formulario, se dé de alta al socio que funga como propietario.",
    link: "/clients/fcmDog/new",
  },
  {
    label: "Dar de alta a socio ya registradooo",
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
            <Link key={element.label} to={element.link}>
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
