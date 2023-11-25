import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authComponent } from "../logic/authComponent";
import { userRoles } from "../logic/constantes";

export function CreateCompany({setModalCreateCompany}) {
  const navegar = useNavigate()
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const { SuperAdmin } = userRoles

  // Comprueba que el componente siga teniendo una sesion activa y el rol sea permitido
  const auth = authComponent([SuperAdmin])
  if (!auth) return navegar('/')

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: name,
      type: type,
    };

    fetch("http://localhost:3000/company/create-company", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data.newCompany);
        if (data.newCompany) {
          localStorage.setItem('company', JSON.stringify(data.newCompany))
          setModalCreateCompany(false)
          navegar('/registro')
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
          onClick={() => setModalCreateCompany(false)}
        ></BiArrowBack>
        <h2 className="text-3xl text-start ">Crear Empresa</h2>
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
    </>
  );
}
