import React, { Fragment, useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";

import "leaflet/dist/leaflet.css";

import { Link } from "react-router-dom";
import { MainPageHero } from "./components/MainPageHero";

import { collaboratorsStartLoading } from "../../actions/collaboratorActions";
import { sortCollection } from "../../helpers/utilities";
import { FeatureCard } from "./components/FeatureCard";
import { MainPagesSectionHeader } from "./components/MainPagesSectionHeader";

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const position = [21.019557, -89.613934];

export const MainPageIndex = () => {
  const dispatch = useDispatch();
  const { collaborators, isLoading } = useSelector(
    (state) => state.collaborator
  );
  const [sortedCollaborators, setsortedCollaborators] = useState([]);

  useEffect(() => {
    dispatch(collaboratorsStartLoading(true));
  }, [dispatch]);

  useEffect(() => {
    if (collaborators.length > 0) {
      setsortedCollaborators(sortCollection(collaborators));
    }
  }, [collaborators]);

  return (
    <Fragment>
      <MainPageHero />
      {/* HERO */}

      <section className="sectionFeatures u-bgPrimaryLightest u-pb-6r">
        <div className="container">
          <MainPagesSectionHeader title="Lo que nos distingue" />
          <div className="featuresContainer">
            <FeatureCard
              imgSrc="assets/imgs/mainPage/char-personal.png"
              title="Personalizado"
              text="El seguimiento que damos cada uno de nuestros pacientes es personalizado y acorde con sus necesidades."
            />
            <FeatureCard
              imgSrc="assets/imgs/mainPage/char-experience.png"
              title="Experiencia"
              text="Tenemos 30 años de experiencia en veterinaria, por lo que
                  somos un referente en Mérida y en todo el sureste."
            />
            <FeatureCard
              imgSrc="assets/imgs/mainPage/char-specialist.png"
              title="Especialidad"
              text="Nuestros médicos son especializados en oftalmología y
              prestamos servicios relacionados en otras especialidades."
            />
            <FeatureCard
              imgSrc="assets/imgs/mainPage/char-coverage.png"
              title="Cobertura"
              text="Contamos con tres sucursales, todas en las tiendas Petco en la
              ciudad de Mérida."
            />
          </div>
        </div>
      </section>

      <section className="u-bgPrimaryLighter u-pb-6r">
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

      <section className="u-bgPrimaryLightest u-pb-6r">
        <div className="container">
          <MainPagesSectionHeader title="Quiénes somos" />

          <div className="collaboratorCardsWrapper">
            {isLoading ? (
              <CircularProgress />
            ) : (
              sortedCollaborators.map((collaborator) => {
                return (
                  <div className="collaboratorCard" key={collaborator._id}>
                    <img
                      className="collaboratorCard_img"
                      src={collaborator.imgUrl}
                      alt="colaborador"
                    />
                    <div className="coll-name">
                      <p className="collaboratorCard_text">
                        {`${collaborator.first_name} ${collaborator.last_name} `}
                        <span className="collaboratorCard_position">
                          {collaborator.position}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="u-bgPrimaryLighter u-pb-6r">
        <div className="container">
          <MainPagesSectionHeader title="Servicios" />

          <div className="serviceImgCardWrapper">
            <div className="serviceImgCard">
              <img src="assets/imgs/mainPage/services/consulta.jpg" alt="" />
              <p className="serviceImgCard_text">Consultas</p>
            </div>
            <div className="serviceImgCard">
              <img src="assets/imgs/mainPage/services/vaccine.jpg" alt="" />
              <p className="serviceImgCard_text">Vacunas</p>
            </div>
            <div className="serviceImgCard">
              <img
                className="serviceImgCard_img"
                src="assets/imgs/mainPage/services/desp.jpg"
                alt=""
              />
              <p className="serviceImgCard_text">Desparasitaciones</p>
            </div>
            <div className="serviceImgCard">
              <img src="assets/imgs/mainPage/services/lab.jpg" alt="" />
              <p className="serviceImgCard_text">Laboratorio</p>
            </div>
            <div className="serviceImgCard">
              <img src="assets/imgs/mainPage/services/surgery.jpg" alt="" />
              <p className="serviceImgCard_text">Cirugía</p>
            </div>
            <div className="serviceImgCard">
              <img src="assets/imgs/mainPage/services/pedig.jpg" alt="" />
              <p className="serviceImgCard_text">Pedigrí</p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Link className="" to="/services">
              <button type="button" className="c-button -large">
                Conozca más
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="u-bgPrimaryLightest u-pb-6r">
        <div className="container">
          <MainPagesSectionHeader title="Contacto" />
          <div>
            {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer> */}
            <div className="mb-5">
              <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                className="mb-5"
              >
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
                {/* <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}
              </MapContainer>
            </div>
          </div>
          <div className="branchesWrapper">
            <div className="branchCard c-card u-bgPrimaryLighter u-textWhite">
              <p className="branchCard c-card_title">Urban</p>
              <p>
                <i className="branchCard_icon fas fa-phone"></i> 999 406 9174
              </p>
              <p>
                {" "}
                <i className="branchCard_icon fab fa-whatsapp-square"></i> 999
                510 1404
              </p>
              <p>
                <i className="branchCard_icon fas fa-thumbtack"></i> Av. Cámara
                de Comercio 215, Monterreal
              </p>
            </div>
            <div className="branchCard c-card u-bgPrimaryLighter u-textWhite">
              <p className="branchCard c-card_title">Harbor</p>
              <p>
                <i className="branchCard_icon fas fa-phone"></i> 999 925 0015
              </p>
              <p>
                <i className="branchCard_icon fas fa-thumbtack"></i> Calle 60
                261, Zona Industrial
              </p>
            </div>
            <div className="branchCard c-card u-bgPrimaryLighter u-textWhite">
              <p className="branchCard c-card_title">Montejo</p>
              <p>
                <i className="branchCard_icon fas fa-phone"></i> 999 400 7974
              </p>
              <p>
                <i className="branchCard_icon fas fa-thumbtack"></i> Prol. Paseo
                Montejo 99, Campestre
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
