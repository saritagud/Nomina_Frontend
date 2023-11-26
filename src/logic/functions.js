// Este es un archivo para guardar funciones que usaremos en diversos sitios del proyecto

export const formatearFecha = (fecha) => {
  // Crea un objeto Date a partir de la cadena de fecha proporcionada
  const fechaObj = new Date(fecha)

  // Obtiene los componentes de la fecha
  const año = fechaObj.getFullYear()
  const mes = ("0" + (fechaObj.getMonth() + 1)).slice(-2) // Se suma 1 porque los meses comienzan desde 0
  const día = ("0" + fechaObj.getDate()).slice(-2)

  // Construye la cadena con el formato "AAAA-MM-DD"
  const fechaFormateada = `${año}-${mes}-${día}`

  return fechaFormateada
}

// Funcion para agregar un item a un Estado que sea un Arreglo
export const addItemToState = (itemAdd, list) => {
  list.push(itemAdd)
  return list
}

// Funcion para editar un Item en una estado que sea un Arreglo de objetos
export const udpateItemFromState = (itemUpdate, list) => {
  const indexItem = list.findIndex(item => item.id === itemUpdate.id)

  if (indexItem >= 0) {
     list[indexItem] = itemUpdate
     return list
  }
}

// Funcion para eliminar un Item de un estado que sea un Arreglo de objetos
export const deleteItemFromState = (itemDeleteID, list) => {
  const indexItem = list.findIndex(item => item.id === itemDeleteID)

  if (indexItem >= 0) {
    list.splice(indexItem, 1)
    return list
  }
}