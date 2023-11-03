import { BiArrowBack } from "react-icons/bi";

export function FormEmployeed({setModalRegister}) {
  return (
    <section className="absolute top-0 left-0 bottom-0 right-0 bg-grisClaro flex justify-center items-center">
      <BiArrowBack className="absolute top-2 left-3 z-10 text-3xl cursor-pointer" onClick={() => setModalRegister(false)}></BiArrowBack>
      <form className="grid grid-cols-2 gap-x-20 gap-y-3">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-xl">Nombre</label>
            <input type="text" name="name" id="name" className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80" placeholder="Ingresa el nombre"/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="last_name" className="text-xl">Apellido</label>
            <input type="text" name="last_name" id="last_name" className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80" placeholder="Ingresa el apellido"/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="CI" className="text-xl">Cedula</label>
            <input type="tel" name="CI" id="CI" className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80" placeholder="Ingresa la cedula"/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="birthdate" className="text-xl">Fecha de nacimiento</label>
            <input type="date" name="birthdate" id="birthdate" className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="gender" className="text-xl">Genero</label>
            <select name="gender" id="gender" className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80">
              <option value="0" disabled selected>-- Seleccionar --</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="text-xl">Direccion</label>
            <input type="text" name="address" id="address" className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80" placeholder="Ingresa la direccion"/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xl">Email</label>
            <input type="email" name="email" id="email" className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80" placeholder="Ingresa el email"/>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-xl">Numero de telefono</label>
            <input type="tel" name="phone" id="phone" className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80" placeholder="Ingresa el telefono"/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="civil_status" className="text-xl">Estado Civil</label>
            <select name="civil_status" id="civil_status" className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80">
              <option value="0" disabled selected>-- Seleccionar --</option>
              <option value="Soltero/a">Soltero/a</option>
              <option value="Casado/a">Casado/a</option>
              <option value="Divorciado/a">Divorciado/a</option>
              <option value="Viudo/a">Viudo/a</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="start_date" className="text-xl">Fecha de inicio del cargo</label>
            <input type="date" name="start_date" id="start_date" className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="charge" className="text-xl">Cargo</label>
            <input type="text" name="charge" id="charge" className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80" placeholder="Ingresa el cargo"/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="department" className="text-xl">Departamento</label>
            <input type="text" name="department" id="department" className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80" placeholder="Ingresa el departamento"/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="base_salary" className="text-xl">Salario Base</label>
            <input type="text" name="base_salary" id="base_salary" className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80" placeholder="Ingresa el salario base"/>
          </div>
          <button className="bg-azulOscuro mx-auto mt-auto px-3 py-2 font-bold text-grisClaro outline-none rounded-md">Registrar Usuario</button>
        </div>
      </form>
    </section>
  );
}
  