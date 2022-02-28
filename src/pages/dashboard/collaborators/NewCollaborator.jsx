import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";

import { useState } from "react";

import { generateRandomString } from "../../../helpers/utilities";
import { uploadImg } from "../../../helpers/uploadImg";

import { genderTypes, positionTypes, roleTypes } from "../../../types/types";
import { useForm } from "../../../hooks/useForm";
import { suggestCodeIdea } from "../../../helpers/misc";
import { capitalizeFirstLetter } from "../../../helpers/formatHelpers";
import { collaboratorStartCreate } from "../../../actions/collaboratorActions";

export const initialState = {
  first_name: "",
  last_name: "",
  role: roleTypes.collaborator,
  col_code: "",
  col_numId: "",
  gender: genderTypes.female,
  isActive: true,
  position: positionTypes.assistantB,
};

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function NewCollaborator() {
  const { values, handleInputChange, reset } = useForm(initialState);
  const [imgUrl, setimgUrl] = useState(null);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (imgUrl) {
      values.imgUrl = imgUrl;
    }
    values.accessCode = generateRandomString(6);

    collaboratorStartCreate(values);
  };

  const handlePictureUpload = (e) => {
    e.preventDefault();
    document.querySelector("#fileSelector").click();
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const tempImgUrl = await uploadImg(file);
      setimgUrl(tempImgUrl);
    }
  };

  return (
    <div className="newCollaborator">
      <h1 className="newCollaboratorTitle">Nuevo colaborador</h1>
      <form className="newCollaboratorForm" onSubmit={submitHandler}>
        <div className="newCollaboratorItem">
          <label>Nombre (s):</label>
          <input
            type="text"
            name="first_name"
            value={values.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="newCollaboratorItem">
          <label>Apellidos:</label>
          <input
            type="text"
            name="last_name"
            value={values.last_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="newCollaboratorItem">
          <div className="d-flex mb-2 align-items-baseline">
            <label>Código de tres letras:</label>
            <div className="newCollaborator__suggestion">
              Suggestion:{" "}
              <span className="newCollaborator__sugestion__sug">
                {suggestCodeIdea(values.first_name, values.last_name)}
              </span>{" "}
            </div>
          </div>
          <input
            type="text"
            name="col_code"
            placeholder={suggestCodeIdea(values.first_name, values.last_name)}
            value={values.col_code}
            onChange={handleInputChange}
          />
        </div>

        <div className="newCollaboratorItem">
          <label>Número identificador:</label>
          <input
            type="number"
            name="col_numId"
            value={values.col_numId}
            onChange={handleInputChange}
          />
        </div>

        <div className="newCollaboratorItem">
          <label>Puesto de trabajo</label>
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

        <div className="newCollaboratorItem">
          <label>Género</label>
          <div className="newCollaboratorRadio">
            {Object.keys(genderTypes).map((key) => {
              return (
                <div className="radio__group pb-3 pe-1" key={key}>
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

        <div className="newCollaboratorItem">
          <label>Rol</label>
          <div className="newCollaboratorRadio">
            {Object.keys(roleTypes).map((key) => {
              return (
                <div className="radio__group pb-3 pe-1" key={key}>
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

        <div className="newCollaboratorItem">
          <label>Activo</label>
          <Switch
            // checked={values.isActive}
            checked={values.isActive}
            onChange={handleInputChange}
            name="isActive"
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>

        <div className="newCollaboratorItem">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            id="fileSelector"
            name="file"
          />

          <div>
            <button className="btn btn-secondary" onClick={handlePictureUpload}>
              Cargar imagen
            </button>
          </div>
        </div>

        <button className="newCollaboratorButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
