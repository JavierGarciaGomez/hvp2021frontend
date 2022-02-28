import React from "react";

export const MainPageHero = () => {
  return (
    <section className="hero">
      <div className="hero_content">
        <h1 className="hero_heading">Hospital Veterinario Peninsular</h1>
        <nav className="hero_socialNav">
          <a
            className="hero_socialLink"
            href="https://www.facebook.com/HospitalVeterinarioPeninsular"
            target="_blank"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            className="hero_socialLink"
            href="https://www.youtube.com/channel/UCmlztTxVkVxaNS-PdDMQmBA"
            target="_blank"
          >
            <i className="fab fa-youtube"></i>
          </a>
          <a
            className="hero_socialLink"
            href="https://www.instagram.com/hospitalveterinariopeninsular"
            target="_blank"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </nav>
        <p className="hero_slogan">
          El <span className="blue-text">especialista</span> en cuestión siempre
          es la mejor <span className="blue-text">opción</span>{" "}
        </p>
      </div>
    </section>
  );
};
