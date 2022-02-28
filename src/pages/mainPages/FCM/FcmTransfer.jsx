import React, { Fragment } from "react";

import { FcmListItem } from "../components/FcmListItem";
import { FcmStep } from "./components/FcmStep";
import { FcmCalculator } from "./components/FcmCalculator";
import { procedureTypes } from "../../../types/types";

export const FcmTransfer = () => {
  return (
    <Fragment>
      <div className="mb-5r">
        <h3 className="heading--secondary u-center u-textPrimary">
          Cambio de propietario o transferencia
        </h3>
        <div className="separationLine"></div>
      </div>
      <div className="c-card u-bgPrimaryDarkest u-p2r u-mb-5r">
        <h4 className="heading--tertiary u-textWhite">Descripción</h4>
        <p className="text-white">
          El trámite para el cambio de propietario, este trámite es bastante
          recurrente cuando se presenta el trámite de pedigrí de un cachorro o
          camada y el propietario de uno de los padres no está a nombre de quien
          realiza el trámite.
        </p>
      </div>
      <div className="mb-5r">
        <h4 className="heading--tertiary mb-2r">Requisitos</h4>
        <ul className="">
          {/* todo adjuntar enlace */}
          <FcmListItem text="Presentar el documento del que se va a realizar la transferencia correctamente endosado, a saber: a) Firma del vendedor (en caso de varios endosos, deberán aparecer todos), b) firma del comprador (en caso de copropiedad, deberán aparecer todos), c) Fecha de transferencia." />
          <FcmListItem text="El comprador o compradores deberán ser socios de la FCM. En caso de no serlo deberá darse de alta mediante el procedimiento correspondiente." />
          <FcmListItem text="Comprobar la identidad del comprador, presentando original y copia de su credencial de elector." />
          <FcmListItem text="Informar del número telefónico para contacto posterior." />
          <FcmListItem text="Informar del correo electrónico para contacto posterior." />
          <FcmListItem text="Pagar las cuotas que correspondan." />
        </ul>
      </div>
      <div className="u-mb-5r">
        <h4 className="heading--tertiary u-mb-2r">Procedimiento</h4>
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
      <FcmCalculator recProcedure={procedureTypes.transfer.value} />
    </Fragment>
  );
};
