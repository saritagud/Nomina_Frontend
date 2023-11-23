// Este archivo se utilizara para guardar peticiones a la API de empleados

export const deleteEmployee = (token, companyID, employeeID) => {
  const peticion = fetch(`http://localhost:3000/employee/delete-employee/${employeeID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
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
