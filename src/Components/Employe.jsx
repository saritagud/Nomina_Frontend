import { useEffect, useState } from "react";
import { SideBar } from "./Sidebar";
import { useParams } from "react-router-dom";
import { formatearFecha } from "../logic/functions";

export function Employe() {
  const [employe, setEmploye] = useState([]);
  const { emploID } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(emploID);
  useEffect(() => {
    fetch(`http://localhost:3000/employee/find-employee/${emploID}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setEmploye(data.employee);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  console.log(employe);

  return (
    <>
      <SideBar />
      <div className="flex justify-end h-full">
        <main className="p-10 flex flex-col gap-4 w-4/5">
          {employe && (
            <>
              <section className="flex justify-between items-center">
                <h1 className="text-3xl">Empleado</h1>
                <div className="m-2">
                  <button className="bg-azulClaro m-4 p-2 pr-6 pl-6 text-white rounded-md">
                    Eliminar
                  </button>
                  <button className="bg-azulClaro p-2 pr-6 pl-6 text-white rounded-md">
                    Editar
                  </button>
                </div>
              </section>
              <>
                <section className="bg-grisClaro rounded-md shadow-right-dark w-full px-4 border-separate border-spacing-0 border-spacing-y-4  grid grid-rows-4 gap-4">
                  <div className="col-span-1">
                    <h1 className="text-3xl mt-8 ml-4">Datos</h1>
                  </div>
                  <div className="row-start-2 row-span-3 break-all grid grid-cols-4 grid-rows-4 gap-4 p-4 h-full">
                    <div className="nombre">
                      <h1>Nombre Completo</h1>
                      <h1>
                        {employe.name} {employe.lastName}
                      </h1>
                    </div>
                    <div className="nombre">
                      <h1>Correo</h1>
                      <h1>{employe.email}</h1>
                    </div>
                    <div className="nombre">
                      <h1>Direccion</h1>
                      <h1>{employe.address}</h1>
                    </div>
                    <div className="nombre">
                      <h1>Telefono</h1>
                      <h1>{employe.phone}</h1>
                    </div>
                    <div className="nombre">
                      <h1>Cedula</h1>
                      <h1>{employe.identityCard}</h1>
                    </div>
                    <div className="nombre">
                      <h1>Genero</h1>
                      <h1>{employe.gender}</h1>
                    </div>
                    <div className="nombre">
                      <h1>Cargo</h1>
                      <h1>{employe.charge}</h1>
                    </div>
                    <div className="nombre">
                      <h1>Fecha de Nacimiento</h1>
                      <h1>{formatearFecha(employe.birthdate)}</h1>
                    </div>
                    <div className="nombre">
                      <h1>Fecha de inicio</h1>
                      <h1>{formatearFecha(employe.startDate)}</h1>
                    </div>
                    <div className="nombre">
                      <h1>Esatdo Civil</h1>
                      <h1>{employe.civilStatus}</h1>
                    </div>
                    <div className="nombre">
                      <h1>Salario Base</h1>
                      <h1>{employe.baseSalary}</h1>
                    </div>
                  </div>
                </section>
                  <div className="flex justify-end m-2">
                    <div className="flex items-center gap-3">
                    <p>Agregar: </p>
                      <button className="bg-azulClaro p-2 pr-6 pl-6 text-white rounded-md">
                        Agregar Deduccion
                      </button>
                      <button className="bg-azulClaro p-2 pr-6 pl-6 text-white rounded-md">
                        Agregar Percepcion
                      </button>
                    </div>
                  </div>
              </>
            </>
          )}
        </main>
      </div>
    </>
  );
}
