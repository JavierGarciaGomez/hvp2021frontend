import React from "react";

export const MainPageHeader = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <h1>Hospital Veterinario Peninsular</h1>
        <nav className="socialNav">
          <a
            href="https://www.facebook.com/HospitalVeterinarioPeninsular"
            target="_blank"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.youtube.com/channel/UCmlztTxVkVxaNS-PdDMQmBA"
            target="_blank"
          >
            <i className="fab fa-youtube"></i>
          </a>
          <a
            href="https://www.instagram.com/hospitalveterinariopeninsular"
            target="_blank"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </nav>
        <h2>
          El <span className="blue-text">especialista</span> en cuestión siempre
          es la mejor <span className="blue-text">opción</span>{" "}
        </h2>
      </div>
    </header>
  );
};
