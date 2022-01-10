import React, { Fragment } from "react";
import { MainPagesSectionHeader } from "../../components/mainPageComponents/MainPagesSectionHeader";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const position = [21.019557, -89.613934];
export const MainPagesContact = () => {
  return (
    <Fragment>
      <div className="light-background">
        <div className="container">
          <section>
            <MainPagesSectionHeader title="Contacto" />
          </section>
        </div>

        <div className="container">
          <div>
            <div id="mapa">
              <div id="mapa">
                <MapContainer
                  center={position}
                  zoom={13}
                  scrollWheelZoom={false}
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
                </MapContainer>
              </div>
            </div>
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
                <i className="fas fa-thumbtack"></i> Calle 60 261, Zona
                Industrial
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
      </div>
    </Fragment>
  );
};
