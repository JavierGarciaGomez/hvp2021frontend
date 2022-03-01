import React, { Fragment } from "react";
import { MainPagesSectionHeader } from "./components/MainPagesSectionHeader";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const position = [21.019557, -89.613934];
export const MainPagesContact = () => {
  return (
    <Fragment>
      <section className="u-bgPrimaryLightest u-pb-6r u-pt-10r">
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
