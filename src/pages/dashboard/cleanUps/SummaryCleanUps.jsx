import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingLastMonthCleanUps } from "../../../actions/cleanUpsActions";
import { collaboratorsStartLoading } from "../../../actions/collaboratorActions";
import {
  getBranchesSummary,
  getCollaboratorsCleanUpsSummary,
} from "../../../helpers/utilities";
import { CleanUpSummaryBranch } from "./components/CleanUpSummaryBranch";

export const SummaryCleanUps = () => {
  const dispatch = useDispatch();
  const { lastMonthCleanUps = [] } = useSelector((state) => state.cleanups);
  const { collaborators = [] } = useSelector((state) => state.collaborator);
  const [branchesSummary, setbranchesSummary] = useState([]);
  const [collaboratorsSummary, setcollaboratorsSummary] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    dispatch(collaboratorsStartLoading());
    dispatch(startLoadingLastMonthCleanUps());
  }, []);

  useEffect(() => {
    if (lastMonthCleanUps.dailyCleanUps) {
      setbranchesSummary(getBranchesSummary(lastMonthCleanUps));
      setcollaboratorsSummary(
        getCollaboratorsCleanUpsSummary(collaborators, lastMonthCleanUps)
      );
      setisLoading(false);
    }
  }, [lastMonthCleanUps, collaborators]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="m-5">
      {/* header */}
      <div className="row mb-3 d-flex justify-content-lg-around">
        <h3 className="mb-4">Resumen mensual del control de limpieza</h3>
      </div>
      <div className="row d-flex justify-content-evenly">
        <CleanUpSummaryBranch branch="Urban" data={branchesSummary} />
        <CleanUpSummaryBranch branch="Harbor" data={branchesSummary} />
        <CleanUpSummaryBranch branch="Montejo" data={branchesSummary} />
      </div>
      <div className="row mb-3 d-flex justify-content-lg-around">
        <h3 className="mb-4">
          Resumen de participaciones en limpiezas en los últimos 30 días
        </h3>
      </div>
      <div className="row">
        {collaboratorsSummary.map((data) => {
          return (
            <div key={data.imgUrl} className="col-2 mb-3">
              <img
                className="collaboratorsImg mx-auto d-block mb-3"
                src={data.imgUrl}
                alt=""
              />

              <p className="text-center">{data.cleanUps.length}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
