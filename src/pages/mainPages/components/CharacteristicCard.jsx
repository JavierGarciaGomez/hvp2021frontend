import React from "react";

export const CharacteristicCard = ({ imgSrc, title, text }) => {
  return (
    <div className="mainPages-sectionChar__characteristic bg-primary--ti-er">
      <div className="">
        <img src={imgSrc} alt="" />
      </div>
      <div>
        <h3 className="mainPages-sectionChar__char-title">{title}</h3>
      </div>
      <div>
        <p className="mainPages-sectionChar__char-text">{text}</p>
      </div>
    </div>
  );
};
