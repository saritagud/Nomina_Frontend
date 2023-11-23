import React, { useState, useEffect } from "react";
import { SideBar } from "./Sidebar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export function UserInfo() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const companyID = JSON.parse(localStorage.getItem("company")).id;
  useEffect(() => {
    // Realizar solicitud GET para obtener datos del usuario por su ID
    fetch(`http://localhost:3000/user/all-company/${companyID}`)
      .then((response) => response.json())
      .then((data) => {
        // Verificar si la respuesta contiene los datos del usuario
        if (data && Array.isArray(data.users)) {
          const foundUser = data.users.find((u) => u.id === id);
          if (foundUser) {
            setUser(foundUser); // Establecer los datos del usuario en el estado
          } else {
            console.error("No se encontró un usuario con el ID:", id);
          }
        } else {
          console.error("No se encontraron datos de usuarios:", data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos del usuario:", error);
      });
  }, [id]);

  return (
    <>
      <div className="h-full">
        <SideBar />
        <main className="w-screen p-10 flex flex-col items-end gap-10">
          <section className="relative">
            <div className="absolute top-0 right-0 flex space-x-4 mt-2 mr-4 z-10">
              <Link
                to={`/editar-usuario/${id}`}
                className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold text-center"
              >
                Eliminar
              </Link>
              <Link
                to={`/editar-usuario/${id}`}
                className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold text-center"
              >
                Editar
              </Link>
            </div>
          </section>

          {user ? (
            <div className="bg-grisClaro rounded-md shadow-right-dark p-8 mt-9 w-4/5">
              {" "}
              {/* Ajuste del padding para aumentar el tamaño */}
              <table className="w-full ">
                <tbody>
                  <tr>
                    <td colSpan="4" className="text-3xl font-semibold pb-4">
                      Información del Usuario
                    </td>
                  </tr>
                  <td colSpan="4" className="py-4"></td>
                  <tr>
                    <td
                      className="info-label"
                      style={{ padding: "0.2rem 0.3rem", fontWeight: "bold" }}
                    >
                      Nombre:
                    </td>
                    <td
                      className="info-value"
                      style={{ padding: "0.2rem 0.3rem" }}
                    >
                      {user.name}
                    </td>
                    <td
                      className="info-label"
                      style={{ padding: "0.2rem 0.3rem", fontWeight: "bold" }}
                    >
                      Teléfono:
                    </td>
                    <td
                      className="info-value"
                      style={{ padding: "0.2rem 0.3rem" }}
                    >
                      {user.phone}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="py-3"></td>
                  </tr>
                  <tr>
                    <td
                      className="info-label"
                      style={{ padding: "0.2rem 0.3rem", fontWeight: "bold" }}
                    >
                      Apellido:
                    </td>
                    <td
                      className="info-value"
                      style={{ padding: "0.2rem 0.3rem" }}
                    >
                      {user.lastName}
                    </td>
                    <td
                      className="info-label"
                      style={{ padding: "0.2rem 0.3rem", fontWeight: "bold" }}
                    >
                      Dirección:
                    </td>
                    <td
                      className="info-value"
                      style={{ padding: "0.2rem 0.3rem" }}
                    >
                      {user.address}
                    </td>
                  </tr>
                  <td colSpan="4" className="py-3"></td>
                  <tr>
                    <td
                      className="info-label"
                      style={{ padding: "0.2rem 0.3rem", fontWeight: "bold" }}
                    >
                      Correo:
                    </td>
                    <td
                      className="info-value"
                      style={{ padding: "0.2rem 0.3rem" }}
                    >
                      {user.email}
                    </td>
                    <td
                      className="info-label"
                      style={{ padding: "0.2rem 0.3rem", fontWeight: "bold" }}
                    >
                      Rol:
                    </td>
                    <td
                      className="info-value"
                      style={{ padding: "0.2rem 0.3rem" }}
                    >
                      {user.role}
                    </td>
                  </tr>
                  <td colSpan="4" className="py-3"></td>
                </tbody>
              </table>
            </div>
          ) : (
            <strong className="text-xl">
              Cargando información del usuario...
            </strong>
          )}
        </main>
      </div>
    </>
  );
}
