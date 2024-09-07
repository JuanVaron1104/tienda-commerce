import swal from "sweetalert2";
import { Redirect } from "react-router-dom";

import ErrorPage from "../common/Errors/404";
import Administrador from "../../views/HomeAdministrador";


function AuthAdmin() {
  const tipoUsuario =
    localStorage.getItem("proyecto_tps103_userRole") ||
    sessionStorage.getItem("proyecto_tps103_userRole");

  if (!tipoUsuario) {
    swal.fire({
      title: "Debes iniciar sesión primero",
      icon: "error",
      iconColor: "#9a66a8",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#9a66a8",
      showConfirmButton: true,
    });
    return <Redirect to="/Login" />;
  }

  if (tipoUsuario === '2') {
    return <Administrador />;
  }

  return <ErrorPage />;
}

export default AuthAdmin
