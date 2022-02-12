import React from "react";

export const MainPagesSectionHeader = ({ title }) => {
  return (
    <div className="mainPages-section__header">
      <div className="mainPages-section__icon-container">
        <img
          className="mainPages-section__img"
          src="assets/imgs/mainPage/dog.png"
          alt=""
        />
      </div>
      <h2 className="mainPages-section__title">{title}</h2>
      <div className="mainPages-section__icon-container">
        <img
          className="mainPages-section__img"
          src="assets/imgs/mainPage/cat.png"
          alt=""
        />
      </div>
    </div>
  );
};
