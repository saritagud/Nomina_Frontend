import { useEffect, useState } from "react";
import { CreateCompany } from "./CreateCompany";
import { userRoles } from "../logic/constantes";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export function Company() {
  const [dataCompany, setDataCompany] = useState([]); //la data del fetch
  const [modalCompany, setModalCompany] = useState(false); //para abrir el modal
  const [updateCompany, setUpdateCompany] = useState(false); //para saber que se va a editar
  const token = JSON.parse(localStorage.getItem("token"));
  const companyID = JSON.parse(localStorage.getItem("company")).id;
  const user = JSON.parse(localStorage.getItem("user")).role;
  const { SuperAdmin } = userRoles;
  const navegar = useNavigate();
  const fetchCompany = () => {
    fetch(`http://localhost:3000/company/find-company/${companyID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Success:", data);
        setDataCompany(data.company);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <div className="h-full">
      <section className="p-14">
        <div className="flex items-center gap-5 mb-10">
          <BiArrowBack
            className="text-3xl cursor-pointer translate-y-[2px]"
            onClick={() => navegar("/admin")}
          />
          <h1 className="text-3xl">Empresa</h1>
        </div>
        {user === SuperAdmin && (
          <div className="flex justify-end w-full gap-5 mb-5">
            <button
              className="bg-azulClaro p-2 w-32 text-lg text-white rounded-md font-semibold"
              onClick={() => {
                setModalCompany(true);
                setUpdateCompany(true);
              }}
            >
              Editar
            </button>
          </div>
        )}
        <section className="bg-grisClaro rounded-md shadow-right-dark w-full pt-6 py-10 px-10 flex flex-col gap-10">
          <h1 className="text-3xl font-bold">Informacion de la empresa</h1>
          <div className="grid grid-cols-[auto,1fr,auto,1fr] gap-y-10 gap-x-10 px-5 items-center">
            <p className="text-lg font-bold">Nombre</p>
            <p className="text-lg break-words">
              {dataCompany.name} {dataCompany.lastName}
            </p>
            <p className="text-lg font-bold">Moneda</p>
            <p className="text-lg break-words">{dataCompany.currency}</p>
            <p className="text-lg font-bold">Pais</p>
            <p className="text-lg break-words">{dataCompany.country}</p>
            <p className="text-lg font-bold">Tipo</p>
            <p className="text-lg break-words">{dataCompany.type}</p>
          </div>
        </section>
      </section>
      {modalCompany && (
        <CreateCompany
          modal={setModalCompany} //para cerrar el modal
          update={updateCompany} //para saber si se va editar
          setUpdate={setUpdateCompany} //para cambiar el estado
          infoUpdate={dataCompany} //la info a editar
          id={companyID} //el id de la empresa
          fetchCompany={fetchCompany}
        />
      )}
    </div>
  );
}
