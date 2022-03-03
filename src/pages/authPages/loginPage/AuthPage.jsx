import { AuthTabs } from "./AuthTabs";
import queryString from "query-string";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { startChecking } from "../../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthorization } from "../../../helpers/utilities";
import { roleTypes } from "../../../types/types";

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    const query = queryString.parse(location.search);
    if (query.token) {
      console.log("setting token", query.token);
      localStorage.setItem("token", query.token);
      dispatch(startChecking());
    }
  }, []);

  useEffect(() => {
    console.log("***********role", role);
    if (checkAuthorization(role, roleTypes.collaborator)) {
      return navigate("/dashboard", { replace: true });
    }
    if (checkAuthorization(role, roleTypes.user)) {
      return navigate("/clients", { replace: true });
    }
  }, [role]);

  return (
    <div className="auth__main">
      <div className="auth__tabContainer">
        <AuthTabs />

        <div className="mt-5 d-flex justify-content-end">
          <Link to="/">
            <button className="btn btn-lg btn-primary fs-2">
              Regresar a la página principal
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
