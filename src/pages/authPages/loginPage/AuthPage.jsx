import { AuthTabs } from "./AuthTabs";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { startChecking } from "../../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { checkAutorization } from "../../../helpers/utilites";
import { roleTypes } from "../../../types/types";

export const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.auth);
  useEffect(() => {
    if (checkAutorization(role, roleTypes.collaborator)) {
      return navigate("/dashboard", { replace: true });
    }
    if (checkAutorization(role, roleTypes.user)) {
      return navigate("/clients", { replace: true });
    }
  }, [role]);

  // useEffect(() => {
  //   let token = document.cookie.replace(
  //     /(?:(?:^|.*;\s*)auth\s*\=\s*([^;]*).*$)|^.*$/,
  //     "$1"
  //   );
  //   console.log("token", token);
  //   if (token) {
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("token-init-date", new Date().getTime());
  //     dispatch(startChecking());
  //     document.cookie = "auth" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  //     navigate("/dashboard", { replace: true });
  //   }
  // }, [dispatch]);

  // after login with google, and auth cookie is set
  let token = document.cookie.replace(
    /(?:(?:^|.*;\s*)auth\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  // if the token is set store it in local storage. This fires the checking in appRouter, and the cookie is deleted.
  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("token-init-date", new Date().getTime());

    document.cookie = "auth" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  return (
    <div className="auth__main">
      <div className="auth__tabContainer">
        <AuthTabs />
      </div>
    </div>
  );
};
