import React, { Fragment } from "react";
import { useScript } from "../../../hooks/useScript";
import { Check } from "@mui/icons-material";
import { Link } from "@mui/material";
import { FCMLink } from "./FCMLink";

export const FCMLayout = () => {
  // ionicons

  return (
    <div className="mp-FCM">
      <div className="mp-FCM-main__header">
        <h2 className="mp-FCM-main__heading">
          Miniportal de trámites de la Federación Canófila Mexicana
        </h2>
      </div>
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
        <div className="mp-FCM-main__explanation container">
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

      <div className="mp-FCM-main__links"></div>
      {/* Acceso al portal */}

      <div className="mp-FCP__links container">
        <FCMLink
          link=""
          classN="general"
          heading="Inicio"
          desc="Regresa al inicio del portal."
        />
        <FCMLink
          link=""
          classN="calc"
          heading="Calculadora de costos"
          desc="Con este instrumento podrás calcular el costo de los servicios que requieres."
        />
        <FCMLink
          link=""
          classN="pedigree"
          heading="Pedigree (camadas)"
          desc="Garantiza que pertenece a una raza determinada y que esta está
                certificada por al menos tres generaciones."
        />
        <FCMLink
          link=""
          classN="purRac"
          heading="Pureza racial (camadas)"
          desc="Certifica que es de determinada raza, en virtud de que al menos uno de sus padres también lo es."
        />
        <FCMLink
          link=""
          classN="regIni"
          heading="Registro inicial (individual)"
          desc="Revisión preliminar de un cachorro que no cuenta con antecedentes y que no cuenta con la edad para obtener un certificado de pureza racial inicial."
        />
        <FCMLink
          link=""
          classN="purRacIni"
          heading="Pureza racial inicial (individual)"
          desc="Certifica que es de determinada raza, pero no cuenta con antecedentes y es mayor a 8 meses."
        />
        <FCMLink
          link=""
          classN="contest"
          heading="Certificado para concurso"
          desc="El trámite tiene por objeto registrar a un perro para que pueda participar en un concurso sin tener en cuenta que tiene alguna determinada raza."
        />
        <FCMLink
          link=""
          classN="regPartner"
          heading="Alta o renovación de socios"
          desc="Dar de alta a un socio o renovar su membresía."
        />
        <FCMLink
          link=""
          classN="changeOwner"
          heading="Cambio de propietario o transferencia"
          desc="Certificar el nuevo propietario para los trámites correspondientes."
        />
      </div>
    </div>
  );
};

// <MainPagesServicesModel
//             sectionTitle="Registro de camadas"
//             imgName="pedig.jpg"
//             content={
//               <Fragment>
//                 <p>
//                   Este servicio es previa cita, no es una urgencia, hay que
//                   presentar la documentación respectiva para realizar el trámite
//                   que corresponda, somos inspectores oficiales de la Federación
//                   Canófila Mexicana con sede en el D.F. desde 1996, cuyo
//                   teléfono es el 01 555 655 9330 y en internet:www.fcm.org.mx
//                   Ud. podrá verificar la legitimidad correspondiente. En el caso
//                   de registros iniciales llamados C.P.R. (Certificado de Pureza
//                   Racial) es necesario presentar a su mascota a inspección y
//                   deberá ser de raza pura para tener derecho a su certificación.
//                   Cuando se trate de una camada, ésta deberá estar completa, no
//                   es posible registrar cachorros de una misma camada de manera
//                   individual. Toda la documentación deberá presentarse y
//                   tramitarse de manera completa. Es necesario ser Socio F.C.M.
//                   para realizar cualquier trámite; por lo tanto si es la primera
//                   vez que inicia un trámite, lo primero que hará, será
//                   inscribirse como socio usufructuario a la Federación Canófila
//                   Mexicana. Todo esto lo puede hacer con nosotros, llámenos y le
//                   asesoraremos con gusto.
//                 </p>
//                 <p>Registrar a su ejemplar tiene como finalidad:</p>

//                 <ul className="service-only-list">
//                   <li>Dar valor a las crias</li>
//                   <li>
//                     Conocer quién es el criador, el propietario y la línea de
//                     sangre
//                   </li>
//                   <li>
//                     Contar con 2 identificaciones permanentes (tatuaje y
//                     microchip)
//                   </li>
//                   <li>
//                     Permite exhibirlo en todos los eventos que programa la FCM
//                   </li>
//                   <li>
//                     Contar con su certificado de registro que funciona como acta
//                     de nacimiento y como titulo de propiedad y respaldo legal.
//                   </li>
//                   <li>
//                     Conocer los datos del ejemplar como son: títulos, nombre del
//                     ejemplar, raza o variedad, color, sexo, fecha y lugar de
//                     nacimiento, Num. de registro F.C.M, observaciones y
//                     calificaciones de displasia.
//                   </li>
//                 </ul>

//                 <p>
//                   En cuanto a sus antecedentes (padres, abuelos y bisabuelos)
//                   podemos conocer cuáles son los títulos, campeonatos y
//                   certificaciones (de conformación, trabajo, asistencia,
//                   deporte) con que cuentan. Nombre, No. De registro, color,
//                   procedencia nacional o extranjera, etc. Todo esto para poder
//                   mantener o mejorar la raza, evitando así la consanguinidad y
//                   los defectos y enfermedades hereditarias. Al analizar toda
//                   esta información podemos darnos una idea más clara de lo que
//                   tenemos y podemos lograr.
//                 </p>
//                 <p>
//                   En cuanto a registros (acta de nacimiento), existen tres
//                   tipos. 1.- El Certificado de Pureza Racial (CPR), se otorga a
//                   cualquier ejemplar de raza pura, pero que se desconoce alguno
//                   o algunos de sus antecedentes (padres, abuelos o bisabuelos).
//                   Es de color café y válido solo en México. Puede ser CPR
//                   inicial (sin genealogí,a conocida) y CPR con antecedentes. 2.-
//                   El Certificado Genealógico; se otorga a los ejemplares que ya
//                   han completado las 3 generaciones de padres, abuelos y
//                   bisabuelos, y que en su registro aparecen ejemplares con uno o
//                   varios números de certificado de pureza racial; es de color
//                   verde y válido solo en México. 3.- El Certificado de Pedigree
//                   Internacional, se otorga a ejemplares con antecedentes bien
//                   conocidos, hijos de ejemplares con certificado de pedigree, en
//                   cuyo registro únicamente aparecen números FCM. Es de color
//                   azul y tiene validez internacional.
//                 </p>
//                 <p>
//                   También brindamos el servicio de gestión de tramites como:
//                   Asesoría Pago de cuotas de socio usufructuario o de criadero,
//                   transferencias (cambio de propietario), Revalidaciones
//                   (reconocimiento de los pedigrees de otros países), Activación
//                   del microchip FCM en el sistema LOCA_CAN, Duplicados de
//                   registros de pedigree, genealógico o de pureza racial,
//                   Registros extemporáneos, Remarcación de tatuajes, Contamos con
//                   papelería oficial de la FCM Escaneo y Lectura de microchips
//                   etc. Cualquier otro trámite que requiera lo podrá realizar con
//                   nosotros, previa cita, la idea es minimizar el tiempo de
//                   espera.
//                 </p>
//               </Fragment>
//             }
//           />
