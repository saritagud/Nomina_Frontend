import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authComponent } from "../logic/authComponent";
import { userRoles } from "../logic/constantes";

export function CreateCompany({
  setModalCreateCompany,
  modal,
  update,
  setUpdate,
  infoUpdate,
  id,
  fetchCompany,
}) {
  const navegar = useNavigate();
  const [name, setName] = useState(update ? infoUpdate.name : "");
  const [type, setType] = useState(update ? infoUpdate.type : "");
  const [currency, setCurrency] = useState(update ? infoUpdate.currency : "");
  const [country, setCountry] = useState(update ? infoUpdate.country : "");
  const token = JSON.parse(localStorage.getItem("token"));
  const { SuperAdmin } = userRoles;

  const auth = authComponent([SuperAdmin]);
  if (!auth) return navegar("/");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !type || !currency || !country) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    const data = {
      name: name,
      type: type,
      currency: currency,
      country: country,
    };

    let dataEdit = {
      ...infoUpdate,
      name: name,
      type: type,
      currency: currency,
      country: country,
    };

    fetch(
      update
        ? `http://localhost:3000/company/edit-company/${id}`
        : "http://localhost:3000/company/create-company",
      {
        method: update ? "PUT" : "POST",
        body: update ? JSON.stringify(dataEdit) : JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.newCompany) {
          localStorage.setItem("company", JSON.stringify(data.newCompany));
          setModalCreateCompany(false);
          navegar("/registro");
        } else if (data.newCompanyInfo) {
          modal(false);
          setUpdate(false);
          fetchCompany();
          navegar("/empresa");
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
          onClick={() => {
            setModalCreateCompany(false);
            modal(false);
          }}
        ></BiArrowBack>
        <h1 className="text-4xl font-bold mb-6">
          {update ? "Editar Empresa" : "Crear Empresa"}
        </h1>
        <form className="flex flex-col justify-center items-center gap-10 " onSubmit={handleSubmit}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-5">
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
            </div>

            <div className="flex flex-col gap-5">
              <label htmlFor="currency" className="text-xl">
                Moneda
              </label>
              <input
                type="text"
                name="currency"
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
                placeholder="Ingresa la moneda de tu empresa"
              />

              <label htmlFor="country" className="text-xl">
                País
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
                placeholder="Ingresa el país de tu empresa"
              />
            </div>
          </div>
          <button className="bg-azulOscuro mx-auto px-3 py-2 font-bold text-grisClaro outline-none rounded-md mt-10">
            {update ? "Editar Empresa" : "Crear Empresa"}
          </button>
        </form>
      </section>
    </>
  );
}
