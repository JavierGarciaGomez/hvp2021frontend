import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup } from "../../../components/ui/InputGroup";
import { useForm } from "../../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { userStartLogin } from "../../../actions/authActions";

export const LoginTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  // 369
  const { values, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const { email, password } = values;

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/dashboard", { replace: true });
  // }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(userStartLogin({ email, password }));
  };

  const handleGoogleLogin = (e) => {
    window.open(process.env.REACT_APP_API_URL + "/auth/google", "_self");
  };

  return (
    <Fragment>
      <div className="auth__box-container">
        <form onSubmit={handleLogin}>
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

          <button type="submit" className="btn btn-primary col-12 mb-5">
            Submit
          </button>
          {/* TODO */}
          {/* <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p> */}

          <div className="auth__separation mb-3">
            <div className="auth__separation-line" />
          </div>

          <p className="mb-3 text-center mb-3">O accede con Google</p>

          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Accede con google</b>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
