import React, { Fragment } from "react";

import { FcmListItem } from "../components/FcmListItem";
import { FcmStep } from "./components/FcmStep";
import { FcmCalculator } from "./components/FcmCalculator";
import { procedureTypes } from "../../../types/types";

export const FcmInitialRegister = () => {
  return (
    <Fragment>
      <div className="mb-5r">
        <h3 className="heading--secondary u-center u-textPrimary">
          Registro inicial (individual)
        </h3>
        <div className="separationLine"></div>
      </div>
      <div className="c-card u-bgPrimaryDarkest u-p2r  mb-5r">
        <h4 className="heading--tertiary u-textWhite">Descripción</h4>
        <p className="text-white">
          El trámite para la obtención del registro inicial tiene por objeto
          evaluar la raza, a través de una revisión preliminar del cachorro
          (entre 1 y 6 meses de edad), que no tiene antecedentes ni propios ni
          de sus padres en la FCM y que no cuenta con la edad (8 meses) para
          obtener un certificado de pureza racial inicial, por lo que una vez
          cumplida esta deberá realizarse una inspección.
        </p>
      </div>
      <div className="mb-5r">
        <h4 className="heading--tertiary mb-2r">Requisitos</h4>
        <ul className="">
          {/* todo adjuntar enlace */}
          <FcmListItem text="Llenar el formato electrónico de registro inicial, a través de este sitio web." />
          <FcmListItem text="El perro debe tener entre 1 y 6 meses de edad." />
          <FcmListItem text="El propietario debe ser socio vigente de la FCM. Esto se prueba presentando su credencial vigente. En caso de no serlo deberá darse de alta mediante el procedimiento correspondiente que se puede consultar en este sitio." />
          <FcmListItem text="Comprobar la identidad del propietario, presentando original y copia de su credencial de elector." />
          <FcmListItem text="Informar del número telefónico para contacto posterior." />
          <FcmListItem text="Informar del correo electrónico para contacto posterior." />
          <FcmListItem text="Pagar las cuotas que correspondan." />
        </ul>
      </div>
      <div className=" mb-5r">
        <h4 className="heading--tertiary mb-2r">Procedimiento</h4>
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
      <FcmCalculator recProcedure={procedureTypes.initialRegister.value} />
    </Fragment>
  );
};
