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
