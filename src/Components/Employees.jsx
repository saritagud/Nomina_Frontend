import React from 'react';
import { SideBar } from "./Sidebar"
import { Link } from 'react-router-dom';

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
                        width="34"
                        height="52"
                        viewBox="0 0 34 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleVerNominaClick(empleado)}
                      >
                        <Link to="/nomina">
                          <path
                            d="M19.8333 13.8125V0H2.125C0.947396 0 0 1.08672 0 2.4375V49.5625C0 50.9133 0.947396 52 2.125 52H31.875C33.0526 52 34 50.9133 34 49.5625V16.25H21.9583C20.7896 16.25 19.8333 15.1531 19.8333 13.8125ZM25.5 37.7812C25.5 38.4516 25.0219 39 24.4375 39H9.5625C8.97812 39 8.5 38.4516 8.5 37.7812V36.9688C8.5 36.2984 8.97812 35.75 9.5625 35.75H24.4375C25.0219 35.75 25.5 36.2984 25.5 36.9688V37.7812ZM25.5 31.2812C25.5 31.9516 25.0219 32.5 24.4375 32.5H9.5625C8.97812 32.5 8.5 31.9516 8.5 31.2812V30.4688C8.5 29.7984 8.97812 29.25 9.5625 29.25H24.4375C25.0219 29.25 25.5 29.7984 25.5 30.4688V31.2812ZM25.5 23.9688V24.7812C25.5 25.4516 25.0219 26 24.4375 26H9.5625C8.97812 26 8.5 25.4516 8.5 24.7812V23.9688C8.5 23.2984 8.97812 22.75 9.5625 22.75H24.4375C25.0219 22.75 25.5 23.2984 25.5 23.9688ZM34 12.3805V13H22.6667V0H23.2068C23.7734 0 24.3135 0.253906 24.712 0.710938L33.3802 10.6641C33.7786 11.1211 34 11.7406 34 12.3805Z"
                            fill="black"
                          />
                        </Link>
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
                        width="34"
                        height="52"
                        viewBox="0 0 34 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleVerNominaClick(empleado)}
                      >
                        <Link to="/nomina">
                          <path
                            d="M19.8333 13.8125V0H2.125C0.947396 0 0 1.08672 0 2.4375V49.5625C0 50.9133 0.947396 52 2.125 52H31.875C33.0526 52 34 50.9133 34 49.5625V16.25H21.9583C20.7896 16.25 19.8333 15.1531 19.8333 13.8125ZM25.5 37.7812C25.5 38.4516 25.0219 39 24.4375 39H9.5625C8.97812 39 8.5 38.4516 8.5 37.7812V36.9688C8.5 36.2984 8.97812 35.75 9.5625 35.75H24.4375C25.0219 35.75 25.5 36.2984 25.5 36.9688V37.7812ZM25.5 31.2812C25.5 31.9516 25.0219 32.5 24.4375 32.5H9.5625C8.97812 32.5 8.5 31.9516 8.5 31.2812V30.4688C8.5 29.7984 8.97812 29.25 9.5625 29.25H24.4375C25.0219 29.25 25.5 29.7984 25.5 30.4688V31.2812ZM25.5 23.9688V24.7812C25.5 25.4516 25.0219 26 24.4375 26H9.5625C8.97812 26 8.5 25.4516 8.5 24.7812V23.9688C8.5 23.2984 8.97812 22.75 9.5625 22.75H24.4375C25.0219 22.75 25.5 23.2984 25.5 23.9688ZM34 12.3805V13H22.6667V0H23.2068C23.7734 0 24.3135 0.253906 24.712 0.710938L33.3802 10.6641C33.7786 11.1211 34 11.7406 34 12.3805Z"
                            fill="black"
                          />
                        </Link>
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
                        width="34"
                        height="52"
                        viewBox="0 0 34 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleVerNominaClick(empleado)}
                      >
                        <Link to="/nomina">
                          <path
                            d="M19.8333 13.8125V0H2.125C0.947396 0 0 1.08672 0 2.4375V49.5625C0 50.9133 0.947396 52 2.125 52H31.875C33.0526 52 34 50.9133 34 49.5625V16.25H21.9583C20.7896 16.25 19.8333 15.1531 19.8333 13.8125ZM25.5 37.7812C25.5 38.4516 25.0219 39 24.4375 39H9.5625C8.97812 39 8.5 38.4516 8.5 37.7812V36.9688C8.5 36.2984 8.97812 35.75 9.5625 35.75H24.4375C25.0219 35.75 25.5 36.2984 25.5 36.9688V37.7812ZM25.5 31.2812C25.5 31.9516 25.0219 32.5 24.4375 32.5H9.5625C8.97812 32.5 8.5 31.9516 8.5 31.2812V30.4688C8.5 29.7984 8.97812 29.25 9.5625 29.25H24.4375C25.0219 29.25 25.5 29.7984 25.5 30.4688V31.2812ZM25.5 23.9688V24.7812C25.5 25.4516 25.0219 26 24.4375 26H9.5625C8.97812 26 8.5 25.4516 8.5 24.7812V23.9688C8.5 23.2984 8.97812 22.75 9.5625 22.75H24.4375C25.0219 22.75 25.5 23.2984 25.5 23.9688ZM34 12.3805V13H22.6667V0H23.2068C23.7734 0 24.3135 0.253906 24.712 0.710938L33.3802 10.6641C33.7786 11.1211 34 11.7406 34 12.3805Z"
                            fill="black"
                          />
                        </Link>
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
                        width="34"
                        height="52"
                        viewBox="0 0 34 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleVerNominaClick(empleado)}
                      >
                        <Link to="/nomina">
                          <path
                            d="M19.8333 13.8125V0H2.125C0.947396 0 0 1.08672 0 2.4375V49.5625C0 50.9133 0.947396 52 2.125 52H31.875C33.0526 52 34 50.9133 34 49.5625V16.25H21.9583C20.7896 16.25 19.8333 15.1531 19.8333 13.8125ZM25.5 37.7812C25.5 38.4516 25.0219 39 24.4375 39H9.5625C8.97812 39 8.5 38.4516 8.5 37.7812V36.9688C8.5 36.2984 8.97812 35.75 9.5625 35.75H24.4375C25.0219 35.75 25.5 36.2984 25.5 36.9688V37.7812ZM25.5 31.2812C25.5 31.9516 25.0219 32.5 24.4375 32.5H9.5625C8.97812 32.5 8.5 31.9516 8.5 31.2812V30.4688C8.5 29.7984 8.97812 29.25 9.5625 29.25H24.4375C25.0219 29.25 25.5 29.7984 25.5 30.4688V31.2812ZM25.5 23.9688V24.7812C25.5 25.4516 25.0219 26 24.4375 26H9.5625C8.97812 26 8.5 25.4516 8.5 24.7812V23.9688C8.5 23.2984 8.97812 22.75 9.5625 22.75H24.4375C25.0219 22.75 25.5 23.2984 25.5 23.9688ZM34 12.3805V13H22.6667V0H23.2068C23.7734 0 24.3135 0.253906 24.712 0.710938L33.3802 10.6641C33.7786 11.1211 34 11.7406 34 12.3805Z"
                            fill="black"
                          />
                        </Link>
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
    