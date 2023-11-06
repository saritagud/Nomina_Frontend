import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";

export function CreateCompany() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="bg-grisOscuro h-36 border-black/40 border-r-4 border-b-4 w-full rounded-md text-lg text-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        Crear Empresa
      </button>
      {isOpen && (
        <section className="absolute top-0 left-0 bottom-0 right-0 bg-grisClaro flex flex-col justify-center items-center gap-10">
          <BiArrowBack
            className="absolute top-2 left-3 z-10 text-3xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          ></BiArrowBack>
          <h1 className="text-3xl text-start ">Crear Empresa</h1>
          <form className="flex flex-col gap-5 ">
            <label htmlFor="name" className="text-xl">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              placeholder="Ingresa el nombre de tu empresa"
            />

            <label htmlFor="tipo" className="text-xl">
              Tipo
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              placeholder="Ingresa el tipo de tu empresa"
            />

            <button className="bg-azulOscuro mx-auto px-3 py-2 font-bold text-grisClaro outline-none rounded-md mt-10">
              Crear Empresa
            </button>
          </form>
        </section>
      )}
    </>
  );
}
