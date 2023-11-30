// Este archivo se utilizara para guardar peticiones a la API de usuarios
import { succesAlert, errorAlert } from "../Components/alerts/alerts";

export const deleteUser = (token, companyID, employeeID) => {
  const peticion = fetch(`http://localhost:3000/user/delete/${employeeID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log("Success:", data.message)
      if (data.message) {
        succesAlert("Se ha eliminado correctamente el usuario");
        return data;
      } else {
        errorAlert("Ha ocurrido un error al eliminar el usuario");
        console.log("Error:", data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};
