import React, { Fragment } from "react";
import { useScript } from "../../../hooks/useScript";
import { Check } from "@mui/icons-material";
import { Link } from "@mui/material";
import { FCMLink } from "./FCMLink";
import { FCMHeader } from "./components/FCMHeader";
import { FCMLinks } from "./components/FCMLinks";
import { FcmCalculator } from "./components/FcmCalculator";

export const FCMCalc = () => {
  // ionicons

  return (
    <div className="container">
      <FcmCalculator />
    </div>
  );
};
