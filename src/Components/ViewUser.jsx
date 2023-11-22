import { SideBar } from "./Sidebar";

export function ViewUser() {
  return (
    <div className="flex">
    <SideBar/>
      <section className="flex flex-col justify-center h-full w-screen items-center p-20 gap-10 font-Quicksand text-center">
        <div className="">
          <button>Eliminar</button>
          <button>Editar</button>
        </div>

        <div className="h-80 bg-grisClaro w-1/2 rounded-md p-5 ">
          <h1 className="text-left text-xl font-bold mb-5">Informacion del usuario</h1>

          <div className="flex justify-between items-center w-full h-full">
            <div className="  ">
              <p>Nombre</p>
              <p>Apellido</p>
              <p>Email</p>
            </div>

            <div>
              <p>Telefono</p>
              <p>Direccion</p>
              <p>Role</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
