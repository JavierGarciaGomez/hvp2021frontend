import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { collaboratorStartLogin } from "../../../actions/collaboratorActions";
import { InputGroup } from "../../../components/ui/InputGroup";
import { useForm } from "../../../hooks/useForm";
import "../auth.css";

export const LoginPage = () => {
  const dispatch = useDispatch();
  // 369
  const { values, handleInputChange } = useForm({
    email: "jgg@mail.com",
    password: "secret",
  });

  const { email, password } = values;

  //   TODO
  const handleGoogleLogin = (e) => {
    e.preventDefault();
  };

  // TODO
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(collaboratorStartLogin({ email, password }));
  };

  return (
    <Fragment>
      <div className="auth__main">
        <div className="auth__box-container">
          <form onSubmit={handleLogin}>
            <h3 className="auth__title">Login</h3>
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
              name="password"
              value={password}
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

            <div className="auth__social-networks">
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
            </div>

            <Link to="/auth/register" className="link">
              Create new account
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
