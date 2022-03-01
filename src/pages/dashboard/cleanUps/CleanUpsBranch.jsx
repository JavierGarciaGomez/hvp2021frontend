import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { operatingRoomCleanUpCreate } from "../../../actions/cleanUpsActions";
import { DailyCleanUpsDataGrid } from "./components/DailyCleanUpsDataGrid";
import { DeepCleanUpsDataGrid } from "./components/DeepCleanUpsDataGrid";
import { OperatingRoomCleanUpDataGrid } from "./components/OperatingRoomCleanUpDataGrid";

export const CleanUpsBranch = () => {
  const { branch } = useParams();
  const dispatch = useDispatch();
  const handleNewOperatingRoomCleanUp = () => {
    dispatch(operatingRoomCleanUpCreate(branch));
  };

  return (
    <Fragment>
      <div className="container border-top">
        <div className="row d-flex justify-content-center m-3 align-self-center">
          <h3 className="heading--tertiary col-6">
            {`Control de limpieza profunda de ${branch}`}
          </h3>
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
          <h3 className="heading--tertiary">
            {`Control de limpieza diaria de ${branch}`}
          </h3>
        </div>
        <DailyCleanUpsDataGrid />
        <div className="row d-flex justify-content-center m-3 align-self-center">
          <h3 className="heading--tertiary col-6">
            {`Control de limpieza de quirófano de ${branch}`}
          </h3>
          <div className="col-4 text-start">
            <button
              type="button"
              className="btn btn-secondary mx-2"
              onClick={handleNewOperatingRoomCleanUp}
            >
              Agregar limpieza de quirófano
            </button>
          </div>
        </div>
        <OperatingRoomCleanUpDataGrid />
      </div>
    </Fragment>
  );
};
