import React from "react";
import { useNavigate } from "react-router-dom";
import { MainPagesSectionHeader } from "../../../components/mainPageComponents/MainPagesSectionHeader";

export const MainPagesServicesModel = ({ sectionTitle, imgName, content }) => {
  const navigate = useNavigate();
  return (
    <div className="light-background">
      <div className="container">
        <section>
          <MainPagesSectionHeader title={sectionTitle} />

          <div className="service-only-container">
            <div className="service-only-image">
              <img src={`assets/imgs/mainPage/services/${imgName}`} alt="" />
            </div>
            <div className="service-only-text">{content}</div>
          </div>
          <div className="return-div">
            <button
              type="button"
              className="btn btn-lg btn-primaryBG"
              onClick={() => navigate(-1)}
            >
              ◀ Regresar
            </button>{" "}
          </div>
        </section>
      </div>
    </div>
  );
};
