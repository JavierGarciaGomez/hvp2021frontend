import React from "react";

export const MainPagesSectionHeader = ({ title }) => {
  return (
    <div className="c-sectionHeader">
      <div className="c-sectionHeader_iconContainer">
        <img
          className="c-sectionHeader_img"
          src="assets/imgs/mainPage/dog.png"
          alt=""
        />
      </div>
      <h2 className="c-sectionHeader_title">{title}</h2>
      <div className="c-sectionHeader_iconContainer">
        <img
          className="c-sectionHeader_img"
          src="assets/imgs/mainPage/cat.png"
          alt=""
        />
      </div>
    </div>
  );
};
