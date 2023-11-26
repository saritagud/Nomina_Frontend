import { Link } from "react-router-dom";
import { useState } from "react";
import { FormDepartament } from "./FormDepartament";
export function DashboardAdmin2() {
  const [modalDepartament, setModalDepartament] = useState(false);
  const name = JSON.parse(localStorage.getItem("user")).name;
  let styleLink =
    "bg-grisOscuro h-24 w-full rounded-md text-lg text-center flex justify-center items-center border-2 border-grisOscuro shadow-right-dark";
  return (
    <div className="">
      <section className="flex flex-col justify-center items-end p-20 gap-10 font-Quicksand text-center ">
        <section className="bg-grisOscuro rounded-md p-7 flex justify-between h-36 shadow-right-dark w-full border-2 border-grisOscuro">
          <div className="flex flex-col justify-between ">
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

          <div className="flex flex-col gap-10 w-full">
            <Link className={styleLink} to={"/pre-nomina"}>
              Pre-Nomina
            </Link>

            <Link className={styleLink} to={"/nominas"}>
              Nominas
            </Link>

            <button
              className={styleLink}
              onClick={() => setModalDepartament(!modalDepartament)}
            >
              Crear departamento
            </button>
          </div>
        </section>
      </section>
      {modalDepartament && (
        <FormDepartament setModalDepartament={setModalDepartament} />
      )}
    </div>
  );
}
