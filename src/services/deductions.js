// Este archivo se utilizara para guardar peticiones a la API de deducciones
import { succesAlert, errorAlert } from "../Components/alerts/alerts";
export const getAllDeductionName = (token) => {
  const peticion = fetch(
    `http://localhost:3000/deductions/all-deductions-name`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.deductionsName) {
        // console.log("Success:", data.deductionsName);
        return data;
      } else {
        console.log("Error:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};

export const getAllDeductions = (token, employeeId) => {
  const peticion = fetch(`http://localhost:3000/deductions/all/${employeeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.deductions) {
        // console.log("Success:", data.deductions);
        return data;
      } else {
        console.log("Error:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};

export const createDeductionName = (token, data) => {
  const peticion = fetch(
    `http://localhost:3000/deductions/create-deduction-name`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.deduction) {
        // console.log("Success:", data.deduction);
        succesAlert("Se ha creado correctamente la deducción");
        return data.deduction;
      } else {
        console.log("Error:", data.error);
      }
    })
    .catch((error) => {
      errorAlert("Ha ocurrido un error al crear la deducción");
      console.error("Error:", error);
    });

  return peticion;
};

export const createDeductionData = (token, employeeId, deductionId, data) => {
  const peticion = fetch(
    `http://localhost:3000/deductions/create-deduction-data/${employeeId}/${deductionId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.deductionData) {
        // console.log("Success:", data.deductionData);
        succesAlert("Se ha creado correctamente la deducción");
        return data.deductionData;
      } else {
        errorAlert("Ha ocurrido un error al crear la deducción");
        console.log("Error:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};

export const editDeductionData = (token, employeeId, deductionId, data) => {
  const peticion = fetch(
    `http://localhost:3000/deductions/edit-deduction-data/${employeeId}/${deductionId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.deductionData) {
        // console.log("Success:", data.deductionData);
        succesAlert("Se ha editado correctamente la deducción");
        return data.deductionData;
      } else {
        errorAlert("Ha ocurrido un error al editar la deducción");
        console.log("Error:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};

export const deleteEmployee = (token, deductionDataId, employeeId) => {
  const peticion = fetch(
    `http://localhost:3000/deductions/delete-deduction/${deductionDataId}/${employeeId}`,
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
        succesAlert("Se ha eliminado correctamente la deducción");
        return data;
      } else {
        errorAlert("Ha ocurrido un error al eliminar la deducción");
        console.log("Error:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};
