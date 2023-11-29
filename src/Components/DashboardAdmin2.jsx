import { Link } from "react-router-dom";
export function DashboardAdmin2() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  let styleLink =
    "bg-grisOscuro h-24 w-full rounded-md text-lg text-center flex justify-center items-center border-2 border-grisOscuro shadow-right-dark";
  return (
    <div className="">
      <section className="flex flex-col justify-center items-end p-20 gap-10 font-Quicksand text-center ">
        <section className="bg-grisOscuro rounded-md p-7 flex justify-between h-36 shadow-right-dark w-full border-2 border-grisOscuro">
          <div className="flex flex-col justify-between ">
            <p className="text-lg">Bienvenid@ {user.name}!</p>

            <h1 className="text-3xl">Dashboard</h1>
          </div>
        </section>
        {user.role === "admin" ? (
          <section className="flex justify-between w-full gap-10">
            <div className="flex flex-col gap-10 w-full">
              <Link className={styleLink} to={"/usuarios"}>
                Ver usuarios
              </Link>
              <Link className={styleLink} to={"/empresa"}>
                Empresa
              </Link>
            </div>

            <div className="flex flex-col gap-10 w-full">
              <Link className={styleLink} to={"/pre-nomina"}>
                Pre-Nomina
              </Link>

              <Link className={styleLink} to={"/historial"}>
                Nominas
              </Link>

              <Link className={styleLink} to={"/departamentos"}>
                Departamentos
              </Link>
            </div>
          </section>
        ) : (
          <div className="flex justify-between w-full gap-10">
            <div className="flex gap-10 w-full">
              <Link className={styleLink} to={"/usuarios"}>
                Ver usuarios
              </Link>
              <Link className={styleLink} to={"/empresa"}>
                Empresa
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
