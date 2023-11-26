// Este archivo se utilizara para guardar peticiones a la API de usuarios

export const deleteUser = (token, companyID, employeeID) => {
  const peticion = fetch(`http://localhost:3000/user/delete/${employeeID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      // console.log("Success:", data.message)
      if (data.message) {
        return data
      } else {
        console.log("Error:", data)
      }
    })
    .catch(error => {
      console.error("Error:", error)
    })

  return peticion
}
