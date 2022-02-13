import React, { Fragment } from "react";
import { useScript } from "../../../hooks/useScript";
import { Check } from "@mui/icons-material";
import { Link } from "@mui/material";
import { FCMLink } from "./FCMLink";
import { FCMHeader } from "./components/FCMHeader";
import { FCMLinks } from "./components/FCMLinks";

export const FCMIndex = () => {
  // ionicons

  return (
    <div className="mp-FCM">
      <FCMHeader />
      {/* disclaimer */}
      <div className="container">
        <div className="mp-FCM-main__disclaimer">
          <div className="mp-FCM-main__disclaimer-left">
            <a href="https://fcm.mx/">
              <img
                className="mp-FCM-main__logo"
                src="http://fcm.mx/wp-content/uploads/2020/03/logo.png"
                alt=""
              />
            </a>
          </div>

          <div className="mp-FCM-main__disclaimer-right">
            <p className="mp-FCM-main__disclaimer-text">
              Nuestro director médico es médico inspector de la{" "}
              <span className="fw-bold text-danger">
                Federación Canófila Mexicana A. C.
              </span>
              , la cual es la que emite la información oficial y registra en
              última instancia los trámites. Con gusto le podemos ayudar en sus
              dudas, pero para mayor certeza le invitamos a visitar el sitio web
              de la FCM o bien contactarlos al teléfono &nbsp;
              <span className="text-muted">555 655 9330</span>.
            </p>
            <a href="https://fcm.mx/" className="">
              <button className="d-block mx-auto btn btn-primary">
                Visite el sitio oficial
              </button>
            </a>
          </div>
        </div>
      </div>
      {/* Explicación del portal */}
      <div className="mp-FCM-main__expfuncWrapper container">
        <div className="mp-FCM-main__explanation">
          <div className="mp-FCM-main__guide">
            <h3 className="mp-FCM-main__secHeading">Funcionamiento</h3>
            <p className="def-par">
              Este miniportal tiene por objetivo ser una guía para nuestros
              clientes con respecto a los trámites de la Federación Canófila
              Mexicana. Su funcionamiento es muy sencillo, basta con seleccionar
              el trámite deseado para conocer los procedimientos, requisitos y
              hacer los cálculos respectivos.
            </p>
            <p className="def-par">
              Cualquier duda al respecto, puede consultarnos vía telefónica o de
              forma presencial. O bien consultar directamente con la Federación
              Canófila Mexicana.
            </p>
          </div>
        </div>
        <div className="mp-FCM-main__importance">
          <h3 className="mp-FCM-main__secHeading">Ventajas del registro</h3>
          <ul className="mp-FCM-main__list">
            <li className="mp-FCM-main__listItem">
              <Check
                sx={{
                  color: "var(--primary-color)",
                  fontSize: "3.2rem",
                }}
              />
              <span>
                Contar con su certificado de registro que funciona como acta de
                nacimiento y como titulo de propiedad y respaldo legal.
              </span>
            </li>
            <li className="mp-FCM-main__listItem">
              <Check
                sx={{ color: "var(--primary-color)", fontSize: "3.2rem" }}
              />
              <span>
                Certificar los datos como nombre, raza, color, sexo, número de
                registro, fecha y lugar de nacimiento
              </span>
            </li>
            <li className="mp-FCM-main__listItem">
              <Check
                sx={{ color: "var(--primary-color)", fontSize: "3.2rem" }}
              />
              <span>Poder participar en los eventos que programa la FCM</span>
            </li>
            <li className="mp-FCM-main__listItem">
              <Check
                sx={{ color: "var(--primary-color)", fontSize: "3.2rem" }}
              />
              <span>
                Contar hasta con 3 identificaciones permanentes: registro,
                microchip y tatuaje
              </span>
            </li>
            <li className="mp-FCM-main__listItem">
              <Check
                sx={{ color: "var(--primary-color)", fontSize: "3.2rem" }}
              />
              <span>Conocer la línea de sangre.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* importancia */}

      <FCMLinks />
    </div>
  );
};
