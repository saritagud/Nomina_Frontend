import { SideBar } from "./Sidebar";
import { useState, useEffect } from "react";

export function Company() {
  const [company, setCompany] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/company/all", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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

  return (
    <>
      <div className="flex">
        <SideBar />
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
                        {companys.Name}
                      </td>
                      <td className="p-4 text-lg">{companys.Type}</td>
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
