import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./mainPagesNavbar.css";

export const MainPagesNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="assets/imgs/Logo_HVP.png" alt="" />
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
          <div className="navbar-nav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-item nav-link ${isActive ? "active" : ""}`
                  }
                  to="/"
                >
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
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
              <li className="nav-item dropdown">
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
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink to="/services/consultation">Consultas</NavLink>
                    </li>

                    <li>
                      <NavLink to="/services/laboratory">Laboratorio</NavLink>
                    </li>
                    <li>
                      <NavLink to="/services/surgery">Cirugías</NavLink>
                    </li>
                    <li>
                      <NavLink to="/services/FCM">
                        Registro de camadas FCM
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/services/insemination">
                        Inseminación artificial
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/services/cataractSurgery">
                        Cirugía de cataratas
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
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
              <li className="nav-item">
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
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-item nav-link ${isActive ? "active" : ""}`
                  }
                  to="contact"
                >
                  Contacto
                </NavLink>
              </li>
              <li className="nav-item">
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
      </div>
    </nav>
  );
};
