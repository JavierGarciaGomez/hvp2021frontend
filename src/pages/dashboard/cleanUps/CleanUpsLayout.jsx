import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";

import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";
import { CleanUpsRouter } from "../../../routes/CleanUpsRouter";

export const CleanUpsLayoutPage = () => {
  return (
    <Fragment>
      <h1 className="heading--secondary">Control de limpieza</h1>

      {/* TODO */}
      <div className="d-flex justify-content-center u-mb-3r">
        <div className="btn-group" role="group" aria-label="Basic example">
          <Link to="Summary">
            <button type="button" className="btn btn-primary mx-2">
              Summary
            </button>
          </Link>
          <Link to="Urban">
            <button type="button" className="btn btn-primary mx-2">
              Urban
            </button>
          </Link>
          <Link to="Harbor">
            <button type="button" className="btn btn-primary mx-2">
              The Harbor
            </button>
          </Link>
          <Link to="Montejo">
            <button type="button" className="btn btn-primary mx-2">
              Montejo
            </button>
          </Link>
        </div>
      </div>

      <CleanUpsRouter />
    </Fragment>
  );
};
