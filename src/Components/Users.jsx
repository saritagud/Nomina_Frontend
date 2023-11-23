import React, { useState, useEffect } from 'react';
import { SideBar } from './Sidebar';
import { Link } from 'react-router-dom';
//
export function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Realizar solicitud GET para obtener datos de usuarios
    fetch('http://localhost:3000/user/all')
      .then((response) => response.json())
      .then((data) => {
        // Verificar si la respuesta contiene la propiedad "users"
        if (data && Array.isArray(data.users)) {
          setUsers(data.users); // Utilizar la propiedad "users" de la respuesta como el array de usuarios
        } else {
          console.error('La respuesta de la API no contiene un array de usuarios:', data);
        }
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []);

  return (
    <>
      <div className="flex">
        <SideBar />
        <main className="w-screen h-screen p-10 flex flex-col gap-10">
          <section className="flex justify-between items-center">
            <h1 className="text-3xl" style={{ fontWeight: 'bold' }}>Usuarios</h1>
            <form className="flex justify-center">
              <Link className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold text-center" to="/registro">
                Agregar
              </Link>
            </form>
          </section>

          {users?.length === 0 ? (
            <strong className="text-xl">No hay usuarios creados aún</strong>
          ) : (
            users?.length > 0 && (
              <>
                <table className="bg-grisClaro rounded-md shadow-right-dark w-full px-4 border-separate border-spacing-0 border-spacing-y-4">
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
                        <td className="p-4 text-lg">
                          {user.email}
                        </td>
                        <td className="p-4 text-lg">
                          {user.role}
                        </td>
                        <td className="p-4 text-lg flex gap-4">
                          <Link to={`/infouser/${user.id}`} className="svg-link">
                            <svg
                              width="10"
                              height="20"
                              viewBox="0 0 10 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.46094 10.2437C7.94844 10.2437 9.96094 11.9966 9.96094 14.1631C9.96094 16.3296 7.94844 18.0824 5.46094 18.0824C2.97344 18.0824 0.960938 16.3296 0.960938 14.1631C0.960938 11.9966 2.97344 10.2437 5.46094 10.2437ZM0.960938 4.58244C0.960938 6.74897 2.97344 8.5018 5.46094 8.5018C7.94844 8.5018 9.96094 6.74897 9.96094 4.58244C9.96094 2.41591 7.94844 0.663086 5.46094 0.663086C2.97344 0.663086 0.960938 2.41591 0.960938 4.58244ZM0.960938 23.7437C0.960938 25.9103 2.97344 27.6631 5.46094 27.6631C7.94844 27.6631 9.96094 25.9103 9.96094 23.7437C9.96094 21.5772 7.94844 19.8244 5.46094 19.8244C2.97344 19.8244 0.960938 21.5772 0.960938 23.7437Z"
                                fill="black"
                              />
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )
          )}
        </main>
      </div>
    </>
  );
}
