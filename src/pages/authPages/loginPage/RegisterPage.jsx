import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { collaboratorStartRegister } from "../../../actions/collaboratorActions";

import { InputGroup } from "../../../components/ui/InputGroup";
import { useForm } from "../../../hooks/useForm";
import "../auth.css";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  // 369
  const { values: formRegisterValues, handleInputChange } = useForm({
    email: "jgg@mail.com",
    col_code: "JGG",
    password1: "secret",
    password2: "secret",
    accessCode: "secre",
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
      <div className="auth__main">
        <div className="auth__box-container">
          <form onSubmit={registerHandle}>
            <h3 className="auth__title">Registro de colaboradores</h3>
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

            {/* TODO:
            password
          */}

            <button type="submit" className="btn btn-primary col-12">
              Submit
            </button>

            {/* TODO */}
            {/* <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p> */}

            {/* <div className="auth__social-networks">
              <p>Login with social networks</p>

              <div className="google-btn" onClick={handleGoogleLogin}>
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="google button"
                  />
                </div>
                <p className="btn-text">
                  <b>Sign in with google</b>
                </p>
              </div>
            </div> */}

            <Link to="/auth/login" className="link">
              Ya estoy registrado
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
