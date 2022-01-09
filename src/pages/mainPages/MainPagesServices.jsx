import React, { Fragment } from "react";
import { MainPagesSectionHeader } from "../../components/mainPageComponents/MainPagesSectionHeader";

export const MainPagesServices = () => {
  return (
    <Fragment>
      <div className="mainPages__container__style2">
        <div className="container">
          <section>
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
          </section>
        </div>
      </div>

      <div className="light-background">
        <div className="container services-page">
          <section>
            <MainPagesSectionHeader title="Servicios" />

            <div className="service-list">
              <div className="service-item primary">
                <div className="service-image">
                  <img
                    src="assets/imgs/mainPage/services/consulta.jpg"
                    alt=""
                  />
                </div>
                <div className="service-content">
                  <h3> Consultas </h3>
                  <p>
                    Nuestra especialidad es la medicina canina y la felina, pero
                    también podemos atender a las mascotas exóticas. Nuestro
                    propósito es esforzarnos para que tanto las mascotas se
                    encuentren saludables y los propietarios tránquilos.
                  </p>
                  <div className="d-flex justify-content-center">
                    <a href="consultas.html">
                      <button
                        type="button"
                        className="btn btn-sm btn-primaryBG"
                      >
                        Ver más
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="service-item secondary">
                <div className="service-image">
                  <img src="assets/imgs/mainPage/services/vaccine.jpg" alt="" />
                </div>
                <div className="service-content">
                  <h3> Vacunas </h3>
                  <p>
                    El plan de vacunación de las mascotas es de vital
                    importancia pues con este se genera la inmunidad frente a
                    enfermedades recurrentes que pueden causar estragos en su
                    salud.
                  </p>
                </div>
              </div>

              <div className="service-item secondary">
                <div className="service-image">
                  <img src="assets/imgs/mainPage/services/desp.jpg" alt="" />
                </div>
                <div className="service-content">
                  <h3> Desparasitaciones </h3>
                  <p>
                    Las desparasitaciones pueden ser internas o externas, y en
                    ambos casos es importante aplicarlas cotidianamente, para
                    prevenir que los parásitos causen daños mayores al organismo
                    de nuestras mascotas.
                  </p>
                </div>
              </div>

              <div className="service-item primary">
                <div className="service-image">
                  <img src="assets/imgs/mainPage/services/lab.jpg" alt="" />
                </div>
                <div className="service-content">
                  <h3> Laboratorio </h3>
                  <p>
                    Para servicios de diagnóstico clínico contamos con pruebas
                    de laboratorio, biometrías hemáticas, químicas sanguíneas,
                    coprológicos, histopatologías y pruebas de gabinete como
                    rayos X, ultrasonido, ecocardiogramas, electrocardiogramas,
                    etc., para un diagnóstico y pronostico certero.
                  </p>
                  <div className="d-flex justify-content-center">
                    <a href="laboratorio.html">
                      <button
                        type="button"
                        className="btn btn-sm btn-primaryBG"
                      >
                        Ver más
                      </button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="service-item primary">
                <div className="service-image">
                  <img src="assets/imgs/mainPage/services/surgery.jpg" alt="" />
                </div>
                <div className="service-content">
                  <h3> Cirugía </h3>
                  <p>
                    Con gran profesionalidad y ética podremos realizar cirugía
                    mayores y menores, contamos con un quirófano plenamente
                    equipado y las anestesias son mediante oxígeno, con lo que
                    se obtienen mejores resultados.
                  </p>
                  <div className="d-flex justify-content-center">
                    <a href="cirugias.html">
                      <button
                        type="button"
                        className="btn btn-sm btn-primaryBG"
                      >
                        Ver más
                      </button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="service-item secondary">
                <div className="service-image">
                  <img src="assets/imgs/mainPage/services/pedig.jpg" alt="" />
                </div>
                <div className="service-content">
                  <h3> Registro de Camadas FCM </h3>
                  <p>
                    Somos inspectores oficiales de la Federación Canófila
                    Mexicana desde 1996, realizando trámites como el pedigrí, el
                    certificado de pureza racial así como certificados para
                    concursos y registro de socios.
                  </p>
                  <div className="d-flex justify-content-center">
                    <a href="pedig.html">
                      <button
                        type="button"
                        className="btn btn-sm btn-secondaryBG"
                      >
                        Ver más
                      </button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="service-item secondary">
                <div className="service-image">
                  <img src="assets/imgs/mainPage/services/esteril.jpg" alt="" />
                </div>
                <div className="service-content">
                  <h3> Esterilizaciones </h3>
                  <p>
                    La esterilización, más allá de prevenir la reproducción de
                    nuestras mascotas, pues se previene que puedan contraer
                    enfermedades como es el cáncer de mama, de matriz, de
                    próstata y de testículos; así como la piometra; y en muchos
                    casos se mejora el comportamiento de los machos.
                  </p>
                </div>
              </div>

              <div className="service-item primary">
                <div className="service-image">
                  <img src="assets/imgs/mainPage/services/insemin.jpg" alt="" />
                </div>
                <div className="service-content">
                  <h3> Inseminación artificial </h3>
                  <p>
                    Este servicio, ha cobrado mucha popularidad en nuestros
                    días, pues la causa más común de infertilidad se debe a
                    problemas conductuales (la hembra no se deja montar) y la
                    Inseminación es la mejor opción para corregir el problema.
                  </p>
                  <div className="d-flex justify-content-center">
                    <a href="insemin.html">
                      <button
                        type="button"
                        className="btn btn-sm btn-primaryBG"
                      >
                        Ver más
                      </button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="service-item primary">
                <div className="service-image">
                  <img
                    src="assets/imgs/mainPage/services/certificate.jpg"
                    alt=""
                  />
                </div>
                <div className="service-content">
                  <h3> Certificados de salud para viajes </h3>
                  <p>
                    Los certificados de salud son testimonios escritos expedidos
                    por un profesional en la que se constatan hechos
                    relacionados con la salud de las mascotas. En muchos casos
                    estos documentos son requeridos por las autoridades para
                    permitir a estas realizar un viaje.
                  </p>
                </div>
              </div>

              <div className="service-item secondary">
                <div className="service-image">
                  <img
                    src="assets/imgs/mainPage/services/profilax.jpg"
                    alt=""
                  />
                </div>
                <div className="service-content">
                  <h3> Profilaxis dental </h3>
                  <p>
                    La profilaxis es una intervención para la limpieza dental de
                    las mascotas que ayuda a desprender el sarro y la placa
                    bacteriana, con lo que se previenen diversas enfermedades,
                    incluso aquellas relacionadas con el corazón.
                  </p>
                </div>
              </div>

              <div className="service-item secondary">
                <div className="service-image">
                  <img
                    src="assets/imgs/mainPage/services/microchip.jpg"
                    alt=""
                  />
                </div>
                <div className="service-content">
                  <h3> Microchip internacional </h3>
                  <p>
                    En muchos países es obligatorio que los perros cuenten con
                    un microchip, lo que sirve para identificarlos. Los
                    microchips contienen información importante sobre la
                    mascota, en particular la relacionada con el dueño para
                    poder contactarla en caso de extravío o accidente.
                  </p>
                </div>
              </div>

              <div className="service-item primary">
                <div className="service-image">
                  <img
                    src="assets/imgs/mainPage/services/catarata.jpg"
                    alt=""
                  />
                </div>
                <div className="service-content">
                  <h3> Cirugía de cataratas </h3>
                  <p>
                    Somos un referente en el sureste mexicano en oftalmología y
                    en cirugía de cataras, debido a que contamos con
                    equipamiento de vanguardia y profesionales en esta área
                    médica.
                  </p>
                  <div className="d-flex justify-content-center">
                    <a href="cataratas.html">
                      <button
                        type="button"
                        className="btn btn-sm btn-primaryBG"
                      >
                        Ver más
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mainPages__container__style2">
        <div className="container">
          <section>
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
          </section>
        </div>
      </div>
    </Fragment>
  );
};
