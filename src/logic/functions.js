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

// Funcion para formatear una fecha en tiempo de servicio
export const formatTimeDifference = (startDate) => {
  const start = new Date(formatearFecha(startDate));
  const end = new Date();

  const timeDifference = end - start; // Diferencia total en milisegundos
  const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const years = Math.floor(dayDifference / 365);
  const months = Math.floor((dayDifference % 365) / 30);
  const days = dayDifference % 30;
  
  // console.log("Years: " + years)
  // console.log("Meses: " + months)
  // console.log("Dias: " + days)

  let formattedResult = '';

  if (years > 0) {
    formattedResult += `${years} ${years === 1 ? 'año' : 'años'}`;
  }

  if (months > 0) {
    formattedResult += ` ${months} ${months === 1 ? 'mes' : 'meses'}`;
  }
  if (years == 0) {
    if (days > 0) {
      formattedResult += ` ${days} ${days === 1 ? 'día' : 'días'}`;
    }
  }
  return formattedResult.trim() || 'Menos de un mes';
}

// Funcion para formatear una semana en rango de fechas
export const formatWeekRange = (weekValue) => {
  const [year, weekNumber] = weekValue.split('-W');
  const startDateOfWeek = new Date(year, 0, 2 + (weekNumber - 1) * 7);
  const endDateOfWeek = new Date(year, 0, 2 + (weekNumber - 1) * 7 + 6);

  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const startDateFormatted = startDateOfWeek.toLocaleDateString('es-ES', options);
  const endDateFormatted = endDateOfWeek.toLocaleDateString('es-ES', options);

  return `${startDateFormatted} al ${endDateFormatted}`;
}

// Funcion para formatear los primeros 15 dias de un mes en rango de fechas
export const formatRangeFirst = (monthValue) => {
  const [year, month] = monthValue.split('-');
  const startDateOfMonth = new Date(year, month - 1, 1);
  const endDateOfMonth = new Date(year, month - 1, 15);

  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const startDateFormatted = startDateOfMonth.toLocaleDateString('es-ES', options);
  const endDateFormatted = endDateOfMonth.toLocaleDateString('es-ES', options);

  return `Del ${startDateFormatted} al ${endDateFormatted}`;
}

// Funcion para formatear los ultimos 15 dias de un mes en rango de fechas
export const formatRangeSecond = (monthValue) => {
  const [year, month] = monthValue.split('-');
  const startDateOfMonth = new Date(year, month - 1, 16);
  const lastDayOfMonth = new Date(year, month, 0);
  const endDateOfMonth = new Date(year, month - 1, lastDayOfMonth.getDate());

  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const startDateFormatted = startDateOfMonth.toLocaleDateString('es-ES', options);
  const endDateFormatted = endDateOfMonth.toLocaleDateString('es-ES', options);

  return `Del ${startDateFormatted} al ${endDateFormatted}`;
}

// Funcion para formatear un mes en fecha
export const formatMonth = (monthValue) => {
  const [year, month] = monthValue.split('-');
  const options = { month: 'long', year: 'numeric' };

  const formattedMonth = new Date(year, month - 1, 1).toLocaleDateString('es-ES', options);

  return `De ${formattedMonth}`;
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