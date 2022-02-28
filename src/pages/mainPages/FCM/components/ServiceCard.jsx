import React from "react";
import { Link } from "react-router-dom";

export const ServiceCard = ({ bg, imgName, title, text, linkTo }) => {
  return (
    <div className={`serviceCard ${bg}`}>
      <div className="serviceCard_img">
        <img src={`assets/imgs/mainPage/services/${imgName}`} alt="" />
      </div>
      <div className="serviceCard_content">
        <h3 className="heading--tertiary text-center text-uppercase">
          {" "}
          {title}{" "}
        </h3>
        <p>{text}</p>
        <div className="d-flex justify-content-center">
          {linkTo && (
            <Link className="" to={linkTo}>
              <button type="button" className="c-button -light">
                Ver más
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
