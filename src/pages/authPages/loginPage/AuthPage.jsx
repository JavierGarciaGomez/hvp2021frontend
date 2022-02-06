import { AuthTabs } from "./AuthTabs";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = queryString.parse(location.search);
  const { token = "" } = query;
  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("token-init-date", new Date().getTime());
    navigate("/dashboard", { replace: true });
  }

  console.log("token", token);
  return (
    <div className="auth__main">
      <div className="auth__tabContainer">
        <AuthTabs />
      </div>
    </div>
  );
};
