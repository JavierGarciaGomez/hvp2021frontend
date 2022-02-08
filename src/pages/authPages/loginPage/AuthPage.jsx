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
  const location = useLocation();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    const query = queryString.parse(location.search);
    if (query.token) {
      localStorage.setItem("token", query.token);
    }
  }, []);

  // useEffect(() => {
  //   const url = `${process.env.REACT_APP_API_URL}/auth/googleLogin/success`;
  //   console.log("esta es url", url);
  //   const getUser = () => {
  //     fetch(`${process.env.REACT_APP_API_URL}/auth/googleLogin/success`, {
  //       // mode: "no-cors",
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((response) => {
  //         console.log("ESTA ES LA RESPUESTA", response);
  //         if (response.status === 200) return response.json();
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {
  //         console.log("POR FAVOR********", resObject);
  //         // localStorage.setItem("token", resObject.token);
  //         // localStorage.setItem("token-init-date", new Date().getTime());
  //         dispatch(startChecking());
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getUser();
  // }, []);

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
  // let token = document.cookie.replace(
  //   /(?:(?:^|.*;\s*)auth\s*\=\s*([^;]*).*$)|^.*$/,
  //   "$1"
  // );

  // console.log("token", token);

  // if the token is set store it in local storage. This fires the checking in appRouter, and the cookie is deleted.
  // if (token) {
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("token-init-date", new Date().getTime());

  //   document.cookie = "auth" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  // }

  return (
    <div className="auth__main">
      <div className="auth__tabContainer">
        <AuthTabs />
      </div>
    </div>
  );
};
