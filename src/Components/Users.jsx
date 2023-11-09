import { useState } from 'react';
import { SideBar } from './Sidebar';
import { Link } from 'react-router-dom';

export function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      nombre: 'Sara',
      correo: 'sara@gmail.com',
      empresa: 'ASAL Company'
    },
    {
      id: 2,
      nombre: 'Sara',
      correo: 'sara@gmail.com',
      empresa: 'ASAL Company'
    },
    {
      id: 3,
      nombre: 'Sara',
      correo: 'sara@gmail.com',
      empresa: 'ASAL Company'
    },
    {
      id: 4,
      nombre: 'Sara',
      correo: 'sara@gmail.com',
      empresa: 'ASAL Company'
    }
    // Agrega más usuarios si es necesario
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({ nombre: '', correo: '', empresa: '' });

  const handleEliminar = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleEditar = (id) => {
    setEditingId(id);
    const userToEdit = users.find((user) => user.id === id);
    setEditedData({ nombre: userToEdit.nombre, correo: userToEdit.correo, empresa: userToEdit.empresa });
  };

  const handleGuardar = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === editingId) {
        return { ...user, ...editedData };
      }
      return user;
    });
    setUsers(updatedUsers);
    setEditingId(null);
  };

  return (
    <>
      <div className="flex">
        <SideBar />
        <main className="w-screen h-screen p-10 flex flex-col gap-10">
        <section className="flex justify-between items-center">
            <h1 className="text-3xl">Usuarios</h1>
            <form className="flex justify-center">
              <Link className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold text-center" to="/registro">
                Agregar
              </Link>
            </form>
          </section>


          {users?.length === 0 ? (
            <strong className="text-xl">No hay empresas creadas aún</strong>
          ) : (
            users?.length > 0 && (
              <>
                <table className="bg-grisClaro rounded-md shadow-right-dark w-full px-4 border-separate border-spacing-0 border-spacing-y-4">
                  <thead className="px-5">
                    <tr>
                      <th className="p-4 text-lg text-start">Nombre</th>
                      <th className="p-4 text-lg text-start">Correo</th>
                      <th className="p-4 text-lg text-start">Empresa</th>
                      <th className="p-4 text-lg text-start">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="px-5">
                    {users.map((user) => (
                      <tr className="bg-grisOscuro" key={user.id}>
                        <td className="p-4 text-lg rounded-l-2xl">
                          {editingId === user.id ? (
                            <input
                              type="text"
                              value={editedData.nombre}
                              onChange={(e) => setEditedData({ ...editedData, nombre: e.target.value })}
                            />
                          ) : (
                            user.nombre
                          )}
                        </td>
                        <td className="p-4 text-lg">
                          {editingId === user.id ? (
                            <input
                              type="text"
                              value={editedData.correo}
                              onChange={(e) => setEditedData({ ...editedData, correo: e.target.value })}
                            />
                          ) : (
                            user.correo
                          )}
                        </td>
                        <td className="p-4 text-lg">
                          {editingId === user.id ? (
                            <input
                              type="text"
                              value={editedData.empresa}
                              onChange={(e) => setEditedData({ ...editedData, empresa: e.target.value })}
                            />
                          ) : (
                            user.empresa
                          )}
                        </td>
                        <td className="p-4 text-lg flex gap-4">
                          {editingId === user.id ? (
                            <button
                              className="bg-green-500 px-3 py-1 ml-2 rounded-md text-white font-semibold"
                              onClick={handleGuardar}
                            >
                              Guardar
                            </button>
                          ) : (
                            <svg
                            width="30"
                            height="30"
                            viewBox="0 0 41 42"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ display: 'block', cursor: 'pointer', marginRight: '10px' }}
                            onClick={() => handleEditar(user.id)}
                          >
                            <path
                              d="M23.4102 7.96637L33.4118 18.218L11.6938 40.4789L2.77663 41.4879C1.58288 41.6232 0.574286 40.5886 0.707098 39.365L1.69929 30.2185L23.4102 7.96637ZM39.5977 6.44008L34.9016 1.62659C33.4368 0.125122 31.061 0.125122 29.5962 1.62659L25.1782 6.155L35.1798 16.4066L39.5977 11.8782C41.0626 10.3759 41.0626 7.94155 39.5977 6.44008Z"
                              fill="black"
                            />
                          </svg>
                          )}
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 42 44"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ display: 'block', cursor: 'pointer' }}
                            onClick={() => handleEliminar(user.id)}
                          >
                            <path
                              d="M40.232 2.75001H29.2499L28.3896 1.14298C28.2074 0.799417 27.9266 0.510417 27.579 0.308495C27.2314 0.106573 26.8307 -0.000260216 26.422 1.50672e-05H15.9615C15.5536 -0.00145709 15.1536 0.104977 14.8072 0.307124C14.4609 0.509271 14.1821 0.798954 14.003 1.14298L13.1427 2.75001H2.16057C1.77222 2.75001 1.39978 2.89488 1.12517 3.15274C0.850562 3.4106 0.696289 3.76034 0.696289 4.12501L0.696289 6.87501C0.696289 7.23969 0.850562 7.58942 1.12517 7.84728C1.39978 8.10515 1.77222 8.25001 2.16057 8.25001H40.232C40.6204 8.25001 40.9928 8.10515 41.2674 7.84728C41.542 7.58942 41.6963 7.23969 41.6963 6.87501V4.12501C41.6963 3.76034 41.542 3.4106 41.2674 3.15274C40.9928 2.89488 40.6204 2.75001 40.232 2.75001ZM5.56504 40.1328C5.63488 41.1801 6.12711 42.163 6.94152 42.8814C7.75593 43.5999 8.83131 43.9999 9.94874 44H32.4438C33.5613 43.9999 34.6366 43.5999 35.4511 42.8814C36.2655 42.163 36.7577 41.1801 36.8275 40.1328L38.7677 11H3.62486L5.56504 40.1328Z"
                              fill="black"
                            />
                          </svg>
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
