import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRoles } from "../logic/constantes";
import { authComponent } from "../logic/authComponent";

export function AddDeductions({ setModalDeduction }) {
  const navegar = useNavigate();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [taxInformation, setTaxInformation] = useState("");

  const { Admin } = userRoles;

  const handleSubmit = (event) => {
    event.preventDefault();

    // Comprueba que el componente siga teniendo una sesion activa y el rol sea permitido
    const auth = authComponent([Admin]);
    if (!auth) return navegar("/admin");

    if ((!name, !amount, !taxInformation)) {
      console.log("Debes rellenar todos los campos");
    } else {
      const data = {
        name: name,
        amount: amount,
        taxInformation: taxInformation,
      };

      fetch("http://localhost:3000/deduction/create-deduction", {
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
            setModalDeduction(false);
            navegar("/admin");
          } else {
            console.log("Error:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <>
      <section className="absolute top-0 left-0 bottom-0 right-0 bg-grisClaro flex flex-col justify-center items-center gap-10">
        <BiArrowBack
          className="absolute top-2 left-3 z-10 text-3xl cursor-pointer"
          onClick={() => setModalDeduction(false)}
        ></BiArrowBack>
        <h2 className="text-3xl text-start ">Crear Departamento</h2>
        <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-xl">
            Nombre de la deduccion
          </label>
          <input
            type="text"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
            placeholder="Ingresa el nombre de tu empresa"
          />

          <label htmlFor="name" className="text-xl">
            Monto
          </label>
          <input
            type="text"
            value={amount}
            id="name"
            onChange={(e) => setAmount(e.target.value)}
            className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
            placeholder="Ingresa el nombre de tu empresa"
          />

          <label htmlFor="name" className="text-xl">
            Descripcion
          </label>
          <input
            type="text"
            value={taxInformation}
            id="name"
            onChange={(e) => setTaxInformation(e.target.value)}
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
