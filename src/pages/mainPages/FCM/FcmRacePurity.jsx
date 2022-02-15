import React from "react";

import { FcmListItem } from "../components/FcmListItem";
import { FcmStep } from "./components/FcmStep";
import { FcmCalculator } from "./components/FcmCalculator";
import { procedureTypes } from "../../../types/types";

export const FcmRacePurity = () => {
  return (
    <div className="container">
      <div className="mp-FCM__section-header  mb-5r">
        <h3 className="mp-FCM__procHeading">Pureza racial (camadas)</h3>
        <div className="mp-FCM__secHeadingLine"></div>
      </div>
      <div className="mp-FCM__section-desc  mb-5r">
        <h4 className="mp-FCM__section-heading text-white">Descripción</h4>
        <p className="def-par text-white">
          El trámite para la obtención del certificado de pureza racial tiene
          por objeto certificar que los cachorros de una camada son de
          determinada raza, en virtud de que ambos padres o uno de ellos cuenta
          también con un certificado de pureza racial o un certificado de pureza
          racial inicial.
        </p>
      </div>
      <div className="mp-FCM__section-req mb-5r">
        <h4 className="mp-FCM__section-heading">Requisitos</h4>
        <ul className="mp-FCM-main__list">
          {/* todo adjuntar enlace */}
          <FcmListItem text="Llenar el formato electrónico de certificado de cruza correctamente, a través de este sitio web." />
          <FcmListItem text="Al menos uno de los padres deberá contar con pedigrí o con certificado de pureza racial. Esto se prueba presentando copia del CPR o del pedigrí internacional (color azul) de la Federación Canófila Mexicana." />
          <FcmListItem text="Los cachorros deberán ser mayores de 6 semanas y menores de 9 meses." />
          <FcmListItem text="Los propietarios de ambos padres sean socios vigentes de la FCM. Esto se prueba presentando sus credenciales vigentes. En caso de no serlo deberán darse de alta mediante el procedimiento correspondiente que se puede consultar en este sitio." />
          <FcmListItem text="Comprobar la identidad del o los propietarios, presentando originales y copias de sus credenciales de elector." />
          <FcmListItem text="Informar del número telefónico para contacto posterior." />
          <FcmListItem text="Informar del correo electrónico para contacto posterior." />
          <FcmListItem text="Los propietarios de los padres deberán constar en los pedigrís o CPR respectivos, en caso de haberse endosado previamente sin haberse formalizado el cambio de propietario ante la FCM, se deberá realizar también el cambio de propietario que se puede consultar en este sitio." />
          <FcmListItem text="En caso de que se presenten documentos internacionales no expedidos por la FCM, deben venir endosados en el país de origen." />
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
          desc="Acude a la cita con los documentos requeridos y los cachorros."
          reverse={true}
        />
        <FcmStep
          imgSrc={"stethoscope.png"}
          num="05"
          title="Inspección"
          desc="Nuestro médico hará la inspección respectiva, así como la implantación del microchip y el tatuaje. El tatuaje es opcional, pero debe pagarse."
          reverse={false}
        />
        <FcmStep
          imgSrc={"signature.png"}
          num="06"
          title="Firma"
          desc="Se termina de llenar el formato y se firma por el médico así como por los clientes."
          reverse={true}
        />
        <FcmStep
          imgSrc={"money.png"}
          num="07"
          title="Pago"
          desc="Realiza el pago en nuestra caja."
          reverse={false}
        />
        <FcmStep
          imgSrc={"package.png"}
          num="08"
          title="Envío"
          desc="Nuestro personal enviará el paquete con los documentos respectivos a la sede de la FCM."
          reverse={true}
        />
        <FcmStep
          imgSrc={"delivery.png"}
          num="09"
          title="Entrega"
          desc="Cuando recibamos los documentos de la FCM, nos comunicaremos para pasar a recogerlos."
          reverse={false}
        />
      </div>
      <FcmCalculator recProcedure={procedureTypes.racePurity.value} />
    </div>
  );
};
