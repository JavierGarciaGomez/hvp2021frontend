import { Card } from "@mui/material";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setFcmPackageType } from "../../actions/fcmActions";
import { fcmPackagesTypes } from "../../types/types";

const linksData = [
  {
    label: "Tramitar pedigree (certificado de cruza)",
    desc: "Trámite Pedigree.",
    link: "/clients/procedure/pedigree",
  },
  {
    label: "Tramitar pureza racial ??????",
    desc: "Trámite Pedigree.",
    link: "/clients/procedure/",
    packageType: fcmPackagesTypes.RACEPURITY,
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLink = (linkData) => {
    dispatch(setFcmPackageType(linkData.packageType));
    navigate(linkData.link);
  };

  return (
    <Fragment>
      <h2 className="heading--secondary"> Inicia un nuevo trámite </h2>{" "}
      <div className="proceduresWrapper">
        {linksData.map((element) => {
          return (
            <Card key={element.label} onClick={() => handleClickLink(element)}>
              <div className="procedure">
                <div className="procedure_name">{element.label}</div> <div className="procedure_desc">{element.desc}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </Fragment>
  );
};
