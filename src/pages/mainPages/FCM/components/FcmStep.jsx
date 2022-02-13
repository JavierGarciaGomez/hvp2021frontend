import React from "react";

export const FcmStep = ({ num, imgSrc, title, desc, reverse = false }) => {
  return (
    <div className={`mp-FCM__step ${reverse ? "flex-row-reverse" : ""}`}>
      <p className="mp-FCM__step-number">{num}</p>

      <div className="mp-FCM__step-text-box">
        <h3 className="mp-FCM__heading-tertiary">{title}</h3>
        <p className="mp-FCM__step-description">{desc}</p>
      </div>
      <div className="mp-FCM__step-img-box">
        <img
          src={`assets/imgs/mainPage/FCM/${imgSrc}`}
          className="mp-FCM__step-img"
          alt={title}
        />
      </div>
    </div>
  );
};
