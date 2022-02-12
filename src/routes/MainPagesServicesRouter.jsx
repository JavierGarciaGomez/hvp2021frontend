import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { MainPagesNavbar } from "../pages/mainPages/components/MainPagesNavbar";
import { FCMLayout } from "../pages/mainPages/FCM/FCMLayout";
import { MainPageIndex } from "../pages/mainPages/MainPageIndex";

import { MainPagesAdvices } from "../pages/mainPages/MainPagesAdvices";
import { MainPagesServices } from "../pages/mainPages/MainPagesServices";
import { MainPagesServicesCataractSurgery } from "../pages/mainPages/services/MainPagesServicesCataractSurgery";
import { MainPagesServicesConsultation } from "../pages/mainPages/services/MainPagesServicesConsultation";
import { MainPagesServicesFCM } from "../pages/mainPages/services/MainPagesServicesFCM";
import { MainPagesServicesInsemination } from "../pages/mainPages/services/MainPagesServicesInsemination";
import { MainPagesServicesLaboratory } from "../pages/mainPages/services/MainPagesServicesLaboratory";
import { MainPagesServicesModel } from "../pages/mainPages/services/MainPagesServicesModel";
import { MainPagesServicesSurgery } from "../pages/mainPages/services/MainPagesServicesSurgery";

export const MainPageServicesRouter = () => {
  return (
    <Routes>
      <Route path="" element={<MainPagesServices />} />
      <Route
        path="consultation"
        element={
          <MainPagesServicesModel
            sectionTitle="Consultas"
            imgName="consulta.jpg"
            content={
              <Fragment>
                <p>
                  Su mascota es recibida en recepción por nuestro personal y se
                  verifica si contamos con su expediente en nuestros archivos.
                </p>
                <p>
                  Deberá seleccionar al especialista que lo atenderá; en algunas
                  ocasiones, hay que hacer una cita ya en la consulta, se
                  establecen los motivos de la visita y según sea el caso, el
                  especialista le hará preguntas que lo ayuden a orientarse en
                  el diagnóstico. Posteriormente aplicará las técnicas de
                  diagnóstico que así requiera y le explicará detalladamente
                  todo lo que acontece, así como las medidas a seguir que ayuden
                  al diagnóstico o terapéutica correspondiente.
                </p>
                <p>
                  Siempre, se le tomará el peso en kilogramos, se observará su
                  excremento al microscopio y se revisará su calendario de
                  vacunas. Deberá existir confianza y seguridad bilateral (Uds.
                  Y Nosotros), ya que como su mascota no habla, la causa de la
                  enfermedad posiblemente la encontremos en el diálogo; comparta
                  con nosotros sus inquietudes, así como sus sugerencias y
                  observaciones, nuestra filosofía de amistad busca en sus
                  clientes relaciones duraderas.
                </p>
              </Fragment>
            }
          />
        }
      />
      <Route
        path="laboratory"
        element={
          <MainPagesServicesModel
            sectionTitle="Laboratorio"
            imgName="lab.jpg"
            content={
              <Fragment>
                <h3>Rayos X</h3>
                <p>
                  Somos una clínica de referencia para la toma de Rayos X.
                  Muchos colegas solicitan nuestros servicios como apoyo a sus
                  clínicas veterinarias. Esta es una prueba de gabinete muy útil
                  que en cuestión de minutos contamos con el revelado y la placa
                  seca, lista para ayudar en el diagnóstico. Podemos ver
                  fracturas, gestaciones avanzadas, objetos en los intestinos
                  que su mascota haya ingerido, cálculos en los riñones o la
                  vejiga, así como infinidad de patologías que nos ayudan a dar
                  diagnósticos certeros.
                </p>
                <p>
                  Muchas pruebas rápidas son elaboradas en nuestras
                  instalaciones y los resultados los tenemos en minutos, para
                  así poder tomar decisiones correctas en la atención de
                  nuestros pacientes; Cuando se requieren pruebas más laboriosas
                  contamos con el apoyo de 2 grandes empresas: 1.- Laboratorios
                  Biomédicos que cuentan con varias sucursales distribuidas por
                  la ciudad, es uno de los mejores laboratorios en Mérida y 2.-
                  Carpemor con sede en el D.F. Laboratorio de Referencia
                  Internacional para Laboratorios y corren cualquier tipo de
                  prueba que no se realice incluso en el país. Como Ud. Podrá
                  apreciar hemos procurado las mejores relaciones para brindarle
                  la mejor opción en pruebas de laboratorio. Laboratorios IDEXX
                  están especializados en veternaria y nos proporcionan mchos
                  kits de diagnóstico rápido específicos para muchas de las
                  enfermedades que padecen.
                </p>
                <h3>Laboratorio</h3>
                <p>
                  Muchas pruebas rápidas son elaboradas en nuestras
                  instalaciones y los resultados los tenemos en minutos, para
                  así poder tomar decisiones correctas en la atención de
                  nuestros pacientes; Cuando se requieren pruebas más laboriosas
                  contamos con el apoyo de 2 grandes empresas: 1.- Laboratorios
                  Biomédicos que cuentan con varias sucursales distribuidas por
                  la ciudad, es uno de los mejores laboratorios en Mérida y 2.-
                  Carpemor con sede en el D.F. Laboratorio de Referencia
                  Internacional para Laboratorios y corren cualquier tipo de
                  prueba que no se realice incluso en el país. Como Ud. Podrá
                  apreciar hemos procurado las mejores relaciones para brindarle
                  la mejor opción en pruebas de laboratorio. Laboratorios IDEXX
                  están especializados en veternaria y nos proporcionan mchos
                  kits de diagnóstico rápido específicos para muchas de las
                  enfermedades que padecen.
                </p>
              </Fragment>
            }
          />
        }
      />

      <Route
        path="surgery"
        element={
          <MainPagesServicesModel
            sectionTitle="Cirugías"
            imgName="surgery.jpg"
            content={
              <Fragment>
                <p>
                  Las cirugías en la gran mayoría de los casos, no son
                  urgencias, por lo tanto, se requiere de programación y
                  preparación del paciente, así como una autorización escrita
                  por parte del propietario y los análisis de laboratorio que se
                  requieran de acuerdo al caso. Debe tener ayuno de sólidos y/o
                  líquidos un tiempo previo, el cuál se le indicará. Empleamos
                  los equipos más modernos de anestesia con oxígeno y
                  fulguración (coagulación sanguínea y corte), así como los
                  monitores electrónicos que nos indican los signos vitales de
                  nuestros pacientes durante el proceso quirúrgico. Tenga Ud. La
                  plena confianza que su mascota está en las mejores manos y que
                  tratamos de tener el nivel tecnológico y de actualización más
                  avanzado.
                </p>
                <p>
                  La áreas de especialización son: Cirugía General, Estética,
                  Reproductiva o ginecológica (Cesáreas, partos), Traumatología
                  y Ortopedia, Urológica, Oncológica y Oftalmológica, con alta
                  experiencia en cataratas con mínima invasión. Ejemplos de
                  cirugías: General: Cirugía Estética (Orejas y cola), Tumores
                  cutáneos, heridas en general, Prolapsos, Hernias, etc.
                  Reproductiva: Ovario histerectomía (Castración en hembras),
                  Orquiectomía (Castración en machos), Vasectomía, Cesáreas,
                  etc. Gastrointestinal: Obstrucción intestinal, por cuerpos
                  extraños, Gastrotomías, Enterotomías, Anastomosis
                  intestinales, Torsiones intestinales, etc. Urológica: Cálculos
                  Urinarios, Uretrostomía, Nefrectomías y Nefrotomías, etc.
                  Traumatología y Ortopedia: Reparación de Fracturas de los
                  diversos huesos del cuerpo y articulaciones. Oftalmológica:
                  Defectos en Párpados y Córnea, Cataratas con
                  Facoemulsificación (una pequeña incisión de 3 mm) con
                  microscopio oftalmológico. Etc. Odontológica: Extracción y
                  limpieza de piezas dentales con equipo ultrasónico, y mucho
                  más.
                </p>
              </Fragment>
            }
          />
        }
      />

      <Route path="FCM" element={<FCMLayout />} />
      <Route
        path="insemination"
        element={
          <MainPagesServicesModel
            sectionTitle="Inseminación artificial"
            imgName="insemin.jpg"
            content={
              <Fragment>
                <p>
                  Este servicio, ha cobrado mucha popularidad en nuestros días,
                  pues la causa más común de infertilidad se debe a problemas
                  conductuales (la hembra no se deja montar) y la Inseminación
                  es la mejor opción para corregir el problema.
                </p>

                <p>
                  Es importante partir de una consulta de la hembra a reproducir
                  para que a través de una citología se determine el momento
                  ideal para inocular el semen del reproductor, por lo general
                  el servicio de inseminación incluye 3 visitas que constan cada
                  una en:
                </p>

                <ul className="list">
                  <li>Revisión del macho y de la hembra</li>
                  <li>Citología vaginal</li>
                  <li>Recolección del semen</li>
                  <li>Espermatobioscopia (valoración del semen)</li>
                  <li>
                    Inseminación artificial (inoculación vaginal del semen)
                  </li>
                </ul>

                <p>
                  Esta técnica permite que hembras muy nerviosas y dominantes,
                  agresivas con problemas de conducta que rehúsan el
                  apareamiento logren ser cruzadas en forma artificial; también
                  en perros muy tímidos de carácter agresivo, de menor tamaño
                  que la hembra, que no pueden cruzarse, se recomienda una
                  inseminació,n. En conclusión si su mascotas no pueden tener
                  una monta natural lo mejor será realizar una INSEMINACION
                  ARTIFICIAL. El porcentaje de éxito es superior al 95% asegura
                  un número mayor de cachorros, sabemos la fecha probable de
                  parto y se controla mejor toda la gestación. Los materiales
                  usados son esterilizados y se emplea limpieza e higiene en el
                  procedimiento, pueden estar presentes el o dueños de las
                  mascotas. No pierdas nuevamente el celo de tu mascota. Nota: A
                  los sementales les encanta este tipo de visitas, ya que la
                  hembra produce feromonas (sustancias quí,micas que eliminan al
                  aire cuando están en celo) y ellos las perciben a largas
                  distancias, los tratamos con cariño y ellos siempre son
                  agradecidos.
                </p>
              </Fragment>
            }
          />
        }
      />
      <Route
        path="cataractSurgery"
        element={
          <MainPagesServicesModel
            sectionTitle="Cirugía de cataratas"
            imgName="catarata.jpg"
            content={
              <Fragment>
                <p>
                  Es una técnica moderna con equipo de alta especialidad que con
                  una incisión de 3 milímetros se extrae la catarata devolviendo
                  la vista a ejemplares que la habían perdido, se recomienda
                  valorar al paciente antes, pues existen algunas que por sus
                  características no son operables, pues reflejan otro tipo de
                  patologías; somos únicos en el sureste que ha desarrollado
                  esta implementación y se requiere de propietarios
                  comprometidos con la aplicación de gotas post-cirugía y
                  pacientes dóciles que no se rasquen en exceso y que se dejen
                  medicar, por lo general los propietarios que viven con sus
                  mascotas en el interior de la casa, son buenos candidatos a
                  este tipo de cirugías. Las cataratas se producen cuando una
                  lente que existe dentro del ojo llamada cristalino que en
                  condiciones normales es transparente se vuelve opaca. Las
                  causas pueden ser varias como un traumatismo, metabólicas pero
                  la causa más frecuente es la debida al envejecimiento de
                  nuestro perro. Es muy frecuente que veamos una opacidad de
                  color blanquecino a partir de los 7-8 años de nuestro animal
                  sobre todo cuando le incide directamente una luz como una
                  linterna.
                </p>
              </Fragment>
            }
          />
        }
      />
    </Routes>
  );
};
