import React from "react";

export const MainPagesSectionHeader = ({ title }) => {
  return (
    <div className="section-title">
      <div className="icon-container">
        <img src="assets/imgs/mainPage/dog.png" alt="" />
      </div>
      <h2 className="title">{title}</h2>
      <div className="icon-container">
        <img src="assets/imgs/mainPage/cat.png" alt="" />
      </div>
    </div>
  );
};
