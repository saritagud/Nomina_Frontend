import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import ModalDelete from "./ModalDelete";
import { deleteUser } from "../services/users";
import { deleteItemFromState } from "../logic/functions";
import { BiArrowBack } from "react-icons/bi";

export function Users() {
  const [users, setUsers] = useState([]);
  const [userDelete, setUserDelete] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const companyID = JSON.parse(localStorage.getItem("company")).id;
  const token = JSON.parse(localStorage.getItem("token"));
  const navegar = useNavigate();
  useEffect(() => {
    // Realizar solicitud GET para obtener datos de usuarios
    fetch(`http://localhost:3000/user/all-company/${companyID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Verificar si la respuesta contiene la propiedad "users"
        if (data.users) {
          setUsers(data.users); // Utilizar la propiedad "users" de la respuesta como el array de usuarios
        } else {
          console.error(
            "La respuesta de la API no contiene un array de usuarios:",
            data
          );
        }
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  }, []);

  const confirmDelete = async () => {
    const res = await deleteUser(token, companyID, userDelete);
    if (res.message) {
      const newState = deleteItemFromState(userDelete, [...users]);
      setUsers(newState);
    } else {
      console.error(res);
    }
  };

  return (
    <>
      <div className="h-full">
        <main className="w-full p-10 flex flex-col gap-10">
          <section className="flex justify-between items-center w-full">
            <div className="flex items-center gap-5">
              <BiArrowBack
                className="text-3xl cursor-pointer translate-y-[2px]"
                onClick={() => navegar("/admin")}
              />
              <h1 className="text-3xl">Usuarios</h1>
            </div>
            <form className="flex justify-center">
              <Link
                className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold text-center"
                to="/registro"
              >
                Agregar
              </Link>
            </form>
          </section>

          {users?.length === 0 ? (
            <strong className="text-xl">No hay usuarios creados aún</strong>
          ) : (
            users?.length > 0 && (
              <>
                <table className="bg-grisClaro rounded-md shadow-right-dark  px-4 border-separate border-spacing-0 border-spacing-y-4 w-full">
                  <thead className="px-5">
                    <tr>
                      <th className="p-4 text-lg text-start">Nombre</th>
                      <th className="p-4 text-lg text-start">Correo</th>
                      <th className="p-4 text-lg text-start">Rol</th>
                      <th className="p-4 text-lg text-start">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="px-5">
                    {users.map((user) => (
                      <tr className="bg-grisOscuro" key={user.id}>
                        <td className="p-4 text-lg rounded-l-2xl">
                          {user.name}
                        </td>
                        <td className="p-4 text-lg">{user.email}</td>
                        <td className="p-4 text-lg">{user.role}</td>
                        <td className="relative p-4 text-lg rounded-r-2xl">
                          <input
                            type="checkbox"
                            name={`action${user.id}`}
                            id={`action${user.id}`}
                            className="hidden peer/action"
                          />
                          <label
                            htmlFor={`action${user.id}`}
                            className="cursor-pointer"
                          >
                            <FaEllipsisV />
                          </label>
                          <div className="hidden absolute peer-checked/action:flex gap-4 right-52 top-1/2 transform -translate-y-1/2 bg-grisClaro shadow-right-dark p-5 rounded-lg z-10">
                            <Link
                              className="text-white w-28 rounded-md bg-azulClaro px-2 py-1 font-semibold text-center"
                              to={`/infouser/${user.id}`}
                            >
                              Ver
                            </Link>
                            <button
                              className="text-white w-28 rounded-md bg-red-600 px-2 py-1 font-semibold"
                              onClick={() => {
                                setUserDelete(user.id);
                                setModalDelete(true);
                              }}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )
          )}
          {modalDelete && (
            <ModalDelete
              peticion={confirmDelete}
              setStateModal={setModalDelete}
              id={userDelete}
            />
          )}
        </main>
      </div>
    </>
  );
}
