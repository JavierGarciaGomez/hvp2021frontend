import { capitalizeFirstLetter } from "../../../../../helpers/formatHelpers";
import { suggestCodeIdea } from "../../../../../helpers/misc";
import { useForm } from "../../../../../hooks/useForm";
import { genderTypes, roleTypes } from "../../../../../types/types";
import { InputGroup } from "../../../../ui/InputGroup";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";

import "./newUser.css";
import { useState } from "react";

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

export default function NewUser() {
  const [values, handleInputChange, reset] = useForm(initialState);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Nuevo colaborador</h1>
      <form className="newUserForm" onSubmit={submitHandler}>
        <div className="newUserItem">
          <label>Nombre (s):</label>
          <input
            type="text"
            name="first_name"
            value={values.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="newUserItem">
          <label>Apellidos:</label>
          <input
            type="text"
            name="last_name"
            value={values.last_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="newUserItem">
          <div className="d-flex mb-2 align-items-baseline">
            <label>Código de tres letras:</label>
            <div className="newUser__suggestion">
              Suggestion:{" "}
              <span className="newUser__sugestion__sug">
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

        <div className="newUserItem">
          <label>Número identificador:</label>
          <input
            type="number"
            name="col_numId"
            value={values.col_numId}
            onChange={handleInputChange}
          />
        </div>
        <div className="newUserItem">
          <label>Género</label>
          <div className="newUserRadio">
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

        <div className="newUserItem">
          <label>Rol</label>
          <div className="newUserRadio">
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

        <div className="newUserItem">
          <label>Activo</label>
          <Switch
            // checked={values.isActive}
            checked={values.isActive}
            onChange={handleInputChange}
            name="isActive"
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>

        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
