import React from "react";

import { FcmListItem } from "../components/FcmListItem";
import { FcmStep } from "./components/FcmStep";
import { FcmCalculator } from "./components/FcmCalculator";
import { procedureTypes } from "../../../types/types";

export const FcmPartnership = () => {
  return (
    <div className="container">
      <div className="mp-FCM__section-header  mb-5r">
        <h3 className="mp-FCM__procHeading">Altas y renovaciones de socios</h3>
        <div className="mp-FCM__secHeadingLine"></div>
      </div>
      <div className="mp-FCM__section-desc  mb-5r">
        <h4 className="mp-FCM__section-heading text-white">Descripción</h4>
        <p className="def-par text-white">
          El trámite tiene por objeto dar de alta a un socio en la FCM o renovar
          su membresía, lo que resulta obligatorio para realizar cualquiera de
          los otros trámites referidos en este minisitio.
        </p>
      </div>
      <div className="mp-FCM__section-req mb-5r">
        <h4 className="mp-FCM__section-heading">Requisitos</h4>
        <ul className="mp-FCM-main__list">
          {/* todo adjuntar enlace */}
          <FcmListItem text="Llenar el formato electrónico de nuevo socio." />
          <FcmListItem text="Llenar el formato físico de nuevo socio. El nuevo socio deberá poner únicamente su firma en la credencial y en el resguardo de la FCM y en la parte final deberá poner su nombre completo, dirección (calle, número, colonia, ciudad, estado y CP), teléfono y correo electrónico." />
          <FcmListItem text="Comprobar la identidad del cliente, presentando original y copia de su credencial de elector." />
          <FcmListItem text="Comprobar el domicilio del cliente, presentando original y copia de un comprobante domiciliario." />
          <FcmListItem text="Informar del número telefónico para contacto posterior." />
          <FcmListItem text="Informar del correo electrónico para contacto posterior." />
          <FcmListItem text="Pagar las cuotas que correspondan." />
        </ul>
      </div>
      <div className="mp-FCM__section-proc mb-5r">
        <h4 className="mp-FCM__section-heading">Procedimiento</h4>
        <FcmStep
          imgSrc={"requirement.png"}
          num="01"
          title="Requisitos"
          desc="Consulta y ten preparados los requisitos que se solicitan, de
              conformidad con este sitio."
          reverse={false}
        />
        <FcmStep
          imgSrc={"format.png"}
          num="02"
          title="Formato"
          desc="Date de alta en este sitio, crea un paquete, llena los formatos respectivos y anexa la documentación solicitada."
          reverse={true}
        />
        <FcmStep
          imgSrc={"appointments.png"}
          num="03"
          title="Agenda una cita"
          desc="Agenda telefónicamente una cita en nuestra sucursal de Harbor."
          reverse={false}
        />
        <FcmStep
          imgSrc={"veterinarian.png"}
          num="04"
          title="Acude a la cita"
          desc="Acude a la cita con los documentos requeridos."
          reverse={true}
        />
        <FcmStep
          imgSrc={"signature.png"}
          num="05"
          title="Firma"
          desc="Se termina de llenar el formato y se firma por el cliente."
          reverse={false}
        />
        <FcmStep
          imgSrc={"money.png"}
          num="06"
          title="Pago"
          desc="Realiza el pago en nuestra caja."
          reverse={true}
        />
        <FcmStep
          imgSrc={"package.png"}
          num="07"
          title="Envío"
          desc="Nuestro personal enviará el paquete con los documentos respectivos a la sede de la FCM."
          reverse={false}
        />
        <FcmStep
          imgSrc={"delivery.png"}
          num="08"
          title="Entrega"
          desc="Cuando recibamos los documentos de la FCM, nos comunicaremos para pasar a recogerlos."
          reverse={true}
        />
      </div>
      <FcmCalculator recProcedure={procedureTypes.partnership.value} />
    </div>
  );
};
