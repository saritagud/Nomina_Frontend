// Este archivo se utilizara para guardar peticiones a la API de departamentos

export const deleteDepartment = (token, companyID, departamentID) => {
    const peticion = fetch(`http://localhost:3000/department/delete-department/${companyID}/${departamentID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        // console.log("Success:", data.message)
        if (data.message) {
          return data
        } else {
          console.log("Error:", data.error)
        }
      })
      .catch(error => {
        console.error("Error:", error)
      })
      
    return peticion
  }
  