import React, { useState } from 'react';
import { SideBar } from './Sidebar';

export function Settings() {
  const [empleyoees, setEmpleyoees] = useState([
    { id: 1, nombre: 'Configuración 1' },
    { id: 2, nombre: 'Configuración 2' },
    { id: 3, nombre: 'Configuración 3' },
    { id: 4, nombre: 'Configuración 4' },
    { id: 5, nombre: 'Configuración 5' },
  ]);

  const handleEliminar = (id) => {
    const newEmpleyoees = empleyoees.filter((empleado) => empleado.id !== id);
    setEmpleyoees(newEmpleyoees);
  };

  const handleEditar = (id) => {
    const employeeToEdit = empleyoees.find((empleado) => empleado.id === id);
  };

  return (
    <div className="flex">
      <SideBar />
      <main className="w-screen h-screen p-10 flex flex-col gap-10">
        <h1 className="text-3xl">Configuraciones</h1>
        {empleyoees?.map((empleado) => (
          <div key={empleado.id} className="flex items-center">
            <div className="w-full flex justify-between items-center bg-grisOscuro rounded-md mb-2 shadow-right-dark" style={{ backgroundColor: '#F1F2F7' }}>
              <div className="w-full p-4 text-lg">{empleado.nombre}</div>
              <div className="flex gap-4">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 41 42"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: 'block', cursor: 'pointer' }}
                  onClick={() => handleEditar(empleado.id)}
                >
                  <g clipPath="url(#clip0_27_1282)">
                                <path
                                  d="M23.4102 7.96637L33.4118 18.218L11.6938 40.4789L2.77663 41.4879C1.58288 41.6232 0.574286 40.5886 0.707098 39.365L1.69929 30.2185L23.4102 7.96637ZM39.5977 6.44008L34.9016 1.62659C33.4368 0.125122 31.061 0.125122 29.5962 1.62659L25.1782 6.155L35.1798 16.4066L39.5977 11.8782C41.0626 10.3759 41.0626 7.94155 39.5977 6.44008Z"
                                  fill="black"
                                />
                              </g>
                              </svg>
                              <svg
                                width="30"
                                height="30"
                                viewBox="0 0 42 44"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ display: 'block', cursor: 'pointer' }}
                                onClick={() => handleEliminar(empleado.id)}
                              >
                                <path
                                d="M40.232 2.75001H29.2499L28.3896 1.14298C28.2074 0.799417 27.9266 0.510417 27.579 0.308495C27.2314 0.106573 26.8307 -0.000260216 26.422 1.50672e-05H15.9615C15.5536 -0.00145709 15.1536 0.104977 14.8072 0.307124C14.4609 0.509271 14.1821 0.798954 14.003 1.14298L13.1427 2.75001H2.16057C1.77222 2.75001 1.39978 2.89488 1.12517 3.15274C0.850562 3.4106 0.696289 3.76034 0.696289 4.12501L0.696289 6.87501C0.696289 7.23969 0.850562 7.58942 1.12517 7.84728C1.39978 8.10515 1.77222 8.25001 2.16057 8.25001H40.232C40.6204 8.25001 40.9928 8.10515 41.2674 7.84728C41.542 7.58942 41.6963 7.23969 41.6963 6.87501V4.12501C41.6963 3.76034 41.542 3.4106 41.2674 3.15274C40.9928 2.89488 40.6204 2.75001 40.232 2.75001ZM5.56504 40.1328C5.63488 41.1801 6.12711 42.163 6.94152 42.8814C7.75593 43.5999 8.83131 43.9999 9.94874 44H32.4438C33.5613 43.9999 34.6366 43.5999 35.4511 42.8814C36.2655 42.163 36.7577 41.1801 36.8275 40.1328L38.7677 11H3.62486L5.56504 40.1328Z"
                                fill="black"
                              />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
