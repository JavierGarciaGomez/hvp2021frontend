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
                className="teamItem u-bgPrimaryLighter u-borderPrimary"
                key={collaborator._id}
              >
                <div className="teamItem_header">
                  <h3 className="teamItem_name heading--secondary text-uppercase">{`${collaborator.first_name} ${collaborator.last_name}`}</h3>
                  <h4 className="teamItem_position heading--tertiary fst-italic">
                    {collaborator.position}
                  </h4>
                </div>
                <div className="teamItem_content">
                  <div className="teamItem_imgContainer">
                    <img
                      className="teamItem_img"
                      src={collaborator.imgUrl}
                      alt=""
                    />
                  </div>
                  <div className="teamItem_text">
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
