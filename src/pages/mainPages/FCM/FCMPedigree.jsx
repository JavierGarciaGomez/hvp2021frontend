import React, { Fragment } from "react";
import { useScript } from "../../../hooks/useScript";

import { Check, Info } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Switch,
  Tooltip,
} from "@mui/material";
import { FCMLink } from "./FCMLink";
import { FCMHeader } from "./components/FCMHeader";
import { FCMLinks } from "./components/FCMLinks";
import { FcmListItem } from "../components/FcmListItem";
import { FcmStep } from "./components/FcmStep";
import { procedureQuestionsTypes, procedureTypes } from "../../../types/types";
import { useEffect } from "react";
import { useState } from "react";
import { lineHeight } from "@mui/system";
import { useForm } from "../../../hooks/useForm";

export const initialState = {
  puppiesNum: 0,
  dogsNum: 0,
  partnerNum: 0,
  olderThan3Months: false,
  transfersNum: 0,
};

export const FCMPedigree = () => {
  const [procedure, setProcedure] = useState("");
  const [questions, setquestions] = useState([]);

  const { values, handleInputChange, reset, setFullValues } =
    useForm(initialState);
  const { puppiesNum, dogsNum, partnerNum, olderThan3Months, transfersNum } =
    values;

  const handleChange = (event) => {
    setProcedure(event.target.value);
  };

  useEffect(() => {
    console.log(procedure, procedureTypes);
    if (procedure !== "") setquestions([procedureTypes[procedure].questions]);
  }, [procedure]);

  console.log(values);

  return (
    <div className="container">
      <div className="mp-FCM__section-header  mb-5r">
        <h3 className="mp-FCM__procHeading">Pedigrí (camadas)</h3>
        <div className="mp-FCM__secHeadingLine"></div>
      </div>
      <div className="mp-FCM__section-desc  mb-5r">
        <h4 className="mp-FCM__section-heading text-white">Descripción</h4>
        <p className="def-par text-white">
          El trámite para la obtención del pedigrí tiene por objeto garantizar
          que un perro pertenece a determinada raza y que posee un mínimo de
          tres generaciones de antepasados de la misma raza cumpliendo un
          estándar determinado.
        </p>
      </div>
      <div className="mp-FCM__section-req mb-5r">
        <h4 className="mp-FCM__section-heading">Requisitos</h4>
        <ul className="mp-FCM-main__list">
          {/* todo adjuntar enlace */}
          <FcmListItem text="Llenar el formato electrónico de certificado de cruza correctamente, a través de este sitio web." />
          <FcmListItem text="Ambos padres deberán contar con pedigrí. Esto se prueba presentando copia de los pedigrís internacionales (color azul) de la Federación Canófila Mexicana. También se pueden registrar los perros que tengan antecedentes de tres generaciones con certificado de pureza racial." />
          <FcmListItem text="Los cachorros deberán ser mayores de 6 semanas y menores de 9 meses. En caso contrario, deberá realizarse el trámite de registro extemporáneo." />
          <FcmListItem text="Los propietarios de ambos padres sean socios vigentes de la FCM. Esto se prueba presentando sus credenciales vigentes. En caso de no serlo deberán darse de alta mediante el procedimiento correspondiente que se puede consultar en este sitio." />
          <FcmListItem text="Comprobar la identidad del o los propietarios, presentando copias de sus credenciales de elector." />
          <FcmListItem text="Los propietarios de los padres deberán constar en los pedigrís respectivos, en caso de haberse endosado previamente sin haberse formalizado el cambio de propietario ante la FCM, se deberá realizar también el cambio de propietario que se puede consultar en este sitio." />
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
          desc="Date de alta en este sitio, crea un paquete y llena los formatos respectivos."
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
      <div className="mp-FCM__section-calc mb-5r">
        <h4 className="mp-FCM__section-heading">Calculadora de costos</h4>
        <div className="mp-FCM__calc-disclaimer mb-3r">
          <span>Nota:</span> Los costos de esta calculadora son con respecto a
          los trámites de la FCM, pero pueden haber costos adicionales, por
          ejemplo en caso de que sea necesario sedar al perro para el tatuaje.
        </div>
        <div className="mp-FCM__calc-select d-flex justify-content-center mb-3r">
          <FormControl
            sx={{
              m: 1,
              minWidth: "30rem",
              fontSize: "3.6rem",
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{ fontSize: "1.6rem" }}
            >
              Trámite
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={procedure}
              label="Trámite"
              onChange={handleChange}
              sx={{ fontSize: "1.6rem" }}
            >
              {Object.keys(procedureTypes).map((key) => {
                return (
                  <MenuItem
                    key={key}
                    value={procedureTypes[key].value}
                    sx={{ fontSize: "1.6rem" }}
                  >
                    {procedureTypes[key].title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="mp-FCM__calc-form mb-3r">
          <form>
            <div className="mp-FCM__calc-questions-container">
              <div className="mp-FCM__calc-question">
                <label htmlFor="" className="mp-FCM__calc-label">
                  {procedureQuestionsTypes.puppiesNum}&nbsp;
                  <Tooltip
                    title={
                      <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>
                        Cantidad de cachorros que se van a registrar para
                        obtener el pedigrí.
                      </span>
                    }
                  >
                    <Info />
                  </Tooltip>
                </label>
                <input
                  type="number"
                  name="puppiesNum"
                  value={puppiesNum}
                  onChange={handleInputChange}
                  className="mp-FCM__calc-input form-control"
                />
              </div>
              <div className="mp-FCM__calc-question">
                <label htmlFor="" className="mp-FCM__calc-label">
                  {procedureQuestionsTypes.partnerNum}&nbsp;
                  <Tooltip
                    title={
                      <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>
                        Los propietarios de los padres deben ser, en lo
                        individual, socios vigentes. En caso de no serlo deberán
                        abonar su inscripción o renovación.
                      </span>
                    }
                  >
                    <Info />
                  </Tooltip>
                </label>
                <input
                  type="number"
                  name="partnerNum"
                  value={partnerNum}
                  onChange={handleInputChange}
                  className="mp-FCM__calc-input form-control"
                />
              </div>
              <div className="mp-FCM__calc-question">
                <label htmlFor="" className="mp-FCM__calc-label">
                  {procedureQuestionsTypes.transfersNum}&nbsp;
                  <Tooltip
                    title={
                      <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>
                        En caso de que existan endosos en los pedigríes de los
                        padres deberán haberse formalizado ante la FCM. En caso
                        contrario, deberá abonarse también la transferencia.
                      </span>
                    }
                  >
                    <Info />
                  </Tooltip>
                </label>
                <input
                  type="number"
                  className="mp-FCM__calc-input form-control"
                  name="transfersNum"
                  value={transfersNum}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mp-FCM__calc-question">
                <label htmlFor="" className="mp-FCM__calc-label">
                  {procedureQuestionsTypes.olderThan3Months} &nbsp;
                  <Tooltip
                    title={
                      <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>
                        Los cachorros siempre deben ser de ocho meses o menos.
                        Pero cuando son mayores de tres meses, el costo es
                        adicional.
                      </span>
                    }
                  >
                    <Info />
                  </Tooltip>
                </label>
                <Switch
                  checked={olderThan3Months}
                  onChange={handleInputChange}
                  name="olderThan3Months"
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="mp-FCM__calc-calculations  mb-3r">
          <table className="mp-FCM__calc-table">
            <thead className="mp-FCM__calc-tablehead">
              <tr>
                <th>Concepto</th>
                <th>Cantidad</th>
                <th>Monto</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th>
                  Registro de camadas de 6 semanas a 3 meses de edad por perro
                  con 3 generaciones
                </th>
                <td>7</td>
                <td>$500.00</td>
                <td>$3500.00</td>
              </tr>
              <tr>
                <th>
                  Registro de camadas de 6 semanas a 3 meses de edad por perro
                  con 3 generaciones
                </th>
                <td>7</td>
                <td>$500.00</td>
                <td>$3500.00</td>
              </tr>
            </tbody>
          </table>
          <div className="mp-FCM__calc-total"></div>
        </div>
      </div>
    </div>
  );
};
