import React, { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { DailyCleanUpsDataGrid } from "./components/DailyCleanUpsDataGrid";
import { DeepCleanUpsDataGrid } from "./components/DeepCleanUpsDataGrid";

export const CleanUpsBranch = () => {
  const { branch } = useParams();

  return (
    <Fragment>
      <div className="container border-top border-primary">
        <div className="row d-flex justify-content-center m-3 align-self-center">
          <div className="col-6 text-center fs-4">
            {`Control de limpieza profunda de ${branch}`}
          </div>
          <div className="col-4 text-start">
            <Link to="addNewDeepCleaning">
              <button type="button" className="btn btn-secondary mx-2">
                Agregar limpieza profunda
              </button>
            </Link>
          </div>
        </div>
        <DeepCleanUpsDataGrid />
        <div className="row d-flex justify-content-center m-3 align-self-center">
          <div className="col-12 text-center fs-4">
            {`Control de limpieza diaria de ${branch}`}
          </div>
        </div>
        <DailyCleanUpsDataGrid />
      </div>
    </Fragment>
  );
};
