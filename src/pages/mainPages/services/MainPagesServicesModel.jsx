import React from "react";
import { useNavigate } from "react-router-dom";
import { MainPagesSectionHeader } from "../components/MainPagesSectionHeader";

export const MainPagesServicesModel = ({ sectionTitle, imgName, content }) => {
  const navigate = useNavigate();
  return (
    <section className="u-pb-6r u-pt-10r">
      <div className="container">
        <MainPagesSectionHeader title={sectionTitle} />

        <div className="servicePage">
          <div className="servicePage_imgContainer">
            <img
              className="servicePage_img"
              src={`assets/imgs/mainPage/services/${imgName}`}
              alt=""
            />
          </div>
          <div className="service-only-text">{content}</div>
        </div>
        <div className="return-div">
          <button
            type="button"
            className="c-button -large"
            onClick={() => navigate(-1)}
          >
            ◀ Regresar
          </button>{" "}
        </div>
      </div>
    </section>
  );
};
