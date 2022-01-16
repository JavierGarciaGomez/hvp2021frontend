import React from "react";

export const AddNewDeepCleaning = () => {
  const branch = "Urban";

  return (
    <div className="container">
      <h4 className="mb-1">
        Agregar nueva limpieza profunda en{" "}
        <span className="fw-bold text-info">{branch}</span>
      </h4>
      <form>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 d-flex p-2 align-items-center">
            <div className="col-8">Orden conforme a los lineamientos</div>
            <div className="col-4">
              <button className="btn btn-secondary btn-sm">Registrar</button>
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex p-2 align-items-center">
            <div className="col-8">
              Objetos inservibles y residuos desechados
            </div>
            <div className="col-4">
              <button className="btn btn-secondary btn-sm">Registrar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
