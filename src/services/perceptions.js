// Este archivo se utilizara para guardar peticiones a la API de percepciones
import { succesAlert, errorAlert } from "../Components/alerts/alerts";
export const getAllPerceptionsName = (token) => {
  const peticion = fetch(
    `http://localhost:3000/perception/all-perceptions-name`,
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
      if (data.perceptionsName) {
        // console.log("Success:", data.perceptionsName);
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

export const getAllPerceptions = (token, employeeId) => {
  const peticion = fetch(`http://localhost:3000/perception/all/${employeeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.perceptions) {
        // console.log("Success:", data.perceptions);
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

export const createPerceptionName = (token, data) => {
  const peticion = fetch(
    `http://localhost:3000/perception/create-perception-name`,
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
      if (data.perception) {
        // console.log("Success:", data.perception);
        succesAlert("Se ha creado correctamente la percepción");
        return data.perception;
      } else {
        errorAlert("Ha ocurrido un error al crear la percepción");
        console.log("Error:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};

export const createPerceptionData = (token, employeeId, perceptionId, data) => {
  const peticion = fetch(
    `http://localhost:3000/perception/create-perception-data/${employeeId}/${perceptionId}`,
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
      if (data.perceptionData) {
        // console.log("Success:", data.perceptionData);
        succesAlert("Se ha creado correctamente la percepción");
        return data.perceptionData;
      } else {
        errorAlert("Ha ocurrido un error al crear la percepción");
        console.log("Error:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};

export const editPerceptionData = (token, employeeId, perceptionId, data) => {
  const peticion = fetch(
    `http://localhost:3000/perception/edit-perception-data/${employeeId}/${perceptionId}`,
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
      if (data.perceptionData) {
        // console.log("Success:", data.perceptionData);
        succesAlert("Se ha editado correctamente la percepción");
        return data.perceptionData;
      } else {
        errorAlert("Ha ocurrido un error al editar la percepción");

        console.log("Error:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return peticion;
};

export const deleteEmployee = (token, perceptionDataId, employeeId) => {
  const peticion = fetch(
    `http://localhost:3000/perception/delete-perception/${perceptionDataId}/${employeeId}`,
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
        return data;
      } else {
        errorAlert("Ha ocurrido un error al eliminar la percepción");
        console.log("Error:", data.error);
      }
    })
    .catch((error) => {

      console.error("Error:", error);
    });

  return peticion;
};
