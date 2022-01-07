import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";

import "./newCollaborator.css";
import { useState } from "react";

import Swal from "sweetalert2";

import { capitalizeFirstLetter } from "../../../../helpers/formatHelpers";
import { suggestCodeIdea } from "../../../../helpers/misc";
import { useForm } from "../../../../hooks/useForm";
import { genderTypes, roleTypes } from "../../../../types/types";
import { startRegister } from "../../../../actions/collaboratorActions";
import { uploadImg } from "../../../../helpers/uploadImg";
import { generateRandomString } from "../../../../helpers/utilites";

export const initialState = {
  first_name: "Fátima Lucía",
  last_name: "Caamal Uc",
  role: roleTypes.collaborator,
  col_code: "FCU",
  col_numId: "67",
  gender: genderTypes.female,
  isActive: true,
};

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function NewCollaborator() {
  const [values, handleInputChange, reset] = useForm(initialState);
  const [imgUrl, setimgUrl] = useState(initialState);

  console.log("imgUrl", imgUrl);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (imgUrl) {
      values.imgUrl = imgUrl;
    }
    values.accessCode = generateRandomString(6);
    console.log("estos son los valores", values);
    startRegister(values);
    Swal.fire({
      icon: "success",
      title: `Usuario ${values.col_code} creado con éxito. El código de acceso es: ${values.accessCode}`,
      showConfirmButton: true,
    });
  };

  const handlePictureUpload = (e) => {
    e.preventDefault();
    document.querySelector("#fileSelector").click();
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
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

        <div className="newCollaboratorItem">
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
