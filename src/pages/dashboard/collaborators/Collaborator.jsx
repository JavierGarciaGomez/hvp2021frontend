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
    <Fragment>
      <h2 className="heading--secondary">Editar colaborador</h2>

      <div className="collaborator_container">
        <div className="collaboratorShow">
          <div className="collaboratorShow_header">
            <img src={activeCollaborator.imgUrl} alt="" className="c-avatar" />
            <div className="collaboratorShow_headerRight">
              <span className="collaboratorShow_username mb-1r">
                {activeCollaborator.first_name} {activeCollaborator.last_name}
              </span>
              <span className="collaboratorShow_position">
                {activeCollaborator.position}
              </span>
            </div>
          </div>
          <div className="collaboratorShow_content">
            <span className="collaboratorShow_heading">
              Detalles de usuario
            </span>
            <div className="collaboratorShow_infoContainer">
              <Numbers className="collaboratorShow_infoIcon" />
              <span className="collaboratorShow_infoLabel">
                {activeCollaborator.col_numId}
              </span>
            </div>
            <div className="collaboratorShow_infoContainer">
              <PermIdentity className="collaboratorShow_infoIcon" />
              <span className="collaboratorShow_infoLabel">
                {activeCollaborator.col_code}
              </span>
            </div>

            <div className="collaboratorShow_infoContainer">
              <BadgeOutlined className="collaboratorShow_infoIcon" />
              <span className="collaboratorShow_infoLabel">
                {activeCollaborator.role}
              </span>
            </div>

            <div className="collaboratorShow_infoContainer">
              <ToggleOnOutlined className="collaboratorShow_infoIcon" />
              <span
                className={`collaboratorShow_infoLabel ${
                  activeCollaborator.isActive ? "text-success" : "text-danger"
                }`}
              >
                {activeCollaborator.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>

            <div className="collaboratorShow_infoContainer">
              <TransgenderOutlined className="collaboratorShow_infoIcon" />
              <span className="collaboratorShow_infoLabel">
                {activeCollaborator.gender}
              </span>
            </div>

            {/* TODO */}
            {!activeCollaborator.isRegistered && (
              <div className="collaboratorShow_infoContainer">
                <KeyOutlined className="collaboratorShow_infoIcon" />
                <span className="collaboratorShow_infoLabel">
                  {activeCollaborator.accessCode}
                </span>
              </div>
            )}

            <div className="collaboratorShow_infoContainer">
              <HowToRegOutlined className="collaboratorShow_infoIcon" />
              <span
                className={`collaboratorShow_infoLabel ${
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

            <div className="collaboratorShow_infoContainer">
              <MailOutline className="collaboratorShow_infoIcon" />
              <span className="collaboratorShow_infoLabel">
                {activeCollaborator.email}
              </span>
            </div>

            <div className="collaboratorShow_infoContainer">
              <Http className="collaboratorShow_infoIcon" />
              <span
                className={`collaboratorShow_infoLabel ${
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

            <span className="collaboratorShow_heading">Contact Details</span>
            <div className="collaboratorShow_infoContainer">
              <CalendarToday className="collaboratorShow_infoIcon" />
              <span className="collaboratorShow_infoLabel">PENDIENTE</span>
            </div>
            <div className="collaboratorShow_infoContainer">
              <PhoneAndroid className="collaboratorShow_infoIcon" />
              <span className="collaboratorShow_infoLabel">PENDIENTE</span>
            </div>

            <div className="collaboratorShow_infoContainer">
              <LocationSearching className="collaboratorShow_infoIcon" />
              <span className="collaboratorShow_infoLabel">PENDIENTE</span>
            </div>
          </div>

          <div className="collaboratorShow_infoContainer">
            <EmojiPeople className="collaboratorShow_infoIcon" />
            <span className="collaboratorShow_infoLabel">
              {activeCollaborator.textPresentation}
            </span>
          </div>
        </div>

        <div className="collaboratorUpdate">
          <h3 className="heading--tertiary">Actualiza la información</h3>
          <form className="collaboratorUpdate_form" onSubmit={handleSubmit}>
            {isManager && (
              <Fragment>
                <div className="collaboratorUpdate_uploadImgContainer">
                  <img
                    className="collaboratorUpdate_img"
                    src={activeCollaborator.imgUrl}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish
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

                <div className="collaboratorUpdate_item">
                  <label className="collaboratorUpdate_label">Nombre (s)</label>
                  <input
                    type="text"
                    className="collaboratorUpdate_input"
                    name="first_name"
                    value={values.first_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="collaboratorUpdate_item">
                  <label className="collaboratorUpdate_label">Apellidos:</label>
                  <input
                    className="collaboratorUpdate_input"
                    type="text"
                    name="last_name"
                    value={values.last_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="collaboratorUpdate_item">
                  <label className="collaboratorUpdate_label">Posición</label>
                  <div className="">
                    {Object.keys(positionTypes).map((key) => {
                      return (
                        <div className="c-inlineRadioGroup pb-3 pe-1" key={key}>
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

                <div className="collaboratorUpdate_item">
                  <label className="collaboratorUpdate_label">Género</label>
                  <div className="">
                    {Object.keys(genderTypes).map((key) => {
                      return (
                        <div className="c-inlineRadioGroup" key={key}>
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

                <div className="collaboratorUpdate_item">
                  <label className="collaboratorUpdate_label">Rol</label>
                  <div className="">
                    {Object.keys(roleTypes).map((key) => {
                      return (
                        <div className="c-inlineRadioGroup" key={key}>
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

                <div className="collaboratorUpdate_item">
                  <label className="collaboratorUpdate_label">Activo</label>
                  <Switch
                    checked={values.isActive}
                    onChange={handleInputChange}
                    name="isActive"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>

                <div className="collaboratorUpdate_item">
                  <label className="collaboratorUpdate_label">
                    Se muestra en la web
                  </label>
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

            <div className="collaboratorUpdate_item">
              <label className="collaboratorUpdate_label">
                Texto de presentación en la web:
              </label>
              <textarea
                className="collaboratorUpdate_textArea"
                name="textPresentation"
                value={values.textPresentation}
                onChange={handleInputChange}
              />
            </div>
            <button className="c-button" type="submit">
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
