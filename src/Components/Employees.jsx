import { useState, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FormEmployeed } from './FormEmployeed';
import ModalDelete from './ModalDelete';
import { deleteEmployee } from '../services/employees';
import { addItemToState, deleteItemFromState } from '../logic/functions';

export function Employees() {
  const [employees, setEmployees] = useState([])
  const [employeeSelect, setEmployeeSelect] = useState(null)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const companyID = JSON.parse(localStorage.getItem('company')).id
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    // Realizar solicitud GET para obtener datos de empleados desde la API
    fetch(`http://localhost:3000/employee/all-company/${companyID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data.employees);
        if (data.employees) {
          setEmployees(data.employees); // Establecer datos de empleados en el estado
        } else {
          console.error('La respuesta no es un array de empleados:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error al obtener datos de empleados:', error);
      });
  }, [companyID]);

  const confirmDelete = async () => {
    const res = await deleteEmployee(token, companyID, employeeSelect)
    if (res.message) {
      const newState = deleteItemFromState(employeeSelect, [...employees])
      setEmployees(newState)
    } else {
      console.error(res)
    }
  }

  const confirmCreate = (data) => {
    const newState = addItemToState(data, [...employees])
    setEmployees(newState)
  }
  
  return (
    <div className="h-full">
      <main className="w-full p-10 flex flex-col gap-10 ">
        <div className="flex justify-between mb-5 ">
          <h1 className="text-4xl font-bold">Empleados</h1>
          <div className="flex items-center">
            <button className="bg-azulClaro px-8 py-3 rounded-md placeholder-grisClaro text-grisClaro outline-none font-semibold text-center" onClick={() => {setModalAdd(true)}}>
              Agregar
            </button>
          </div>
        </div>
        {employees.length > 0 && (
          <table className="bg-grisClaro rounded-md shadow-right-dark px-4 border-separate border-spacing-0 border-spacing-y-4 border-2 border-grisOscuro">
            <thead className="px-5">
              <tr>
                <th className="p-4 text-lg text-start">Empleado</th>
                <th className="p-4 text-lg text-start">Identificación</th>
                <th className="p-4 text-lg text-start">Cargo</th>
                <th className="p-4 text-lg text-start">Departamento</th>
              </tr>
            </thead>
            <tbody className="px-5">
              {employees.map((employee) => (
                <tr className="bg-grisOscuro hover:bg-blue-300" key={employee.id}>
                  <td className="p-4 text-lg rounded-l-2xl">{employee.name}</td>
                  <td className="p-4 text-lg">{employee.identityCard}</td>
                  <td className="p-4 text-lg">{employee.charge}</td>
                  <td className="p-4 text-lg">{employee.departamentId}</td>
                  <td className="relative p-4 text-lg rounded-r-2xl">
                    <input type="checkbox" name={`action${employee.id}`} id={`action${employee.id}`} className="hidden peer/action"/>
                    <label htmlFor={`action${employee.id}`} className="cursor-pointer">
                      <FaEllipsisV/>
                    </label>
                    <div className="hidden absolute peer-checked/action:flex gap-4 right-20 top-1/2 transform -translate-y-1/2 bg-grisClaro shadow-right-dark p-5 rounded-lg z-10">
                      <Link to={`/empleado/${employee.id}`} className="text-white w-28 text-center rounded-md bg-azulClaro px-2 py-1 font-semibold">Ver</Link>
                      <button className="text-white w-28 rounded-md bg-red-600 px-2 py-1 font-semibold" onClick={() => {
                        setEmployeeSelect(employee.id)
                        setModalDelete(true)
                      }}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {modalDelete && (
          <ModalDelete peticion={confirmDelete} setStateModal={setModalDelete}/>
        )}
        {modalAdd && (
          <FormEmployeed setStateModal={setModalAdd} confirm={confirmCreate}/>
        )}
      </main>
    </div>
  );
}
