import { SideBar } from "./Sidebar";
import { Link } from "react-router-dom";
import { CreateCompany } from "./CreateCompany";
import { useState } from "react";
export function DashboardSuperAdmin() {
  const [modalCreateCompany, setModalCreateCompany] = useState(false)
  localStorage.removeItem('company')
  const name = JSON.parse(localStorage.getItem("user")).name;

  let styleLink =
    "bg-grisOscuro h-24 border-black/40 border-r-4 border-b-4 w-full rounded-md text-lg text-center flex justify-center items-center";
  return (
    <div className="h-full">
      <SideBar />
      <section className="flex flex-col w-screen items-end p-20 gap-10 font-Quicksand pb-20">
        <section className="bg-grisOscuro rounded-md p-7  flex justify-between h-40 border-black/40 border-r-4 border-b-4 w-4/5">
          <div className="flex flex-col justify-between h-full ">
            <p className="text-lg">Bienvenid@ {name}!</p>

            <h1 className="text-3xl">Dashboard</h1>
          </div>
        </section>

        <section className="flex justify-between w-4/5 gap-10">
          <div className="flex flex-col gap-10 w-full">
            <button
              className={styleLink}
              onClick={() => setModalCreateCompany(true)}
            >
              Crear Empresa
            </button>
          </div>
          <div className="flex flex-col gap-10 w-full">
            <Link className={styleLink} to={"/empresas"}>
              Ver Empresas
            </Link>
          </div>
        </section>
      </section>
      {modalCreateCompany && (
        <CreateCompany setModalCreateCompany={setModalCreateCompany}/>
      )}
    </div>
  );
}
