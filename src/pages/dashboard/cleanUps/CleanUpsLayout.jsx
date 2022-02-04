import { CircularProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";
import { CleanUpsRouter } from "../../../routes/CleanUpsRouter";

export const CleanUpsLayoutPage = () => {
  return (
    <Fragment>
      <div className="container py-3">
        <h1 className="text-center py-1 fs-2">Control de limpieza</h1>

        {/* TODO */}
        <div className="container-sm d-flex justify-content-center py-1">
          <div className="btn-group" role="group" aria-label="Basic example">
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
      </div>

      <CleanUpsRouter />
    </Fragment>
  );
};
