import React from "react";
import { Link, NavLink } from "react-router-dom";

export const MainPagesNavbar = () => {
  return (
    <nav className="l-navbar navbar navbar-dark navbar-expand-md fixed-top u-bgPrimaryLighter">
      <div className="container-fluid">
        <Link to="/">
          <img
            className="l-navbar_logo"
            src="assets/imgs/Logo_HVP.png"
            alt=""
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="l-navbar_menu navbar-nav me-auto mb-md-0 text-white">
            <li className="nav-item l-navbar_item">
              <NavLink
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""}`
                }
                to="/"
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item l-navbar_item">
              {/* <a class="nav-link" href="advices.html">Blog y consejos</a> */}
              <NavLink
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""}`
                }
                to="/advices"
              >
                Blog y consejos
              </NavLink>
            </li>
            <li className="nav-item l-navbar_item">
              <div className="btn-group">
                {/* <a class="nav-link" href="services.html"> */}
                <NavLink
                  className={({ isActive }) =>
                    `nav-item nav-link ${isActive ? "active" : ""}`
                  }
                  to="/services"
                >
                  Servicios
                </NavLink>
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-split"
                  href="services.html"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </a>
                <ul
                  className="dropdown-menu u-bgPrimaryLighter"
                  aria-labelledby="navbarDropdown"
                >
                  {/* <li className="mb-1r">
                    <NavLink to="/services/consultation">Consultas</NavLink>
                  </li>

                  <li className="mb-1r">
                    <NavLink to="/services/laboratory">Laboratorio</NavLink>
                  </li>
                  <li className="mb-1r">
                    <NavLink to="/services/surgery">Cirugías</NavLink>
                  </li> */}
                  <li className="mb-1r">
                    <NavLink to="/services/FCM">Pedigrí y trámites FCM</NavLink>
                  </li>
                  {/* <li className="mb-1r">
                    <NavLink to="/services/insemination">
                      Inseminación artificial
                    </NavLink>
                  </li>
                  <li className="mb-1r">
                    <NavLink to="/services/cataractSurgery">
                      Cirugía de cataratas
                    </NavLink>
                  </li> */}
                </ul>
              </div>
            </li>
            <li className="nav-item l-navbar_item">
              {/* <a class="nav-link" href="team.html">Equipo</a> */}
              <NavLink
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""}`
                }
                to="team"
              >
                Equipo
              </NavLink>
            </li>
            <li className="nav-item l-navbar_item">
              <NavLink
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""}`
                }
                to="company"
              >
                Empresa
              </NavLink>
              {/* <a class="nav-link" href="company.html">Empresa</a> */}
            </li>
            <li className="nav-item l-navbar_item">
              <NavLink
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""}`
                }
                to="contact"
              >
                Contacto
              </NavLink>
            </li>
            <li className="nav-item l-navbar_item">
              <NavLink
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""}`
                }
                to="auth"
              >
                Acceso
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
