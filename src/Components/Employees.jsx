import React, { useState, useEffect } from 'react';
import { SideBar } from "./Sidebar";
import { Link } from 'react-router-dom';
//
export function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Realizar solicitud GET para obtener datos de empleados desde la API
    fetch('http://localhost:3000/employee/all-company/:companyId') // Reemplaza con tu URL de la API
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEmployees(data); // Establecer datos de empleados en el estado
        } else {
          console.error('La respuesta no es un array de empleados:', data);
        }
      })
      .catch((error) => {
        console.error('Error al obtener datos de empleados:', error);
      });
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <main className="w-screen h-screen p-10 flex flex-col gap-10">
        <div className="flex justify-between mb-5">
          <h1 className="text-4xl" style={{ fontWeight: 'bold' }}>Empleados</h1>
          <div className="flex items-center">
            <Link className="bg-azulClaro px-8 py-3 rounded-md placeholder-grisClaro text-grisClaro outline-none font-semibold text-center" to="/">
              Agregar
            </Link>
          </div>
        </div>
        <table className="bg-grisClaro rounded-md shadow-right-dark w-full px-4 border-separate border-spacing-0 border-spacing-y-4">
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
              <tr className="bg-grisOscuro" key={employee.id}>
                <td className="p-4 text-lg rounded-l-2xl">{employee.name}</td>
                <td className="p-4 text-lg">{employee.identifyCard}</td>
                <td className="p-4 text-lg">{employee.charge}</td>
                <td className="p-4 text-lg">{employee.departamentId}</td>
                <td className="p-4 text-lg flex gap-4">
                <Link to={`/empleado/:emploID`} state={{ employee }}> //configurar que se vea solamente que se está pidiendo
                    {employee.name}
                    <svg
                      width="10"
                      height="20"
                      viewBox="0 0 10 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ display: 'inline-block', cursor: 'pointer', marginLeft: '10px' }}
                    >
                      <path
                        d="M5.46094 10.2437C7.94844 10.2437 9.96094 11.9966 9.96094 14.1631C9.96094 16.3296 7.94844 18.0824 5.46094 18.0824C2.97344 18.0824 0.960938 16.3296 0.960938 14.1631C0.960938 11.9966 2.97344 10.2437 5.46094 10.2437ZM0.960938 4.58244C0.960938 6.74897 2.97344 8.5018 5.46094 8.5018C7.94844 8.5018 9.96094 6.74897 9.96094 4.58244C9.96094 2.41591 7.94844 0.663086 5.46094 0.663086C2.97344 0.663086 0.960938 2.41591 0.960938 4.58244ZM0.960938 23.7437C0.960938 25.9103 2.97344 27.6631 5.46094 27.6631C7.94844 27.6631 9.96094 25.9103 9.96094 23.7437C9.96094 21.5772 7.94844 19.8244 5.46094 19.8244C2.97344 19.8244 0.960938 21.5772 0.960938 23.7437Z"
                        fill="black"
                      />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
