import React, { Fragment } from "react";
import { MainPagesSectionHeader } from "../../../components/mainPageComponents/MainPagesSectionHeader";
import { useScript } from "../../../hooks/useScript";
import { MainPageHeader } from "./MainPageHeader";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const position = [21.019557, -89.613934];

export const MainPageIndex = () => {
  return (
    <Fragment>
      <MainPageHeader />

      <div className="container">
        <section className="characteristics-section">
          <MainPagesSectionHeader title="Lo que nos distingue" />
          <div className="characteristics">
            <div className="characteristic">
              <div className="char-img">
                <img src="assets/imgs/mainPage/char-personal.png" alt="" />
              </div>
              <div className="char-title">
                <h3>Personalizado</h3>
              </div>
              <div className="char-text">
                <p>
                  El seguimiento que damos cada uno de nuestros pacientes es
                  personalizado y acorde con sus necesidades.
                </p>
              </div>
            </div>
            <div className="characteristic">
              <div className="char-img">
                <img src="assets/imgs/mainPage/char-experience.png" alt="" />
              </div>
              <div className="char-title">
                <h3>Experiencia</h3>
              </div>
              <div className="char-text">
                <p>
                  Tenemos 30 años de experiencia en veterinaria, por lo que
                  somos un referente en Mérida y en todo el sureste.
                </p>
              </div>
            </div>
            <div className="characteristic">
              <div className="char-img">
                <img src="assets/imgs/mainPage/char-specialist.png" alt="" />
              </div>
              <div className="char-title">
                <h3>Especialidad</h3>
              </div>
              <div className="char-text">
                <p>
                  Nuestros médicos son especializados en oftalmología y
                  prestamos servicios relacionados en otras especialidades.
                </p>
              </div>
            </div>
            <div className="characteristic">
              <div className="char-img">
                <img src="assets/imgs/mainPage/char-coverage.png" alt="" />
              </div>
              <div className="char-title">
                <h3>Cobertura</h3>
              </div>
              <div className="char-text">
                <p>
                  Contamos con tres sucursales, todas en las tiendas Petco en la
                  ciudad de Mérida.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mainPages__container__style2">
        <div className="container py-1">
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

      <div className="container">
        <section>
          <MainPagesSectionHeader title="Quiénes somos" />

          <div className="collaborators">
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/RGL.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  Rafael García{" "}
                  <span className="position">Director médico</span>
                </p>
              </div>
            </div>
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/ADG.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  Adriana García{" "}
                  <span className="position">Directora admninistrativa</span>
                </p>
              </div>
            </div>
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/AAA.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  Adrián Aguilar <span className="position">Gerente</span>
                </p>
              </div>
            </div>
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/NDC.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  Néstor Delgado <span className="position">Veterinario</span>
                </p>
              </div>
            </div>
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/MAT.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  Lulú Avendaño <span className="position">Veterinaria</span>
                </p>
              </div>
            </div>
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/LFP.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  Anahí Fuentes <span className="position">Veterinaria</span>
                </p>
              </div>
            </div>
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/JLP.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  José Luis López <span className="position">Veterinaria</span>
                </p>
              </div>
            </div>
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/IFP.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  Larissa Franco <span className="position">Asistente</span>
                </p>
              </div>
            </div>
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/ANV.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  Andrés Nah <span className="position">Asistente</span>
                </p>
              </div>
            </div>
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/SDI.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  Saraí Delgado <span className="position">Asistente</span>
                </p>
              </div>
            </div>
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/SCP.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  Silvia Colmenares{" "}
                  <span className="position">Recepcionista</span>
                </p>
              </div>
            </div>
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/ACB.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  Atziri Caamal <span className="position">Recepcionista</span>
                </p>
              </div>
            </div>
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/OMH.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  Óscar Moo <span className="position">Recepcionista</span>
                </p>
              </div>
            </div>
            <div className="collaborator">
              <img
                src="assets/imgs/mainPage/collaborators/FDC.png"
                alt="colaborador"
              />
              <div className="coll-name">
                <p>
                  Felipe Dávalos <span className="position">Recepcionista</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mainPages__container__style2">
        <div className="container">
          <section>
            <MainPagesSectionHeader title="Servicios" />

            <div className="services">
              <div className="service">
                <img src="assets/imgs/mainPage/services/consulta.jpg" alt="" />
                <p>Consultas</p>
              </div>
              <div className="service">
                <img src="assets/imgs/mainPage/services/vaccine.jpg" alt="" />
                <p>Vacunas</p>
              </div>
              <div className="service">
                <img src="assets/imgs/mainPage/services/desp.jpg" alt="" />
                <p>Desparasitaciones</p>
              </div>
              <div className="service">
                <img src="assets/imgs/mainPage/services/lab.jpg" alt="" />
                <p>Laboratorio</p>
              </div>
              <div className="service">
                <img src="assets/imgs/mainPage/services/surgery.jpg" alt="" />
                <p>Cirugía</p>
              </div>
              <div className="service">
                <img src="assets/imgs/mainPage/services/pedig.jpg" alt="" />
                <p>Pedigrí</p>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <a href="services.html">
                <button type="button" className="btn btn-lg btn-primaryBG">
                  Conozca más
                </button>
              </a>
            </div>
          </section>
        </div>
      </div>

      <div className="container">
        <section>
          <div className="section-title">
            <div className="icon-container">
              <img src="assets/imgs/mainPage/dog.png" alt="" />
            </div>
            <h2 className="title">Contacto</h2>
            <div className="icon-container">
              <img src="assets/imgs/mainPage/cat.png" alt="" />
            </div>
          </div>
        </section>
      </div>

      <div className="container">
        <div id="mapa">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[21.019557, -89.595265]}>
              <Popup>Sucursal Urban</Popup>
            </Marker>
            <Marker position={[21.002827, -89.614862]}>
              <Popup>Sucursal Montejo</Popup>
            </Marker>
            <Marker position={[21.046215, -89.630306]}>
              <Popup>Sucursal The Harbor</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="branches">
          <div className="branch">
            <h3>Urban</h3>
            <p>
              <i className="fas fa-phone"></i> 999 406 9174
            </p>
            <p>
              {" "}
              <i className="fab fa-whatsapp-square"></i> 999 510 1404
            </p>
            <p>
              <i className="fas fa-thumbtack"></i> Av. Cámara de Comercio 215,
              Monterreal
            </p>
          </div>
          <div className="branch">
            <h3>The Harbor</h3>
            <p>
              <i className="fas fa-phone"></i> 999 925 0015
            </p>
            <p>
              <i className="fas fa-thumbtack"></i> Calle 60 261, Zona Industrial
            </p>
          </div>
          <div className="branch">
            <h3>Montejo</h3>
            <p>
              <i className="fas fa-phone"></i> 999 400 7974
            </p>
            <p>
              <i className="fas fa-thumbtack"></i> Prol. Paseo Montejo 99,
              Campestre
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
