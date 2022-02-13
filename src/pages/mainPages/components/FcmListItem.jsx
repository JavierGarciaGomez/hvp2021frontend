import { Check } from "@mui/icons-material";
import React from "react";

export const FcmListItem = ({ text, reverse = false }) => {
  return (
    <li className="mp-FCM-main__listItem">
      <Check
        sx={{
          color: "var(--primary-color)",
          fontSize: "3.2rem",
        }}
      />
      <span>{text}</span>
    </li>
  );
};
