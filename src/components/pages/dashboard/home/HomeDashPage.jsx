import React from "react";
import { userData } from "../../../../data/dummyData";

import { Chart } from "../../../chart/Chart";
import { FeaturedInfo } from "../../../featuredInfo/FeaturedInfo";
import { WidgetLarge } from "../../../widgetLarge/WidgetLarge";
import { WidgetSmall } from "../../../widgetSmall/WidgetSmall";
import "./homeDashPage.css";

export const HomeDashPage = () => {
  return (
    <div className="homeDashPage">
      <FeaturedInfo></FeaturedInfo>
      <Chart
        title="User Analytics"
        data={userData}
        dataKey="Active User"
        grid
      />
      <div className="homeWidgets">
        <WidgetSmall />
        <WidgetLarge />
      </div>
    </div>
  );
};
