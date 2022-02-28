import { ArrowDownward, ArrowUpward } from "@mui/icons-material/";

import React from "react";

export const FeaturedInfo = () => {
  return (
    <div className="featuredInfo">
      <div className="featuredInfoItem">
        <span className="featuredInfoTitle">Revenue</span>
        <div className="featuredInfoMoneyContainer">
          <span className="featuredInfoMoney">$2,415</span>
          <span className="featuredInfoMoneyRate">
            -$2,415 <ArrowDownward className="featuredInfoIcon negative" />
          </span>
        </div>
        <span className="featuredInfoSub">Compared to last month</span>
      </div>
      <div className="featuredInfoItem">
        <span className="featuredInfoTitle">Sales</span>
        <div className="featuredInfoMoneyContainer">
          <span className="featuredInfoMoney">$4,415</span>
          <span className="featuredInfoMoneyRate">
            -$415 <ArrowDownward className="featuredInfoIcon negative" />
          </span>
        </div>
        <span className="featuredInfoSub">Compared to last month</span>
      </div>
      <div className="featuredInfoItem">
        <span className="featuredInfoTitle">Cost</span>
        <div className="featuredInfoMoneyContainer">
          <span className="featuredInfoMoney">$4,415</span>
          <span className="featuredInfoMoneyRate">
            +$415 <ArrowUpward className="featuredInfoIcon" />
          </span>
        </div>
        <span className="featuredInfoSub">Compared to last month</span>
      </div>
    </div>
  );
};
