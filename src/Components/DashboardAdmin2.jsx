import { SideBar } from "./Sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FormDepartament } from "./FormDepartament";
export function DashboardAdmin2() {
  const [modalDepartament, setModalDepartament] = useState(false);
  const name = JSON.parse(localStorage.getItem("user")).name;
  let styleLink =
    "bg-grisOscuro h-20 shadow-right-dark  rounded-md text-lg text-center flex justify-center items-center";
  let styleLink2 = "border-b-2 border-black/50 pb-5";
  return (
    <div className="flex">
      <SideBar />
      <section className="flex flex-col justify-center h-screen  w-screen items-center p-20 gap-10 font-Quicksand text-center">
        <section className="bg-grisOscuro rounded-md p-7 w-full flex justify-between h-40 shadow-right-dark ">
          <div className="flex flex-col justify-between h-full ">
            <p className="text-lg">Bienvenid@ {name}!</p>

            <h1 className="text-3xl">Dashboard</h1>
          </div>
        </section>

        <section className="flex justify-between w-full gap-10">
          <div className="flex flex-col gap-10 w-full">
            <Link className={styleLink} to={"/registro"}>
              Agregar Usuarios
            </Link>
            <Link className={styleLink} to={"/usuarios"}>
              Ver usuarios
            </Link>
            <Link className={styleLink} to={"/configuraciones"}>
              Ver Configuraciones
            </Link>
          </div>

          <div className="w-3/5 h-80 rounded-md bg-grisOscuro flex justify-center items-center p-5 shadow-right-dark ">
            <div className="flex flex-col justify-evenly  bg-grisClaro p-3 w-full h-full rounded-md text-lgt">
              <Link className={styleLink2} to={"/pre-nomina"}>
                Pre-Nomina
              </Link>

              <Link className={styleLink2} to={"/nominas"}>
                Nominas
              </Link>

              <button
                className=""
                onClick={() => setModalDepartament(!modalDepartament)}
              >
                Crear departamento
              </button>
            </div>
          </div>
        </section>
      </section>
      {modalDepartament && (
        <FormDepartament setModalDepartament={setModalDepartament} />
      )}
    </div>
  );
}
