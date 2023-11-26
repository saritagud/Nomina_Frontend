import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from 'react-icons/fa';

export function Companies() {
  const [company, setCompany] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetch("http://localhost:3000/company/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setCompany(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  console.log(company);

  return (
    <>
      <div className="flex">
        <main className="w-screen h-screen p-10 flex flex-col gap-10">
          <section className="flex justify-between items-center">
            <h1 className="text-3xl">Empresas creadas</h1>
          </section>
          {company?.length === 0 ? (
            <strong className="text-xl">No hay empresas creadas aun</strong>
          ) : (
            <>
              <table className="bg-grisClaro rounded-md shadow-right-dark w-full px-4 border-separate border-spacing-0 border-spacing-y-5">
                <thead className="px-5">
                  <tr>
                    <th className="p-4 text-lg text-start ">Nombre</th>
                    <th className="p-4 text-lg text-start">Tipo</th>
                  </tr>
                </thead>
                {company.allCompanies.map((companys) => (
                  <tbody key={companys.id} className="px-5">
                    <tr className="bg-grisOscuro ">
                      <td className="p-4 text-lg rounded-l-2xl ">
                        {companys.name}
                      </td>
                      <td className="p-4 text-lg">{companys.type}</td>
                      <td className="relative p-4 text-lg rounded-r-2xl">
                        <input
                          type="checkbox"
                          name={`action${companys.id}`}
                          id={`action${companys.id}`}
                          className="hidden peer/action"
                        />
                        <label
                          htmlFor={`action${companys.id}`}
                          className="cursor-pointer"
                        >
                          <FaEllipsisV />
                        </label>
                        <div className="hidden absolute peer-checked/action:flex gap-4 right-52 top-1/2 transform -translate-y-1/2 bg-grisClaro shadow-right-dark p-5 rounded-lg z-10">
                          <Link
                            className="text-white w-28 rounded-md bg-azulClaro px-2 py-1 font-semibold text-center"
                            to={""}
                          >
                            Ver
                          </Link>
                          <button
                            className="text-white w-28 rounded-md bg-azulClaro px-2 py-1 font-semibold"
                            onClick={() => {}}
                          >
                            Editar
                          </button>
                          <button
                            className="text-white w-28 rounded-md bg-red-600 px-2 py-1 font-semibold"
                            onClick={() => {}}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </>
          )}
        </main>
      </div>
    </>
  );
}
