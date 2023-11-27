import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FormDepartament } from "./FormDepartament";
import ModalDelete from "./ModalDelete";
import { deleteDepartment } from "../services/departments";
import { deleteItemFromState } from "../logic/functions";
export function Departaments() {
  const [department, setDepartment] = useState([]);
  const [modalDepartament, setModalDepartament] = useState(false);
  const [modalUpdateDepartament, setModalUpdateDepartament] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [idDeparament, setIdDeparament] = useState("");
  const [idDelete, setIdDelete] = useState("");
  const companyID = JSON.parse(localStorage.getItem("company")).id;
  const token = JSON.parse(localStorage.getItem("token"));

  const fetchDepartments = () => {
    fetch(`http://localhost:3000/department/all/${companyID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Success:", data.departments);
        if (data.departments) {
          setDepartment(data.departments);
        } else {
          console.log("Error:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const confirmDelete = async () => {
    const res = await deleteDepartment(token, companyID, idDelete);
    if (res.message) {
      const newState = deleteItemFromState(idDelete, [...department]);
      setDepartment(newState);
    } else {
      console.error(res);
    }
  };

  return (
    <div className="h-full">
      <main className="w-full p-10 ">
        <section className="flex flex-col w-full gap-10">
          <div className="flex justify-between w-full p-5">
            <h1 className="text-3xl font-bold ">Departamentos</h1>
            <button
              className="bg-azulClaro rounded-md px-8 py-3 text-white font-semibold text-center"
              onClick={() => setModalDepartament(!modalDepartament)}
            >
              Agregar
            </button>
          </div>
          {department.length === 0 ? (
            <strong className="text-xl">No hay departamentos creados</strong>
          ) : (
            department.length > 0 && (
              <>
                {department.map((departments) => (
                  <div key={departments.id} className="flex items-center">
                    <div className="w-full flex justify-between items-center bg-grisClaro rounded-md mb-2 shadow-right-dark h-16 border-2 border-grisOscuro">
                      <div className="w-full p-4 text-lg">
                        {departments.name}
                      </div>
                      <td className="relative p-4 text-lg rounded-r-2xl">
                        <input
                          type="checkbox"
                          name={`action${departments.id}`}
                          id={`action${departments.id}`}
                          className="hidden peer/action"
                        />
                        <label
                          htmlFor={`action${departments.id}`}
                          className="cursor-pointer"
                        >
                          <FaEllipsisV />
                        </label>
                        <div className="hidden absolute peer-checked/action:flex gap-4 right-14 top-1/2 transform -translate-y-1/2 bg-grisClaro shadow-right-dark p-5 rounded-lg z-10">
                          <button
                            key={departments.id}
                            className="text-white w-28 rounded-md bg-azulClaro px-2 py-1 font-semibold"
                            onClick={() => {
                              setModalUpdateDepartament(
                                !modalUpdateDepartament
                              );
                              setModalDepartament(!modalDepartament);
                              setIdDeparament(departments.id);
                              
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="text-white w-28 rounded-md bg-red-600 px-2 py-1 font-semibold"
                            onClick={() => {
                              setModalDelete(true);
                              setIdDelete(departments.id);
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </div>
                  </div>
                ))}
              </>
            )
          )}
        </section>
      </main>
      {modalDepartament && (
        <FormDepartament
          setModalDepartament={setModalDepartament}
          fetchDepartaments={fetchDepartments}
          id={idDeparament}
          updateData={department}
          update={modalUpdateDepartament}
          setUpdate={setModalUpdateDepartament}
        />
      )}

      {modalDelete && (
        <ModalDelete
          peticion={confirmDelete}
          setStateModal={setModalDelete}
          id={idDelete}
        />
      )}
    </div>
  );
}
