import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLogout } from "../../actions/authActions";

export const ClientWelcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(startLogout());
    navigate("/");
  };

  return (
    <div>
      <h1>Bienvenido cliente</h1>
      <button className="btn btn-primary" onClick={handleLogout}>
        Salir
      </button>
    </div>
  );
};
