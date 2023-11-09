import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FormDepartament({ setModalDepartament }) {
  const navegar = useNavigate();
  const [name, setName] = useState("");
  const companyId = JSON.parse(localStorage.getItem("company")).companyId;

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: name,
      companyId: companyId,
    };

    fetch(`http://localhost:3000/department/create-department/${companyId}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.newApartment);
        if (data.newApartment) {
          setModalDepartament(false);
          navegar("/admin");
        } else {
          console.log("Error:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <section className="absolute top-0 left-0 bottom-0 right-0 bg-grisClaro flex flex-col justify-center items-center gap-10">
        <BiArrowBack
          className="absolute top-2 left-3 z-10 text-3xl cursor-pointer"
          onClick={() => setModalDepartament(false)}
        ></BiArrowBack>
        <h2 className="text-3xl text-start ">Crear Departamento</h2>
        <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-xl">
            Nombre del departamento
          </label>
          <input
            type="text"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
            placeholder="Ingresa el nombre de tu empresa"
          />

          <button className="bg-azulOscuro mx-auto px-3 py-2 font-bold text-grisClaro outline-none rounded-md mt-10">
            Crear Departamento
          </button>
        </form>
      </section>
    </>
  );
}
