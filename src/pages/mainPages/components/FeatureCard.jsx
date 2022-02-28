import React from "react";

export const FeatureCard = ({ imgSrc, title, text }) => {
  return (
    <div className="c-card u-bgPrimaryLighter">
      <img className="feature_img" src={imgSrc} alt="" />

      <h3 className="c-card_title">{title}</h3>

      <div className="c-card_body">
        <p className="">{text}</p>
      </div>
    </div>
  );
};
