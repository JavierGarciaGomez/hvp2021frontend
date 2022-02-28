import CircularProgress from "@mui/material/CircularProgress";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collaboratorsStartLoading } from "../../actions/collaboratorActions";
import { MainPagesSectionHeader } from "./components/MainPagesSectionHeader";
import {
  convertPlainTextToHtml,
  getTextAsJSX,
  sortCollection,
} from "../../helpers/utilities";

export const MainPagesTeam = () => {
  const dispatch = useDispatch();
  const { collaborators, isLoading } = useSelector(
    (state) => state.collaborator
  );
  const [sortedCollaborators, setsortedCollaborators] = useState([]);

  useEffect(() => {
    dispatch(collaboratorsStartLoading());
  }, [dispatch]);

  useEffect(() => {
    setsortedCollaborators(sortCollection(collaborators));
  }, [collaborators]);

  return (
    <Fragment>
      <section className="u-bgPrimaryLightest u-pb-6r u-pt-10r">
        <MainPagesSectionHeader title="Equipo" />
        {isLoading ? (
          <CircularProgress />
        ) : (
          sortedCollaborators.map((collaborator, index) => {
            return (
              <div
                className="mp-team__item u-bgPrimaryLighter u-borderPrimary"
                key={collaborator._id}
              >
                <div className="mp-team__header">
                  <h3>{`${collaborator.first_name} ${collaborator.last_name}`}</h3>
                  <h4>{collaborator.position}</h4>
                </div>
                <div className="mp-team__content">
                  <div className="mp-team__img">
                    <img src={collaborator.imgUrl} alt="" />
                  </div>
                  <div className="mp-team__text">
                    {/* {collaborator.textPresentation &&
                          collaborator.textPresentation
                            .split("\n")
                            .map((i, key) => {
                              return <p key={key}>{i}</p>;
                            })} */}
                    {getTextAsJSX(collaborator.textPresentation)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div className="container"></div>
      </section>
    </Fragment>
  );
};
