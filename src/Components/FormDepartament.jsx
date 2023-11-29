import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRoles } from "../logic/constantes";
import { authComponent } from "../logic/authComponent";

export function FormDepartament({
  setModalDepartament,
  fetchDepartaments,
  id,
  updateData,
  update,
  setUpdate,
}) {
  console.log(id);
  const navegar = useNavigate();
  const [name, setName] = useState(update ? updateData.name : "");
  const companyId = JSON.parse(localStorage.getItem("company")).id;
  const token = JSON.parse(localStorage.getItem("token"));
  const { Admin } = userRoles;

  // Comprueba que el componente siga teniendo una sesion activa y el rol sea permitido
  const auth = authComponent([Admin]);
  if (!auth) return navegar("/admin");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name) {
      console.log("Debes rellenar todos los campos");
    } else {
      let data = {
        name: name,
        companyId: companyId,
      };

      let dataEdit = {
        ...updateData,
        name: name,
      };

      fetch(
        update
          ? `http://localhost:3000/department/edit-department/${companyId}/${id}`
          : `http://localhost:3000/department/create-department/${companyId}`,
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
          console.log("Success:", data);
          if (data.newApartment) {
            setModalDepartament(false);
            fetchDepartaments();
            navegar("/departamentos");
          } else if (data.department) {
            setModalDepartament(false);
            fetchDepartaments();
            setUpdate(false);
            navegar("/departamentos");
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
      <section className="absolute top-0 left-0 bottom-0 right-0 bg-grisClaro flex flex-col justify-center items-center z-20">
        <BiArrowBack
          className="absolute top-2 left-3 z-10 text-3xl cursor-pointer"
          onClick={() => setModalDepartament(false)}
        ></BiArrowBack>
        <h1 className="text-4xl font-bold mb-10">
          {update ? "Editar Departamento" : "Crear Departamento"}
        </h1>
        <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-xl">
            Nombre del departamento
          </label>
          <input
            type="text"
            value={name}
            id="name"
            autoFocus
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
            placeholder="Ingresa el nombre del departamento"
          />

          <button className="bg-azulOscuro mx-auto px-3 py-2 font-bold text-grisClaro outline-none rounded-md mt-10">
            {update ? " Actualizar Departamento" : "Crear Departamento"}
          </button>
        </form>
      </section>
    </>
  );
}
