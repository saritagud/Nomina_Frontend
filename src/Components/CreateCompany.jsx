import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";

export function CreateCompany() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Name: name,
      Type: type,
    };

    fetch("http://localhost:3000/company/create-company", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
          <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
            <label htmlFor="name" className="text-xl">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              placeholder="Ingresa el nombre de tu empresa"
            />

            <label htmlFor="type" className="text-xl">
              Tipo
            </label>
            <input
              type="text"
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
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
