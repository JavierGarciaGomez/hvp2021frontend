import React, { Fragment, useState } from "react";
import { useScript } from "../../../hooks/useScript";
import { Check } from "@mui/icons-material";
import { Link } from "@mui/material";
import { FCMLink } from "./FCMLink";
import { FCMHeader } from "./components/FCMHeader";
import { FCMLinks } from "./components/FCMLinks";
import { FCMRouter } from "../../../routes/FCMRouter";

export const FCMLayout = () => {
  const [showMenu, setshowMenu] = useState(false);

  const handleShowMenu = () => {
    setshowMenu((prevState) => !prevState);
  };

  const handleHideMenu = () => {
    setshowMenu(false);
  };
  // ionicons

  return (
    <div className="mp-FCM">
      <FCMHeader />
      <div className="mp-FCM__showMenu container">
        <button
          className=" btn btn-lg btn-success ms-auto d-block"
          onClick={handleShowMenu}
        >
          Muestra el menú
        </button>
      </div>
      {showMenu && <FCMLinks handleHideMenu={handleHideMenu} />}
      <FCMRouter />
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
