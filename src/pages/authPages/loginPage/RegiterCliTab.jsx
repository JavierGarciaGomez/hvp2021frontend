import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { userStartRegister } from "../../../actions/authActions";
import { collaboratorStartRegister } from "../../../actions/collaboratorActions";

import { InputGroup } from "../../../components/ui/InputGroup";
import { useForm } from "../../../hooks/useForm";
import "../auth.css";

export const RegisterCliTab = () => {
  const dispatch = useDispatch();
  // 369
  const { values: formRegisterValues, handleInputChange } = useForm({
    name: "",
    col_code: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { name, col_code, email, password1, password2 } = formRegisterValues;

  // TODO
  const registerHandle = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      return Swal.fire("Error", "Las contraseñas deben ser iguales", "error");
    }
    const userData = {
      name,
      col_code,
      email,
      password: password1,
    };

    dispatch(userStartRegister(userData));
  };

  const handleGoogleRegister = (e) => {
    window.open("http://localhost:4000/api/auth/google", "_self");
  };

  return (
    <Fragment>
      <div className="auth__box-container">
        <form onSubmit={registerHandle}>
          <div className="google-btn mb-5" onClick={handleGoogleRegister}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon mb-5"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Regístrate con Google</b>
            </p>
          </div>

          <div className="auth__separation mt-5 mb-3">
            <div className="auth__separation-line" />
          </div>

          <p className="mb-3 text-center mb-3">O regístrate con tus datos</p>

          <InputGroup
            label="Nombre completo"
            type="text"
            placeholder="Ingresa tu nombre"
            name="name"
            value={name}
            onChange={handleInputChange}
          />

          <InputGroup
            label="Nombre de usuario"
            type="text"
            placeholder="Ingresa tu nombre"
            name="col_code"
            value={col_code}
            onChange={handleInputChange}
          />

          <InputGroup
            label="Correo electrónico"
            type="email"
            placeholder="Ingresa tu email"
            name="email"
            value={email}
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

          <button type="submit" className="btn btn-primary col-12">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};
