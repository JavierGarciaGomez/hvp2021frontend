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
    <div className="l-pageContent u-pt-10r u-bgPrimaryLightest">
      <FCMHeader />
      {/* disclaimer */}
      <div className="container">
        <div className="c-horizontalCard u-bgWhite u-mb-5r">
          <div className="c-horizontalCard_left">
            <a href="https://fcm.mx/">
              <img
                className="fcmLogo"
                src="http://fcm.mx/wp-content/uploads/2020/03/logo.png"
                alt=""
              />
            </a>
          </div>

          <div className="c-horizontalCard_right">
            <p className="">
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

        {/* Explicación del portal */}

        <div className="l-gridWrapper mb-5r">
          <div className="c-card u-p-2r">
            <h3 className="heading--secondary u-textPrimary u-mb-2r">
              Funcionamiento
            </h3>
            <p className="">
              Este miniportal tiene por objetivo ser una guía para nuestros
              clientes con respecto a los trámites de la Federación Canófila
              Mexicana. Su funcionamiento es muy sencillo, basta con seleccionar
              el trámite deseado para conocer los procedimientos, requisitos y
              hacer los cálculos respectivos.
            </p>
            <p className="">
              Cualquier duda al respecto, puede consultarnos vía telefónica o de
              forma presencial. O bien consultar directamente con la Federación
              Canófila Mexicana.
            </p>
          </div>

          <div className="c-card u-p-2r">
            <h3 className="heading--secondary u-textPrimary u-mb-2r">
              Ventajas del registro
            </h3>
            <ul className="list">
              <li className="fcmListItem">
                <Check
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "3.2rem",
                  }}
                />
                <span>
                  Contar con su certificado de registro que funciona como acta
                  de nacimiento y como titulo de propiedad y respaldo legal.
                </span>
              </li>
              <li className="fcmListItem">
                <Check
                  sx={{ color: "var(--primary-color)", fontSize: "3.2rem" }}
                />
                <span>
                  Certificar los datos como nombre, raza, color, sexo, número de
                  registro, fecha y lugar de nacimiento
                </span>
              </li>
              <li className="fcmListItem">
                <Check
                  sx={{ color: "var(--primary-color)", fontSize: "3.2rem" }}
                />
                <span>Poder participar en los eventos que programa la FCM</span>
              </li>
              <li className="fcmListItem">
                <Check
                  sx={{ color: "var(--primary-color)", fontSize: "3.2rem" }}
                />
                <span>
                  Contar hasta con 3 identificaciones permanentes: registro,
                  microchip y tatuaje
                </span>
              </li>
              <li className="fcmListItem">
                <Check
                  sx={{ color: "var(--primary-color)", fontSize: "3.2rem" }}
                />
                <span>Conocer la línea de sangre.</span>
              </li>
            </ul>
          </div>
        </div>

        <FCMLinks />
      </div>
    </div>
  );
};
