import { capitalizeFirstLetter } from "../../../../../helpers/formatHelpers";
import { suggestCodeIdea } from "../../../../../helpers/misc";
import { useForm } from "../../../../../hooks/useForm";
import { genderTypes, roleTypes } from "../../../../../types/types";
import { InputGroup } from "../../../../ui/InputGroup";

import "./newUser.css";

export const initialState = {
  first_name: "Fátima Lucía",
  last_name: "Caamal Uc",
  role: roleTypes.collaborator,
  col_code: "FCU",
  col_numId: "67",
  gender: genderTypes.female,
  isActive: true,
};

export default function NewUser() {
  const [values, handleInputChange, reset] = useForm(initialState);

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
          <div className="newUserRadio" onChange={handleInputChange}>
            {Object.keys(genderTypes).map((key) => {
              return (
                <div className="radio__group" key={key}>
                  <input
                    type="radio"
                    name="gender"
                    id={key}
                    value={genderTypes[key]}
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
          <div className="newUserRadio" onChange={handleInputChange}>
            {Object.keys(roleTypes).map((key) => {
              return (
                <div className="radio__group" key={key}>
                  <input
                    type="radio"
                    name="gender"
                    id={key}
                    value={roleTypes[key]}
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
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div>

        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
