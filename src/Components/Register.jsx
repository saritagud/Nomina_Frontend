export function Register() {
  let styleInput =
    "bg-azulClaro p-4 rounded-md text-white placeholder:text-white placeholder:font-extralight w-full";
  let styleLabel = "w-full text-lg";

  return (
    <>
      <section className="h-screen w-screen gap-10 flex justify-center items-center font-Quicksand gap-5 p-8">
        <form className=" w-full gap-4 justify-center items-center grid grid-cols-2">
          <div className="p-8 grid grid-rows-4">
            <div className="1">
              <label className={styleLabel}>Nombre</label>
              <input
                type="text"
                className={styleInput}
                placeholder="Ingresa el nombre"
              ></input>
            </div>
            <div className="2">
              <label className={styleLabel}>Apellido</label>
              <input
                type="password"
                className={styleInput}
                placeholder="Ingresa el apellido"
              ></input>
            </div>
            <div className="2">
              <label className={styleLabel}>Email</label>
              <input
                type="password"
                className={styleInput}
                placeholder="Ingresa el email"
              ></input>
            </div>
            <div className="2">
              <label className={styleLabel}>Numero de telefono</label>
              <input
                type="password"
                className={styleInput}
                placeholder="Ingresa el telefono"
              ></input>
            </div>
          </div>
          <div className="p-8 grid grid-rows-4 ">
            <div className="1">
              <label className={styleLabel}>Direccion</label>
              <input
                type="password"
                className={styleInput}
                placeholder="Ingresa tu direccion"
              ></input>
            </div>
            <div className="1">
              <label className={styleLabel}>Direccion 2</label>
              <input
                type="password"
                className={styleInput}
                placeholder="Ingresa tu direccion"
              ></input>
            </div>
            <div className="3">
              <label className={styleLabel}>Rol</label>
              <input
                type="text"
                className={styleInput}
                placeholder="Elige el rol"
              ></input>
            </div>
            <div className="text-center">
              <button className="bg-azulOscuro p-4 text-white w-1/2 rounded-md mt-6">
                Registrar Usuario
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
  