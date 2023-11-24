import { SideBar } from "./Sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

export function Departaments() {
  const [department, setDepartment] = useState([]);
  const companyID = JSON.parse(localStorage.getItem("company")).id;

  useEffect(() => {
    fetch(`http://localhost:3000/department/all/${companyID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.departments);
        if (data.departments) {
          setDepartment(data.departments);
        } else {
          console.log("Error:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="h-full">
      <SideBar />
      <main className="w-screen  p-10 flex justify-end">
        <section className="flex  flex-col w-4/5 gap-10">
          <h1 className="text-3xl font-bold mt-10">Departamentos</h1>
          {department.map((departments) => (
            <div key={departments.id} className="flex items-center">
              <div className="w-full flex justify-between items-center bg-grisClaro rounded-md mb-2 shadow-right-dark h-16">
                <div className="w-full p-4 text-lg">{departments.name}</div>
                <td className="relative p-4 text-lg rounded-r-2xl">
                  <input
                    type="checkbox"
                    name={`action${department.id}`}
                    id={`action${department.id}`}
                    className="hidden peer/action"
                  />
                  <label
                    htmlFor={`action${department.id}`}
                    className="cursor-pointer"
                  >
                    <FaEllipsisV />
                  </label>
                  <div className="hidden absolute peer-checked/action:flex gap-4 right-14 top-1/2 transform -translate-y-1/2 bg-grisClaro shadow-right-dark p-5 rounded-lg z-10">
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
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
