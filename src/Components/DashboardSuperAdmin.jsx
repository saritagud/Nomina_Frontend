import { SideBar } from "./Sidebar";
import { Link } from "react-router-dom";

export function DashboardSuperAdmin() {
  let styleLink =
    "bg-grisOscuro h-36 border-black/40 border-r-4 border-b-4 w-full rounded-md text-lg text-center flex justify-center items-center";
  return (
    <div className="flex">
      <SideBar />
      <section className="flex flex-col justify-center h-screen  w-screen items-center p-20 gap-10 font-Quicksand">
        <section className="bg-grisOscuro rounded-md p-7 w-full flex justify-between h-40 border-black/40 border-r-4 border-b-4">
          <div className="flex flex-col justify-between h-full ">
            <p className="text-lg">Bienvenido @user!</p>

            <h1 className="text-3xl">Dashboard</h1>
          </div>
        </section>

        <section className="flex justify-between w-full gap-10">
          <div className="flex flex-col gap-10 w-full">
            <Link className={styleLink}>Crear Empresa</Link>
            <Link className={styleLink}>Agregar Usuarios</Link>
          </div>

          <div className="flex flex-col gap-10 w-full">
            <Link className={styleLink}>Ver Empresas</Link>
            <Link className={styleLink}>Todos los usuarios</Link>
          </div>
        </section>
      </section>
    </div>
  );
}
