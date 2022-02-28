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
              text="Nuestra especialidad es la medicina canina y la felina, pero también
          podemos atender a las mascotas exóticas. Nuestro propósito es
          esforzarnos para que tanto las mascotas se encuentren saludables y los
          propietarios tránquilos."
              linkTo="consultation"
            />
            <ServiceCard
              bg="u-bgPrimaryDarkest"
              imgName="vaccine.jpg"
              title="Vacunas"
              text="El plan de vacunación de las mascotas es de vital importancia
              pues con este se genera la inmunidad frente a enfermedades
              recurrentes que pueden causar estragos en su salud."
              linkTo={null}
            />

            <ServiceCard
              bg="u-bgPrimaryDarkest"
              imgName="desp.jpg"
              title="Desparasitaciones"
              text="Las desparasitaciones pueden ser internas o externas, y en
              ambos casos es importante aplicarlas cotidianamente, para
              prevenir que los parásitos causen daños mayores al organismo
              de nuestras mascotas."
              linkTo={null}
            />

            <ServiceCard
              bg="u-bgPrimaryDarker"
              imgName="lab.jpg"
              title="Laboratorio"
              text="Para servicios de diagnóstico clínico contamos con pruebas de
              laboratorio, biometrías hemáticas, químicas sanguíneas,
              coprológicos, histopatologías y pruebas de gabinete como rayos
              X, ultrasonido, ecocardiogramas, electrocardiogramas, etc.,
              para un diagnóstico y pronostico certero."
              linkTo="laboratory"
            />

            <ServiceCard
              bg="u-bgPrimaryDarker"
              imgName="surgery.jpg"
              title="Cirugía"
              text="Con gran profesionalidad y ética podremos realizar cirugía
              mayores y menores, contamos con un quirófano plenamente
              equipado y las anestesias son mediante oxígeno, con lo que se
              obtienen mejores resultados."
              linkTo="surgery"
            />

            <ServiceCard
              bg="u-bgPrimaryDarkest"
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
              bg="u-bgPrimaryDarker"
              imgName="insemin.jpg"
              title="Inseminación artificial"
              text="Este servicio, ha cobrado mucha popularidad en nuestros días,
              pues la causa más común de infertilidad se debe a problemas
              conductuales (la hembra no se deja montar) y la Inseminación
              es la mejor opción para corregir el problema."
              linkTo="insemination"
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
              bg="u-bgPrimaryDarkest"
              imgName="profilax.jpg"
              title=" Profilaxis dental"
              text="La profilaxis es una intervención para la limpieza dental de
              las mascotas que ayuda a desprender el sarro y la placa
              bacteriana, con lo que se previenen diversas enfermedades,
              incluso aquellas relacionadas con el corazón."
              linkTo={null}
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
              imgName="catarata.jpg"
              title="Cirugía de cataratas"
              text="Somos un referente en el sureste mexicano en oftalmología y en
              cirugía de cataras, debido a que contamos con equipamiento de
              vanguardia y profesionales en esta área médica."
              linkTo="cataractSurgery"
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
