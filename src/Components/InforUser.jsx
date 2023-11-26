import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalDelete from "./ModalDelete";
import { deleteUser } from "../services/users";
import EditInforUser from "./EditInforUser";
import { BiArrowBack } from "react-icons/bi";

export function UserInfo() {
  const navegar = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [dataEdit, setDataEdit] = useState(null)
  const [modalDelete, setModalDelete] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const companyID = JSON.parse(localStorage.getItem("company")).id;
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    // Realizar solicitud GET para obtener datos del usuario por su ID
    fetch(`http://localhost:3000/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Verificar si la respuesta contiene los datos del usuario
        if (data.user) {
          setUser(data.user); // Establecer los datos del usuario en el estado
          setDataEdit({
            name: data.user.name,
            lastName: data.user.lastName,
            email: data.user.email,
            phone: data.user.phone,
            address: data.user.address,
            role: data.user.role,
          })
        } else {
          console.error("No se encontraron datos de usuarios:", data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos del usuario:", error);
      });
  }, [id]);

  const confirmDelete = async () => {
    const res = await deleteUser(token, companyID, id)
    if (res.message) {
      // console.log(res.message)
      navegar('/usuarios')
    } else {
      console.error(res)
    }
  }

  return (
    <>
      <div className="h-full">
        <main className="relative w-full p-10 flex flex-col gap-10">
        <BiArrowBack className="absolute top-12 left-10 z-10 text-3xl cursor-pointer" onClick={() => navegar("/usuarios")}/>
        {editMode ? (
          <EditInforUser dataEdit={dataEdit} setDataEdit={setDataEdit} setUser={setUser} user={user} setEditMode={setEditMode}/>
        ) : (
          <>
            <section className="relative">
              <div className="absolute top-0 right-0 flex space-x-4 mt-2 mr-4 z-10">
                <button
                  className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold text-center"
                  onClick={() => { setModalDelete(true) }}
                >
                  Eliminar
                </button>
                <button
                  className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold text-center"
                  onClick={() => { setEditMode(true) }}
                >
                  Editar
                </button>
              </div>
            </section>
            {user ? (
              <section className="flex flex-col gap-10 bg-grisClaro rounded-md shadow-right-dark p-8 mt-9 w-full border-2 border-grisOscuro">
                <h1 className="font-bold text-3xl">Informacion del usuario</h1>
                <div className="grid grid-cols-[auto,1fr,auto,1fr] gap-y-10 gap-x-10 px-5 items-center">
                  <p className="text-lg font-bold">Nombre</p>
                  <p className="text-lg break-words">{user.name}</p>
                  <p className="text-lg font-bold">Telefono</p>
                  <p className="text-lg break-words">{user.phone}</p>
                  <p className="text-lg font-bold">Apellido</p>
                  <p className="text-lg break-words">{user.lastName}</p>
                  <p className="text-lg font-bold">Direccion</p>
                  <p className="text-lg break-words">{user.address}</p>
                  <p className="text-lg font-bold">Email</p>
                  <p className="text-lg break-words">{user.email}</p>
                  <p className="text-lg font-bold">Rol</p>
                  <p className="text-lg break-words">{user.role}</p>
                </div>
              </section>
            ) : (
              <strong className="text-xl">
                Cargando información del usuario...
              </strong>
            )}
            {modalDelete && (
              <ModalDelete peticion={confirmDelete} setStateModal={setModalDelete} id={user.id}/>
            )}
          </>
        )}
        </main>
      </div>
    </>
  );
}
