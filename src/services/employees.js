// Este archivo se utilizara para guardar peticiones a la API de empleados
import { succesAlert, errorAlert } from "../Components/alerts/alerts";

export const deleteEmployee = (token, companyID, employeeID) => {
  const peticion = fetch(
    `http://localhost:3000/employee/delete-employee/${employeeID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log("Success:", data.message)
      if (data.message) {
        succesAlert("Se ha eliminado correctamente el empleado");
        return data;
      } else {
        errorAlert("Ha ocurrido un error al crear el empleado");
        console.log("Error:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};
