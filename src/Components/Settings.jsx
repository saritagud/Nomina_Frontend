import React, { useState } from "react";
import { SideBar } from "./Sidebar";
import { Link } from "react-router-dom";

export function Settings() {
  const [empleyoees, setEmpleyoees] = useState([
    { id: 1, nombre: "Configuración 1" },
    { id: 2, nombre: "Configuración 2" },
    { id: 3, nombre: "Configuración 3" },
    { id: 4, nombre: "Configuración 4" },
    { id: 5, nombre: "Configuración 5" },
    { id: 6, nombre: "Configuración 6" },
  ]);

  return (
    <div className="h-full">
      <main className="w-full p-10 flex ">
        <section className="flex flex-col w-full gap-5">
          <h1 className="text-3xl font-bold">Configuraciones</h1>
          {empleyoees?.map((empleado) => (
            <div key={empleado.id} className="flex items-center">
              <div
                className="w-full flex justify-between items-center bg-grisOscuro rounded-md mb-2 shadow-right-dark"
                style={{ backgroundColor: "#F1F2F7" }}
              >
                <div className="w-full p-4 text-lg">{empleado.nombre}</div>
                <Link to={`/eliminar-configuracion/${empleado.id}`}>
                  <svg
                    width="10"
                    height="20"
                    viewBox="0 0 10 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      display: "block",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    <path
                      d="M5.46094 10.2437C7.94844 10.2437 9.96094 11.9966 9.96094 14.1631C9.96094 16.3296 7.94844 18.0824 5.46094 18.0824C2.97344 18.0824 0.960938 16.3296 0.960938 14.1631C0.960938 11.9966 2.97344 10.2437 5.46094 10.2437ZM0.960938 4.58244C0.960938 6.74897 2.97344 8.5018 5.46094 8.5018C7.94844 8.5018 9.96094 6.74897 9.96094 4.58244C9.96094 2.41591 7.94844 0.663086 5.46094 0.663086C2.97344 0.663086 0.960938 2.41591 0.960938 4.58244ZM0.960938 23.7437C0.960938 25.9103 2.97344 27.6631 5.46094 27.6631C7.94844 27.6631 9.96094 25.9103 9.96094 23.7437C9.96094 21.5772 7.94844 19.8244 5.46094 19.8244C2.97344 19.8244 0.960938 21.5772 0.960938 23.7437Z"
                      fill="black"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
