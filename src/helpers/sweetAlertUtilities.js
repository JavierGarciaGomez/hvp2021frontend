import Swal from "sweetalert2";

export const fireSwalWait = (
  title = "Cargando información",
  text = "Por favor, espere"
) => {
  Swal.fire({
    icon: "info",
    title,
    text,
    allowOutsideClick: false,
    showConfirmButton: false,
  });
};
