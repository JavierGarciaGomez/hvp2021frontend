import React from "react";

export const FcmStep = ({ num, imgSrc, title, desc, reverse = false }) => {
  return (
    <div className={`fcmStep ${reverse ? "flex-row-reverse" : ""}`}>
      <p className="fcmStep_number">{num}</p>

      <div className="fcmStep_textBox">
        <h3 className="heading--tertiary">{title}</h3>
        <p className="fcmStep_desc">{desc}</p>
      </div>
      <div className="fcmStep_imgBox">
        <img
          src={`assets/imgs/mainPage/FCM/${imgSrc}`}
          className="fcmStep_img"
          alt={title}
        />
      </div>
    </div>
  );
};
