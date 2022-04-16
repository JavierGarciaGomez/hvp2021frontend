import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { MainPagesSectionHeader } from "./components/MainPagesSectionHeader";
import { ServiceCard } from "./FCM/components/ServiceCard";

export const MainPagesServices = () => {
  return (
    <Fragment>
      <section className="u-bgPrimaryLightest u-pb-6r u-pt-10r">
        <div className="container">
          <MainPagesSectionHeader title="Promociones" />
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
              ></li>
              <li
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
              ></li>
              <li
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="assets/imgs/mainPage/promo/promo1.jpg"
                  className="d-block"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/imgs/mainPage/promo/promo2.jpg"
                  className="d-block"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/imgs/mainPage/promo/promo3.jpg"
                  className="d-block"
                  alt="..."
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </a>
          </div>
        </div>
      </section>

      <section className="u-bgPrimaryLighter u-pb-6r">
        <div className="container">
          <MainPagesSectionHeader title="Servicios" />

          <div className="l-flexWrapper">
            <ServiceCard
              bg="u-bgPrimaryDarker"
              imgName="consulta.jpg"
              title="Consultas"
              text="#HVP te ofrece consultas generales, de primera vez, cardiológicas, endocrinológicas, geriátricas, oncológicas, así como consultas especialistas de oftalmología veterinaria, intentando brindar los servicios con la mayor seguridad para todos mediante protocolos y puedas estar confiado que siempre velaremos por la vida y salud de tu mascota."
              
            />


            <ServiceCard
              bg="u-bgPrimaryDarkest"
              imgName="desp.jpg"
              title="Desparasitaciones"
              text="Tener a tu mascota saludable requiere de visitas periódicas con su médico para desparasitaciones internas y externas y así evitar riesgos de salud mediante esquemas convenientes para tu querida mascota según su edad y hábitos, puedes acudir a cualquiera de nuestras sucursales para este servicio #HVPURBAN #HVPHARBOR #HVPMONTEJO"
              linkTo={null}
            />

            <ServiceCard
              bg="u-bgPrimaryDarkest"
              imgName="vaccine.jpg"
              title="Vacunas"
              text="Todas las mascotas tienen un ejército que los defiende de enfermedades contagiosas, pero debe ser enterando para poder combatirlas, estamos hablando de su sistema inmune y su entrenamiento son las vacunas, en #HVP te ofrecemos este servicio dando un esquema de vacunación personalizado para que tu mascota libre más batallas. Te esperamos en las sucursales #HVPURBAN #HVP HARBOR Y #HVPMONTEJO para brindarte nuestros servicios, ¡agenda ya!"
              linkTo={null}
            />

            <ServiceCard
              bg="u-bgPrimaryDarker"
              imgName="profilax.jpg"
              title=" Profilaxis dental"
              text="La limpieza de la cavidad oral de tu mascotita es importante para la salud integral de ella, procura la limpieza cotidiana pero también evita afecciones que pueden afectar más allá de su boquita, agenda la valoración para el procedimiento y resuelve toda duda."
              linkTo={null}
            />
            <ServiceCard
              bg="u-bgPrimaryDarker"
              imgName="lab.jpg"
              title="Estudios de laboratorio"
              text="Somos un hospital comprometido con el diagnóstico certero por lo cual buscamos todas las posibilidades para llegar a este, realizando estudios de laboratorio como hemogramas, químicas sanguíneas, uroanálisis, coprológicos entre otras pruebas que nos permiten ofrecer el servicio de calidad que deseas en tu sucursal favorita #HVPURBAN #HVPHARBOR."

            />
                        <ServiceCard
              bg="u-bgPrimaryDarkest"
              imgName="gabinete.jpg"
              title="Pruebas de gabinete"
              text="Dentro de las herramientas de diagnóstico encontramos las de gabinete como los rayos x, electrocardiogramas, ecocardiogramas, ecografías y más por lo que nos hemos esforzado para brindar este servicio de forma confiable en nuestras instalaciones por parte de especialistas y técnicos externos que llegan hasta nuestras sucursales de #HVPURBAN y #HVPHARBOR para poder ofrecer un servicio confiable e integral con lo cual tu mascota estará en buenas manos."

            />


                        <ServiceCard
              bg="u-bgPrimaryDarkest"
              imgName="tonom.jpg"
              title="Tonometría"
              text="La tonometría es la medición de la presión intraocular que nos permite diagnosticar enfermedades que suelen afectar la visión de tu mascota, este servicio se les ofrece en consulta oftalmológica y a los colegas veterinarios que requieran el servicio para sus pacientes, realiza tu cita en la sucursal #HVPURBAN."

            />

            <ServiceCard
              bg="u-bgPrimaryDarker"
              imgName="surgery.jpg"
              title="Cirugía"
              text="Con gran profesionalidad y ética podremos realizar cirugía
              mayores y menores, contamos con un quirófano plenamente
              equipado y las anestesias son mediante oxígeno, con lo que se
              obtienen mejores resultados."
              
            />

            <ServiceCard
              bg="u-bgPrimaryDarker"
              imgName="pedig.jpg"
              title="Trámites FCM"
              text="Somos inspectores oficiales de la Federación Canófila Mexicana
              desde 1996, realizando trámites como el pedigrí, el
              certificado de pureza racial así como certificados para
              concursos y registro de socios."
              linkTo="fcm"
            />

            <ServiceCard
              bg="u-bgPrimaryDarkest"
              imgName="esteril.jpg"
              title="Esterilizaciones"
              text="La esterilización, más allá de prevenir la reproducción de
              nuestras mascotas, pues se previene que puedan contraer
              enfermedades como es el cáncer de mama, de matriz, de próstata
              y de testículos; así como la piometra; y en muchos casos se
              mejora el comportamiento de los machos."
              linkTo={null}
            />

            <ServiceCard
              bg="u-bgPrimaryDarkest"
              imgName="insemin.jpg"
              title="Inseminación artificial"
              text="Este servicio, ha cobrado mucha popularidad en nuestros días,
              pues la causa más común de infertilidad se debe a problemas
              conductuales (la hembra no se deja montar) y la Inseminación
              es la mejor opción para corregir el problema."
              
            />

            <ServiceCard
              bg="u-bgPrimaryDarker"
              imgName="certificate.jpg"
              title=" Certificados de salud para viajes"
              text="Los certificados de salud son testimonios escritos expedidos
              por un profesional en la que se constatan hechos relacionados
              con la salud de las mascotas. En muchos casos estos documentos
              son requeridos por las autoridades para permitir a estas
              realizar un viaje."
              linkTo={null}
            />



            <ServiceCard
              bg="u-bgPrimaryDarker"
              imgName="catarata.jpg"
              title="Cirugía de cataratas"
              text="Contamos con equipamiento de vanguardia y personal altamente capacitado para realizar la resolución de cataratas por mínima innovación siendo reconocidos en el sureste mexicano por la especialidad de oftalmología veterinaria, agenda tu consulta donde te informaremos completamente y te daremos el protocolo para regresarle a tu mascotita la calidad de vida que merece."
              
            />
            
            <ServiceCard
              bg="u-bgPrimaryDarkest"
              imgName="microchip.jpg"
              title="Microchip internacional"
              text="En muchos países es obligatorio que los perros cuenten con un
              microchip, lo que sirve para identificarlos. Los microchips
              contienen información importante sobre la mascota, en
              particular la relacionada con el dueño para poder contactarla
              en caso de extravío o accidente."
              linkTo={null}
            />

<ServiceCard
              bg="u-bgPrimaryDarker"
              imgName="vetPlans.jpg"
              title="Planes de medicina preventiva"
              text="La salud de tu mascota proviene de los cuidados diarios en tiempo y espacio, pero también en la prevención de enfermedades, en #HVP te ofrecemos planes de medicina preventiva adaptado a la edad de tu mascota, que incluyen consultas generales, vacunas, desparasitaciones, análisis de laboratorio, pruebas de gabinete y más. ¡Pregunta por ellos!"
              
            />
          </div>
        </div>
      </section>

      <section className="u-bgPrimaryLightest u-pb-6r">
        <div className="container">
          <MainPagesSectionHeader title="Paquetes" />
          <div
            id="carouselExampleIndicators2"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-bs-target="#carouselExampleIndicators2"
                data-bs-slide-to="0"
                className="active"
              ></li>
              <li
                data-bs-target="#carouselExampleIndicators2"
                data-bs-slide-to="1"
              ></li>
              <li
                data-bs-target="#carouselExampleIndicators2"
                data-bs-slide-to="2"
              ></li>
              <li
                data-bs-target="#carouselExampleIndicators2"
                data-bs-slide-to="3"
              ></li>
              <li
                data-bs-target="#carouselExampleIndicators2"
                data-bs-slide-to="4"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="assets/imgs/mainPage/packs/checkup1.png"
                  className="d-block"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/imgs/mainPage/packs/checkup2.png"
                  className="d-block"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/imgs/mainPage/packs/checkup3.png"
                  className="d-block"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/imgs/mainPage/packs/checkup4.png"
                  className="d-block"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/imgs/mainPage/packs/checkup5.png"
                  className="d-block"
                  alt="..."
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators2"
              role="button"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators2"
              role="button"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </a>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
