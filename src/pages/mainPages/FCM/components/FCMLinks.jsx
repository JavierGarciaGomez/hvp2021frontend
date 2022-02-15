import React from "react";
import { FCMLink } from "../FCMLink";

export const FCMLinks = ({ handleHideMenu }) => {
  return (
    <div className="mp-FCP__links container" onClick={handleHideMenu}>
      <FCMLink
        link="/services/fcm"
        classN="general"
        heading="Inicio"
        desc="Regresa al inicio del portal."
      />
      <FCMLink
        link="fcmcalc"
        classN="calc"
        heading="Calculadora de costos"
        desc="Con este instrumento podrás calcular el costo de los servicios que requieres."
      />
      <FCMLink
        link="pedigree"
        classN="pedigree"
        heading="Pedigree (camadas)"
        desc="Garantiza que pertenece a una raza determinada y que esta está
            certificada por al menos tres generaciones."
      />
      <FCMLink
        link="racePurity"
        classN="racePurity"
        heading="Pureza racial (camadas)"
        desc="Certifica que es de determinada raza, en virtud de que al menos uno de sus padres también lo es."
      />
      <FCMLink
        link="initialRegister"
        classN="initialRegister"
        heading="Registro inicial (individual)"
        desc="Revisión preliminar de un cachorro que no cuenta con antecedentes y que no cuenta con la edad para obtener un certificado de pureza racial inicial."
      />
      <FCMLink
        link="initialRacePurity"
        classN="initialRacePurity"
        heading="Pureza racial inicial (individual)"
        desc="Certifica que es de determinada raza, pero no cuenta con antecedentes y es mayor a 8 meses."
      />
      <FCMLink
        link="contestCertificate"
        classN="contestCertificate"
        heading="Certificado para concurso (individual)"
        desc="El trámite tiene por objeto registrar a un perro para que pueda participar en un concurso sin tener en cuenta que tiene alguna determinada raza."
      />
      <FCMLink
        link="partnership"
        classN="partnership"
        heading="Alta o renovación de socios"
        desc="Dar de alta a un socio o renovar su membresía."
      />
      <FCMLink
        link="transfer"
        classN="transfer"
        heading="Cambio de propietario o transferencia"
        desc="Certificar el nuevo propietario para los trámites correspondientes."
      />
    </div>
  );
};
