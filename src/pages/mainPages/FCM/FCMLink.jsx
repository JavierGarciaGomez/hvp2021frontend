import React from "react";
import { Link } from "react-router-dom";

export const FCMLink = ({ link, classN, heading, desc }) => {
  return (
    <Link to={link}>
      <div className={`mp-FCP__link ${classN}`}>
        <div className="mp-FCP__link-content">
          <h3 className="mp-FCP__link-heading">{heading}</h3>
          <p className="def-par">{desc} </p>
        </div>
      </div>
    </Link>
  );
};
