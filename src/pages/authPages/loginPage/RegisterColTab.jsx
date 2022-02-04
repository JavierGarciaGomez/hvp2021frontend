import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { collaboratorStartRegister } from "../../../actions/collaboratorActions";

import { InputGroup } from "../../../components/ui/InputGroup";
import { useForm } from "../../../hooks/useForm";
import "../auth.css";

export const RegisterColTab = () => {
  const dispatch = useDispatch();
  // 369
  const { values: formRegisterValues, handleInputChange } = useForm({
    email: "",
    col_code: "",
    password1: "",
    password2: "",
    accessCode: "",
  });

  const { email, col_code, password1, password2, accessCode } =
    formRegisterValues;

  // TODO
  const registerHandle = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      return Swal.fire("Error", "Las contraseñas deben ser iguales", "error");
    }
    const collaboratorData = {
      email,
      col_code,
      password: password1,
      accessCode,
    };

    dispatch(collaboratorStartRegister(collaboratorData));
  };

  return (
    <Fragment>
      <div className="auth__box-container">
        <form onSubmit={registerHandle}>
          <InputGroup
            label="Correo electrónico"
            type="email"
            placeholder="Ingresa tu email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Código de colaborador"
            type="col_code"
            placeholder="Ingresa tu contraseña"
            name="col_code"
            value={col_code}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Contraseña"
            type="password"
            placeholder="Ingresa tu contraseña"
            name="password1"
            value={password1}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Repita la contraseña"
            type="password"
            placeholder="Ingresa tu contraseña"
            name="password2"
            value={password2}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Código de acceso"
            type="accessCode"
            placeholder="Ingresa tu contraseña"
            name="accessCode"
            value={accessCode}
            onChange={handleInputChange}
          />

          <button type="submit" className="btn btn-primary col-12">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};
