import { AuthTabs } from "./AuthTabs";

export const AuthPage = () => {
  return (
    <div className="auth__main">
      <div className="auth__tabContainer">
        <AuthTabs />
      </div>
    </div>
  );
};
