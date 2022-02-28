import React, { Fragment, useState } from "react";
import { useScript } from "../../../hooks/useScript";
import { Check } from "@mui/icons-material";
import { Link } from "@mui/material";
import { FCMLink } from "./FCMLink";
import { FCMHeader } from "./components/FCMHeader";
import { FCMLinks } from "./components/FCMLinks";
import { FCMRouter } from "../../../routes/FCMRouter";

export const FCMLayout = () => {
  const [showMenu, setshowMenu] = useState(false);

  const handleShowMenu = () => {
    setshowMenu((prevState) => !prevState);
  };

  const handleHideMenu = () => {
    setshowMenu(false);
  };
  // ionicons

  return (
    <div className="l-pageContent u-pt-10r u-bgPrimaryLightest">
      <div className="container">
        <FCMHeader />
        <div className="u-mb-5r u-pe-10r u-mx-auto">
          <button
            className=" btn btn-lg btn-success ms-auto d-block"
            onClick={handleShowMenu}
          >
            Muestra el menú
          </button>
        </div>
        {showMenu && <FCMLinks handleHideMenu={handleHideMenu} />}
        <FCMRouter />
      </div>
    </div>
  );
};
