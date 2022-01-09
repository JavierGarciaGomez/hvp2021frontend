import React from "react";
import { useNavigate } from "react-router-dom";
import { MainPagesSectionHeader } from "../../../components/mainPageComponents/MainPagesSectionHeader";

export const MainPagesServicesConsultation = () => {
  const navigate = useNavigate();
  return (
    <div className="light-background">
      <div className="container">
        <section>
          <MainPagesSectionHeader title="Consultas" />

          <div className="service-only-container">
            <div className="service-only-image">
              <img src="assets/imgs/mainPage/services/consulta.jpg" alt="" />
            </div>
            <div className="service-only-text">
              <p>
                Su mascota es recibida en recepción por nuestro personal y se
                verifica si contamos con su expediente en nuestros archivos.
              </p>

              <p>
                Deberá seleccionar al especialista que lo atenderá; en algunas
                ocasiones, hay que hacer una cita ya en la consulta, se
                establecen los motivos de la visita y según sea el caso, el
                especialista le hará preguntas que lo ayuden a orientarse en el
                diagnóstico. Posteriormente aplicará las técnicas de diagnóstico
                que así requiera y le explicará detalladamente todo lo que
                acontece, así como las medidas a seguir que ayuden al
                diagnóstico o terapéutica correspondiente.
              </p>
              <p>
                Siempre, se le tomará el peso en kilogramos, se observará su
                excremento al microscopio y se revisará su calendario de
                vacunas. Deberá existir confianza y seguridad bilateral (Uds. Y
                Nosotros), ya que como su mascota no habla, la causa de la
                enfermedad posiblemente la encontremos en el diálogo; comparta
                con nosotros sus inquietudes, así como sus sugerencias y
                observaciones, nuestra filosofía de amistad busca en sus
                clientes relaciones duraderas.
              </p>
            </div>
          </div>
          <div className="return-div">
            <button
              type="button"
              className="btn btn-lg btn-primaryBG"
              onClick={() => navigate(-1)}
            >
              ◀ Regresar
            </button>{" "}
          </div>
        </section>
      </div>
    </div>
  );
};
