// Este archivo se utilizara para guardar peticiones a la API de usuarios
import { succesAlert, errorAlert} from "../Components/alerts/alerts";

export const getAllPayrolls = (token, companyId) => {
  const peticion = fetch(`http://localhost:3000/payroll/all-payrolls/${companyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log("Success:", data.message)
      if (data) {
        // succesAlert("Se ha eliminado correctamente el empleado de la nomina");
        return data;
      } else {
        errorAlert("Ha ocurrido un error al recuperar todas las nominas");
        console.log("Error:", data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};

export const getPayroll = (token, companyId, payrollId) => {
  const peticion = fetch(`http://localhost:3000/payroll/${payrollId}/${companyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data)
      if (data) {
        // succesAlert("Se ha eliminado correctamente el empleado de la nomina");
        return data;
      } else {
        errorAlert("Ha ocurrido un error al recuperar todas las nominas");
        console.log("Error:", data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};

export const deleteUserOfPayroll = (token, payrollID, employeeID) => {
  const peticion = fetch(`http://localhost:3000/payroll/${payrollID}/${employeeID}`, {
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
        succesAlert("Se ha eliminado correctamente el empleado de la nomina");
        return data;
      } else {
        errorAlert("Ha ocurrido un error al eliminar el empleado de la nomina");
        console.log("Error:", data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};

export const deletePayroll = (token, payrollID, companyId) => {
  const peticion = fetch(`http://localhost:3000/payroll/delete-payroll/${payrollID}/${companyId}`, {
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
        succesAlert("Se ha eliminado correctamente la nomina");
        return data;
      } else {
        errorAlert("Ha ocurrido un error al eliminar la nomina");
        console.log("Error:", data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};

export const updateStatePayroll = (token, payrollID, companyId, data) => {
  const peticion = fetch(`http://localhost:3000/payroll/update-state-payroll/${payrollID}/${companyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log("Success:", data.message)
      if (data.message) {
        succesAlert("Se ha modificado el estado de la nomina a 'Abierta'");
        return data;
      } else {
        errorAlert("Ha ocurrido un error al modificar el estado de la nomina");
        console.log("Error:", data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};
