import React from "react";

export const MainPageHero = () => {
  return (
    <section className="mainPages-hero">
      <div className="mainPages-hero--content">
        <h1 className="mainPages-hero--heading">
          Hospital Veterinario Peninsular
        </h1>
        <nav className="mainPages-hero--socialNav">
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
        <p>
          El <span className="blue-text">especialista</span> en cuestión siempre
          es la mejor <span className="blue-text">opción</span>{" "}
        </p>
      </div>
    </section>
  );
};
