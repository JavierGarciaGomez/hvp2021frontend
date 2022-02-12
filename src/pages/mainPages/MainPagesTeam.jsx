import { CircularProgress } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collaboratorsStartLoading } from "../../actions/collaboratorActions";
import { MainPagesSectionHeader } from "./components/MainPagesSectionHeader";
import {
  convertPlainTextToHtml,
  getTextAsJSX,
  sortCollection,
} from "../../helpers/utilites";

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
      <section className="bg-primary--ti-st section-pb section-pt">
        <MainPagesSectionHeader title="Equipo" />
        {isLoading ? (
          <CircularProgress />
        ) : (
          sortedCollaborators.map((collaborator, index) => {
            return (
              <div
                className="mp-team__item bg-primary--ti-er border-primary"
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
