import React from "react";
import { Link } from "react-router-dom";

export const FCMLink = ({ link, classN, heading, desc }) => {
  return (
    <Link to={link}>
      <div className={`fcmLinkCard fcm${classN}`}>
        <div className="fcmLinkCard_content">
          <h3 className="heading--tertiary">{heading}</h3>
          <p className="">{desc} </p>
        </div>
      </div>
    </Link>
  );
};
