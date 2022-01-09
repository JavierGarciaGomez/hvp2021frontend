import React from "react";
import { Chart } from "../../../components/chart/Chart";
import { FeaturedInfo } from "../../../components/featuredInfo/FeaturedInfo";
import { WidgetLarge } from "../../../components/widgetLarge/WidgetLarge";
import { WidgetSmall } from "../../../components/widgetSmall/WidgetSmall";
import { userData } from "../../../data/dummyData";

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
