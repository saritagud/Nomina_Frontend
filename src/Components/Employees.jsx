import React from 'react';
import { SideBar } from "./Sidebar"

export function Employees() {
      const empleyoees = [5] 
      const handleVerNominaClick = (empleado) => {
        // Lógica para ver la nómina del empleado
        console.log(`Ver nómina de ${empleado.nombre}`);
        // Puedes redirigir a la página de la nómina del empleado, o realizar la acción necesaria
      };

      return (
        <div className="flex">
          <SideBar />
          <main className="w-screen h-screen p-10 flex flex-col gap-10">
            <section className="flex justify-between items-center">
              <h1 className="text-3xl">Empleados</h1>
              <form className="flex gap-2">
                <button className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold">
                  Agregar
                </button>
              </form>
            </section>
            {empleyoees?.length === 0 ? (
              <strong className="text-xl">
                No hay nomina de este empleado
              </strong>
            ) : (
                empleyoees?.length > 0 && (
                <>
                  <table className="bg-grisClaro rounded-md shadow-right-dark w-full px-4 border-separate border-spacing-0 border-spacing-y-4">
                    <thead className="px-5">
                      <tr>
                        <th className="p-4 text-lg text-start">Empleado</th>
                        <th className="p-4 text-lg text-start">Identificación</th>
                        <th className="p-4 text-lg text-start">Cargo</th>
                        <th className="p-4 text-lg text-start">Departamento</th>
                        <th className="p-4 text-lg text-start"></th>
                      </tr>
                    </thead>
                    <tbody className="px-5">
                      <tr className="bg-grisOscuro">
                        <td className="p-4 text-lg rounded-l-2xl">Sara Gudiño</td>
                        <td className="p-4 text-lg">30391704</td>
                        <td className="p-4 text-lg">Asesor</td>
                        <td className="p-4 text-lg">
                          Recursos Humanos
                        </td>
                        <td className="p-4 text-lg rounded-r-2xl"> 
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => handleVerNominaClick(empleado)}
                        >
                          <path
                            d="M13 16C13 15.4477 13.4477 15 14 15H18V11C18 10.4477 18.4477 10 19 10C19.5523 10 20 10.4477 20 11V17C20 18.6569 18.6569 20 17 20H11C10.4477 20 10 19.5523 10 19C10 18.4477 10.4477 18 11 18H14C14.5523 18 15 17.5523 15 17V16H13Z"
                            fill="black"
                          />
                        </svg>
                      </td>
                      </tr>
                      <tr className="bg-grisOscuro">
                        <td className="p-4 text-lg rounded-l-2xl">Sara Gudiño</td>
                        <td className="p-4 text-lg">30391704</td>
                        <td className="p-4 text-lg">Asesor</td>
                        <td className="p-4 text-lg">
                          Recursos Humanos
                        </td>
                        <td className="p-4 text-lg rounded-r-2xl"> 
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => handleVerNominaClick(empleado)}
                        >
                          <path
                            d="M13 16C13 15.4477 13.4477 15 14 15H18V11C18 10.4477 18.4477 10 19 10C19.5523 10 20 10.4477 20 11V17C20 18.6569 18.6569 20 17 20H11C10.4477 20 10 19.5523 10 19C10 18.4477 10.4477 18 11 18H14C14.5523 18 15 17.5523 15 17V16H13Z"
                            fill="black"
                          />
                        </svg>
                      </td>
                      </tr>
                      <tr className="bg-grisOscuro">
                        <td className="p-4 text-lg rounded-l-2xl">Sara Gudiño</td>
                        <td className="p-4 text-lg">30391704</td>
                        <td className="p-4 text-lg">Asesor</td>
                        <td className="p-4 text-lg">
                          Recursos Humanos
                        </td>
                        <td className="p-4 text-lg rounded-r-2xl"> 
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => handleVerNominaClick(empleado)}
                        >
                          <path
                            d="M13 16C13 15.4477 13.4477 15 14 15H18V11C18 10.4477 18.4477 10 19 10C19.5523 10 20 10.4477 20 11V17C20 18.6569 18.6569 20 17 20H11C10.4477 20 10 19.5523 10 19C10 18.4477 10.4477 18 11 18H14C14.5523 18 15 17.5523 15 17V16H13Z"
                            fill="black"
                          />
                        </svg>
                      </td>
                      </tr>
                      <tr className="bg-grisOscuro">
                        <td className="p-4 text-lg rounded-l-2xl">Sara Gudiño</td>
                        <td className="p-4 text-lg">30391704</td>
                        <td className="p-4 text-lg">Asesor</td>
                        <td className="p-4 text-lg">
                          Recursos Humanos
                        </td>
                        <td className="p-4 text-lg rounded-r-2xl"> 
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => handleVerNominaClick(empleado)}
                        >
                          <path
                            d="M13 16C13 15.4477 13.4477 15 14 15H18V11C18 10.4477 18.4477 10 19 10C19.5523 10 20 10.4477 20 11V17C20 18.6569 18.6569 20 17 20H11C10.4477 20 10 19.5523 10 19C10 18.4477 10.4477 18 11 18H14C14.5523 18 15 17.5523 15 17V16H13Z"
                            fill="black"
                          />
                        </svg>
                      </td>
                      </tr>
                    </tbody>
                  </table>
                  <section className="flex justify-between w-full px-5"></section>
                </>
              )
            )}
          </main>
        </div>
      )
    }
    