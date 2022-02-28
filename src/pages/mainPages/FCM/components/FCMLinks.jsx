import React from "react";
import { FCMLink } from "../FCMLink";

export const FCMLinks = ({ handleHideMenu }) => {
  return (
    <div className="l-gridWrapper -grid3 u-mb-6r" onClick={handleHideMenu}>
      <FCMLink
        link="/services/fcm"
        classN="General"
        heading="Inicio"
        desc="Regresa al inicio del portal."
      />
      <FCMLink
        link="fcmcalc"
        classN="Calc"
        heading="Calculadora de costos"
        desc="Con este instrumento podrás calcular el costo de los servicios que requieres."
      />
      <FCMLink
        link="pedigree"
        classN="Pedigree"
        heading="Pedigree (camadas)"
        desc="Garantiza que pertenece a una raza determinada y que esta está
            certificada por al menos tres generaciones."
      />
      <FCMLink
        link="racePurity"
        classN="RacePurity"
        heading="Pureza racial (camadas)"
        desc="Certifica que es de determinada raza, en virtud de que al menos uno de sus padres también lo es."
      />
      <FCMLink
        link="initialRegister"
        classN="InitialRegister"
        heading="Registro inicial (individual)"
        desc="Revisión preliminar de un cachorro que no cuenta con antecedentes y que no cuenta con la edad para obtener un certificado de pureza racial inicial."
      />
      <FCMLink
        link="initialRacePurity"
        classN="InitialRacePurity"
        heading="Pureza racial inicial (individual)"
        desc="Certifica que es de determinada raza, pero no cuenta con antecedentes y es mayor a 8 meses."
      />
      <FCMLink
        link="contestCertificate"
        classN="ContestCertificate"
        heading="Certificado para concurso (individual)"
        desc="El trámite tiene por objeto registrar a un perro para que pueda participar en un concurso sin tener en cuenta que tiene alguna determinada raza."
      />
      <FCMLink
        link="partnership"
        classN="Partnership"
        heading="Alta o renovación de socios"
        desc="Dar de alta a un socio o renovar su membresía."
      />
      <FCMLink
        link="transfer"
        classN="Transfer"
        heading="Cambio de propietario o transferencia"
        desc="Certificar el nuevo propietario para los trámites correspondientes."
      />
    </div>
  );
};
