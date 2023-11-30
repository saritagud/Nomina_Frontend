// Este archivo se utilizara para guardar peticiones a la API de empresas
import { succesAlert, errorAlert } from "../Components/alerts/alerts";
export const deleteCompany = (token, companyID, fetchCompanies) => {
  const peticion = fetch(
    `http://localhost:3000/company/delete-company/${companyID}`,
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
        fetchCompanies();
        succesAlert("Se ha eliminado correctamente la empresa");
        return data;
      } else {
        errorAlert("Ha ocurrido un error al eliminar la empresa");
        console.log("Error:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};
