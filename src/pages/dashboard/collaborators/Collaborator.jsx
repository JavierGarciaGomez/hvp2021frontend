import { EmojiPeople, Http } from "@mui/icons-material";
import {
  BadgeOutlined,
  Numbers,
  TransgenderOutlined,
  CalendarToday,
  KeyOutlined,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  ToggleOnOutlined,
  HowToRegOutlined,
} from "@mui/icons-material";
import Switch from "@mui/material/Switch";

import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import {
  collaboratorStartUpdate,
  collaboratorStartSetActive,
} from "../../../actions/collaboratorActions";
import { capitalizeFirstLetter } from "../../../helpers/formatHelpers";
import { uploadImg } from "../../../helpers/uploadImg";
import { useForm } from "../../../hooks/useForm";
import { genderTypes, positionTypes, roleTypes } from "../../../types/types";

export default function Collaborator() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { collaboratorId } = useParams();
  const { uid, role } = useSelector((state) => state.auth);
  const { activeCollaborator } = useSelector((state) => state.collaborator);
  const { values, handleInputChange, reset, setFullValues } = useForm("");
  const [isAuthorized, setisAuthorized] = useState(false);
  const [isManager, setisManager] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [imgUrl, setimgUrl] = useState(null);

  useEffect(() => {
    dispatch(collaboratorStartSetActive(collaboratorId));
  }, []);

  useEffect(() => {
    if (
      uid === collaboratorId ||
      role === roleTypes.admin ||
      role === roleTypes.manager
    ) {
      setisAuthorized(true);
    }
    if (role === roleTypes.admin || role === roleTypes.manager) {
      setisManager(true);
    }
  }, [uid]);

  useEffect(async () => {
    if (activeCollaborator) {
      setFullValues({ ...activeCollaborator });
      setisLoading(false);
    }
  }, [activeCollaborator]);

  // TODO
  const handleSubmit = (e) => {
    e.preventDefault();

    if (imgUrl) {
      values.imgUrl = imgUrl;
    }

    dispatch(collaboratorStartUpdate(values));
  };

  const handlePictureUpload = (e) => {
    e.preventDefault();

    document.querySelector("#file").click();
  };
  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      const tempImgUrl = await uploadImg(file);
      setimgUrl(tempImgUrl);
    }
  };

  if (isLoading) {
    return <p>Espere...</p>;
  }

  if (!isAuthorized) {
    Swal.fire({
      icon: "error",
      title: "No tienes acceso a esta página",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/dashboard/collaborators");
  }

  return (
    <div className="db-collaborator">
      <div className="db-collaborator__titleContainer">
        <h1 className="db-collaborator__title">Edit Collaborator</h1>
      </div>
      <div className="db-collaborator__container">
        <div className="db-collaborator__show">
          <div className="db-collaborator__showTop">
            <img
              src={activeCollaborator.imgUrl}
              alt=""
              className="db-collaborator__showImg"
            />
            <div className="db-collaborator__showTopTitle">
              <span className="db-collaborator__showUsername">
                {activeCollaborator.first_name} {activeCollaborator.last_name}
              </span>
              <span className="db-collaborator__showUserTitle">
                {activeCollaborator.position}
              </span>
            </div>
          </div>
          <div className="db-collaborator__showBottom">
            <span className="db-collaborator__showTitle">
              Detalles de usuario
            </span>
            <div className="db-collaborator__showInfo">
              <Numbers className="db-collaborator__showIcon" />
              <span className="db-collaborator__showInfoTitle">
                {activeCollaborator.col_numId}
              </span>
            </div>
            <div className="db-collaborator__showInfo">
              <PermIdentity className="db-collaborator__showIcon" />
              <span className="db-collaborator__showInfoTitle">
                {activeCollaborator.col_code}
              </span>
            </div>

            <div className="db-collaborator__showInfo">
              <BadgeOutlined className="db-collaborator__showIcon" />
              <span className="db-collaborator__showInfoTitle">
                {activeCollaborator.role}
              </span>
            </div>

            <div className="db-collaborator__showInfo">
              <ToggleOnOutlined className="db-collaborator__showIcon" />
              <span
                className={`db-collaborator__showInfoTitle ${
                  activeCollaborator.isActive ? "text-success" : "text-danger"
                }`}
              >
                {activeCollaborator.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>

            <div className="db-collaborator__showInfo">
              <TransgenderOutlined className="db-collaborator__showIcon" />
              <span className="db-collaborator__showInfoTitle">
                {activeCollaborator.gender}
              </span>
            </div>

            {/* TODO */}
            {!activeCollaborator.isRegistered && (
              <div className="db-collaborator__showInfo">
                <KeyOutlined className="db-collaborator__showIcon" />
                <span className="db-collaborator__showInfoTitle">
                  {activeCollaborator.accessCode}
                </span>
              </div>
            )}

            <div className="db-collaborator__showInfo">
              <HowToRegOutlined className="db-collaborator__showIcon" />
              <span
                className={`db-collaborator__showInfoTitle ${
                  activeCollaborator.isRegistered
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {activeCollaborator.isRegistered
                  ? "Registrado"
                  : "Sin registrar"}
              </span>
            </div>

            <div className="db-collaborator__showInfo">
              <MailOutline className="db-collaborator__showIcon" />
              <span className="db-collaborator__showInfoTitle">
                {activeCollaborator.email}
              </span>
            </div>

            <div className="db-collaborator__showInfo">
              <Http className="db-collaborator__showIcon" />
              <span
                className={`db-collaborator__showInfoTitle ${
                  activeCollaborator.isDisplayedWeb
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {activeCollaborator.isDisplayedWeb
                  ? "En la web"
                  : "Oculto de la web"}
              </span>
            </div>

            <span className="db-collaborator__showTitle">Contact Details</span>
            <div className="db-collaborator__showInfo">
              <CalendarToday className="db-collaborator__showIcon" />
              <span className="db-collaborator__showInfoTitle">PENDIENTE</span>
            </div>
            <div className="db-collaborator__showInfo">
              <PhoneAndroid className="db-collaborator__showIcon" />
              <span className="db-collaborator__showInfoTitle">PENDIENTE</span>
            </div>

            <div className="db-collaborator__showInfo">
              <LocationSearching className="db-collaborator__showIcon" />
              <span className="db-collaborator__showInfoTitle">PENDIENTE</span>
            </div>
          </div>

          <div className="db-collaborator__showInfo">
            <EmojiPeople className="db-collaborator__showIcon" />
            <span className="db-collaborator__showInfoTitle">
              {activeCollaborator.textPresentation}
            </span>
          </div>
        </div>

        <div className="db_collaborator__update">
          <span className="db_collaborator__updateTitle">
            Actualiza la información
          </span>
          <form className="db_collaborator__updateForm" onSubmit={handleSubmit}>
            {isManager && (
              <Fragment>
                <div className="db_collaborator__updateUpload">
                  <img
                    className="db_collaborator__updateImg"
                    src={activeCollaborator.imgUrl}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish
                      className="db_collaborator__updateIcon"
                      onClick={handlePictureUpload}
                      type="button"
                      sx={{ fontSize: 30 }}
                    />
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    name="file"
                  />
                </div>

                <div className="db_collaborator__updateItem">
                  <label>Nombre (s)</label>
                  <input
                    type="text"
                    className="db_collaborator__updateInput"
                    name="first_name"
                    value={values.first_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="db_collaborator__updateItem">
                  <label>Apellidos:</label>
                  <input
                    className="db_collaborator__updateInput"
                    type="text"
                    name="last_name"
                    value={values.last_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="db_collaborator__updateItem">
                  <label>Posición</label>
                  <div className="newCollaboratorRadio">
                    {Object.keys(positionTypes).map((key) => {
                      return (
                        <div className="radio__group pb-3 pe-1" key={key}>
                          <input
                            type="radio"
                            name="position"
                            id={key}
                            value={positionTypes[key]}
                            checked={values.position === positionTypes[key]}
                            onChange={handleInputChange}
                          />
                          <label htmlFor={key}>
                            {capitalizeFirstLetter(positionTypes[key])}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="db_collaborator__updateItem">
                  <label>Género</label>
                  <div className="newCollaboratorRadio">
                    {Object.keys(genderTypes).map((key) => {
                      return (
                        <div className="radio__group" key={key}>
                          <input
                            type="radio"
                            name="gender"
                            id={key}
                            value={genderTypes[key]}
                            checked={values.gender === genderTypes[key]}
                            onChange={handleInputChange}
                          />
                          <label htmlFor={key}>
                            {capitalizeFirstLetter(genderTypes[key])}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="db_collaborator__updateItem">
                  <label>Rol</label>
                  <div className="newCollaboratorRadio">
                    {Object.keys(roleTypes).map((key) => {
                      return (
                        <div className="radio__group" key={key}>
                          <input
                            type="radio"
                            name="role"
                            id={key}
                            value={roleTypes[key]}
                            checked={values.role === roleTypes[key]}
                            onChange={handleInputChange}
                          />
                          <label htmlFor={key}>
                            {capitalizeFirstLetter(roleTypes[key])}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="db_collaborator__updateItem">
                  <label>Activo</label>
                  <Switch
                    checked={values.isActive}
                    onChange={handleInputChange}
                    name="isActive"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>

                <div className="db_collaborator__updateItem">
                  <label>Se muestra en la web</label>
                  <Switch
                    // checked={values.isActive}
                    checked={values.isDisplayedWeb}
                    onChange={handleInputChange}
                    name="isDisplayedWeb"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </Fragment>
            )}

            <div className="db_collaborator__updateItem">
              <label>Texto de presentación en la web:</label>
              <textarea
                className="db_collaborator__updateInputTextArea"
                name="textPresentation"
                value={values.textPresentation}
                onChange={handleInputChange}
              />
            </div>
            <button
              className="db_collaborator__updateButton btn btn-primary"
              type="submit"
            >
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
