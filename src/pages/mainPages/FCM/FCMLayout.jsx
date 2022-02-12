import React, { Fragment } from "react";

export const FCMLayout = () => {
  return (
    <Fragment>
      <div className="mp-FCM-main__header">
        <h2>Miniportal de trámites de la Federación Canófila Mexicana</h2>
      </div>
      {/* disclaimer */}
      <div className="mp-FCM-main__Disclaimer"></div>
      {/* Explicación del portal */}
      <div className="mp-FCM-main__guide"></div>

      {/* importancia */}
      <div className="mp-FCM-main__Importance"></div>
      <div className="mp-FCM-main__Links"></div>
      {/* Acceso al portal */}

      <div className="mp-FCP-main__procedures"></div>
    </Fragment>
  );
};
