import "./widgetSmall.css";

import React from "react";
import { Visibility } from "@material-ui/icons";

export const WidgetSmall = () => {
  return (
    <div className="widgetSmall">
      <span className="widgetSmallTitle">New Join Members</span>
      <ul className="widgetSmallList">
        <li className="widgetSmallListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmallImg"
          />
          <div className="widgetSmallUser">
            <span className="widgetSmallUsername">Anna Keller</span>
            <span className="widgetSmallUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmallButton">
            <Visibility className="widgetSmallIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmallListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmallImg"
          />
          <div className="widgetSmallUser">
            <span className="widgetSmallUsername">Anna Keller</span>
            <span className="widgetSmallUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmallButton">
            <Visibility className="widgetSmallIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmallListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmallImg"
          />
          <div className="widgetSmallUser">
            <span className="widgetSmallUsername">Anna Keller</span>
            <span className="widgetSmallUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmallButton">
            <Visibility className="widgetSmallIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmallListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmallImg"
          />
          <div className="widgetSmallUser">
            <span className="widgetSmallUsername">Anna Keller</span>
            <span className="widgetSmallUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmallButton">
            <Visibility className="widgetSmallIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmallListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmallImg"
          />
          <div className="widgetSmallUser">
            <span className="widgetSmallUsername">Anna Keller</span>
            <span className="widgetSmallUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmallButton">
            <Visibility className="widgetSmallIcon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
};
