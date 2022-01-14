import { CircularProgress } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collaboratorsStartLoading } from "../../actions/collaboratorActions";
import { MainPagesSectionHeader } from "../../components/mainPageComponents/MainPagesSectionHeader";
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
      <div className="light-background">
        <div className="container services-page">
          <section>
            <MainPagesSectionHeader title="Equipo" />
            {isLoading ? (
              <CircularProgress />
            ) : (
              sortedCollaborators.map((collaborator, index) => {
                return (
                  <div
                    className="mainPages__team-item primary"
                    key={collaborator._id}
                  >
                    <h3>{`${collaborator.first_name} ${collaborator.last_name}`}</h3>
                    <h4>{collaborator.position}</h4>
                    <div className="mainPages__team-content">
                      <div className="mainPages__team-img">
                        <img src={collaborator.imgUrl} alt="" />
                      </div>
                      <div className="mainPages__team-text">
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
          </section>
        </div>
      </div>
    </Fragment>
  );
};
