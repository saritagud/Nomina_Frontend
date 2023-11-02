export function Login() {
  let styleInput =
    "bg-azulClaro p-2 rounded-md text-white placeholder:text-white placeholder:font-extralight w-full";
  let styleLabel = "w-full text-lg";

  return (
    <>
      <section className="h-screen w-screen flex justify-center items-center font-Quicksand gap-52">
        <img
          src="src\assets\04f7517b2c2a955043a8a66ea51876e2-removebg-preview.png"
          alt="image"
        />

        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="font-Quicksand text-center text-4xl m-5">
            Inicio de Sesión
          </h1>
          <form className="flex flex-col w-full gap-4 justify-center items-center">
            <label className={styleLabel}>Usuario</label>
            <input
              type="text"
              className={styleInput}
              placeholder="Ingresa tu usuario"
            ></input>

            <label className={styleLabel}>Contraseña</label>
            <input
              type="password"
              className={styleInput}
              placeholder="Ingresa tu contraseña"
            ></input>

            <button className="bg-azulOscuro p-2 text-white w-1/2 rounded-md">
              Ingresar
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
