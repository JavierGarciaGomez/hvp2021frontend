import { EmojiPeople, Http } from "@material-ui/icons";
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

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  collaboratorStartUpdate,
  collaboratorStartSetActive,
} from "../../../actions/collaboratorActions";
import { capitalizeFirstLetter } from "../../../helpers/formatHelpers";
import { uploadImg } from "../../../helpers/uploadImg";
import { useForm } from "../../../hooks/useForm";
import { genderTypes, positionTypes, roleTypes } from "../../../types/types";

import "./collaborator.css";

export default function Collaborator() {
  const dispatch = useDispatch();
  const { collaboratorId } = useParams();

  const [loading, setloading] = useState(true);

  const [imgUrl, setimgUrl] = useState(null);
  const { activeCollaborator } = useSelector((state) => state.collaborator);
  const { values, handleInputChange, reset, setFullValues } = useForm("");

  useEffect(() => {
    dispatch(collaboratorStartSetActive(collaboratorId));
  }, []);

  useEffect(async () => {
    if (activeCollaborator) {
      setFullValues({ ...activeCollaborator });
      setloading(false);
    }
  }, [activeCollaborator]);

  // TODO
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    if (imgUrl) {
      values.imgUrl = imgUrl;
    }

    dispatch(collaboratorStartUpdate(values));
    // Swal.fire({
    //   icon: "success",
    //   title: `Usuario ${values.col_code} creado con éxito. El código de acceso es: ${values.accessCode}`,
    //   showConfirmButton: true,
    // });
  };

  const handlePictureUpload = (e) => {
    e.preventDefault();
    console.log("HOLAAA");
    document.querySelector("#file").click();
    console.log("he");
  };
  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const tempImgUrl = await uploadImg(file);
      setimgUrl(tempImgUrl);
    }
  };

  if (loading) {
    return <p>Espera, paps</p>;
  } else {
    return (
      <div className="collaborator">
        <div className="collaboratorTitleContainer">
          <h1 className="collaboratorTitle">Edit Collaborator</h1>
        </div>
        <div className="collaboratorContainer">
          <div className="collaboratorShow">
            <div className="collaboratorShowTop">
              <img
                src={activeCollaborator.imgUrl}
                alt=""
                className="collaboratorShowImg"
              />
              <div className="collaboratorShowTopTitle">
                <span className="collaboratorShowUsername">
                  {activeCollaborator.first_name} {activeCollaborator.last_name}
                </span>
                <span className="collaboratorShowUserTitle">
                  {activeCollaborator.position}
                </span>
              </div>
            </div>
            <div className="collaboratorShowBottom">
              <span className="collaboratorShowTitle">Detalles de usuario</span>
              <div className="collaboratorShowInfo">
                <Numbers className="collaboratorShowIcon" />
                <span className="collaboratorShowInfoTitle">
                  {activeCollaborator.col_numId}
                </span>
              </div>
              <div className="collaboratorShowInfo">
                <PermIdentity className="collaboratorShowIcon" />
                <span className="collaboratorShowInfoTitle">
                  {activeCollaborator.col_code}
                </span>
              </div>

              <div className="collaboratorShowInfo">
                <BadgeOutlined className="collaboratorShowIcon" />
                <span className="collaboratorShowInfoTitle">
                  {activeCollaborator.role}
                </span>
              </div>

              <div className="collaboratorShowInfo">
                <ToggleOnOutlined className="collaboratorShowIcon" />
                <span
                  className={`collaboratorShowInfoTitle ${
                    activeCollaborator.isActive ? "text-success" : "text-danger"
                  }`}
                >
                  {activeCollaborator.isActive ? "Activo" : "Inactivo"}
                </span>
              </div>

              <div className="collaboratorShowInfo">
                <TransgenderOutlined className="collaboratorShowIcon" />
                <span className="collaboratorShowInfoTitle">
                  {activeCollaborator.gender}
                </span>
              </div>

              {/* TODO */}
              {!activeCollaborator.isRegistered && (
                <div className="collaboratorShowInfo">
                  <KeyOutlined className="collaboratorShowIcon" />
                  <span className="collaboratorShowInfoTitle">
                    {activeCollaborator.accessCode}
                  </span>
                </div>
              )}

              <div className="collaboratorShowInfo">
                <HowToRegOutlined className="collaboratorShowIcon" />
                <span
                  className={`collaboratorShowInfoTitle ${
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

              <div className="collaboratorShowInfo">
                <MailOutline className="collaboratorShowIcon" />
                <span className="collaboratorShowInfoTitle">
                  {activeCollaborator.email}
                </span>
              </div>

              <div className="collaboratorShowInfo">
                <Http className="collaboratorShowIcon" />
                <span
                  className={`collaboratorShowInfoTitle ${
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

              <span className="collaboratorShowTitle">Contact Details</span>
              <div className="collaboratorShowInfo">
                <CalendarToday className="collaboratorShowIcon" />
                <span className="collaboratorShowInfoTitle">PENDIENTE</span>
              </div>
              <div className="collaboratorShowInfo">
                <PhoneAndroid className="collaboratorShowIcon" />
                <span className="collaboratorShowInfoTitle">PENDIENTE</span>
              </div>

              <div className="collaboratorShowInfo">
                <LocationSearching className="collaboratorShowIcon" />
                <span className="collaboratorShowInfoTitle">PENDIENTE</span>
              </div>
            </div>

            <div className="collaboratorShowInfo">
              <EmojiPeople className="collaboratorShowIcon" />
              <span className="collaboratorShowInfoTitle">
                {activeCollaborator.textPresentation}
              </span>
            </div>
          </div>
          <div className="collaboratorUpdate">
            <span className="collaboratorUpdateTitle">Edit</span>
            <form className="collaboratorUpdateForm" onSubmit={handleSubmit}>
              <div className="collaboratorUpdateLeft">
                <div className="collaboratorUpdateItem">
                  <label>Nombre (s)</label>
                  <input
                    type="text"
                    className="collaboratorUpdateInput"
                    name="first_name"
                    value={values.first_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="collaboratorUpdateItem">
                  <label>Apellidos:</label>
                  <input
                    className="collaboratorUpdateInput"
                    type="text"
                    name="last_name"
                    value={values.last_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="collaboratorUpdateItem">
                  <label>Posición</label>
                  <div className="newCollaboratorRadio">
                    {Object.keys(positionTypes).map((key) => {
                      return (
                        <div className="radio__group" key={key}>
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

                <div className="collaboratorUpdateItem">
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

                <div className="collaboratorUpdateItem">
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

                <div className="collaboratorUpdateItem">
                  <label>Activo</label>
                  <Switch
                    // checked={values.isActive}
                    checked={values.isActive}
                    onChange={handleInputChange}
                    name="isActive"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>

                <div className="collaboratorUpdateItem">
                  <label>Se muestra en la web</label>
                  <Switch
                    // checked={values.isActive}
                    checked={values.isDisplayedWeb}
                    onChange={handleInputChange}
                    name="isDisplayedWeb"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>

                <div className="collaboratorUpdateItem">
                  <label>Texto de presentación en la web:</label>
                  <textarea
                    className="collaboratorUpdateInputTextArea"
                    name="textPresentation"
                    value={values.textPresentation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="collaboratorUpdateRight">
                <div className="collaboratorUpdateUpload">
                  <img
                    className="collaboratorUpdateImg"
                    src={activeCollaborator.imgUrl}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish
                      className="collaboratorUpdateIcon"
                      onClick={handlePictureUpload}
                      type="button"
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
                <button className="collaboratorUpdateButton" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
