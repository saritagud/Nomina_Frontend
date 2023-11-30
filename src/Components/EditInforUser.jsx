import { succesAlert, errorAlert } from "./alerts/alerts";

function EditInforUser({ dataEdit, setDataEdit, user, setUser, setEditMode }) {
  const token = JSON.parse(localStorage.getItem("token"));

  const handleChange = (e) => {
    setDataEdit({
      ...dataEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let data = {};

    if (dataEdit.name === "")
      return console.error("El campo Nombre no puede estar vacio");
    if (dataEdit.phone === "")
      return console.error("El campo Telefono no puede estar vacio");
    if (dataEdit.lastName === "")
      return console.error("El campo Apellido no puede estar vacio");
    if (dataEdit.address === "")
      return console.error("El campo Direccion no puede estar vacio");
    if (dataEdit.email === "")
      return console.error("El campo Email no puede estar vacio");
    if (dataEdit.email === "")
      return console.error("El campo Email no puede estar vacio");
    if (!emailRegex.test(dataEdit.email))
      return console.error("El Email no es valido");

    if (dataEdit.name !== user.name) {
      data = {
        ...data,
        name: dataEdit.name,
      };
    }
    if (dataEdit.lastName !== user.lastName) {
      data = {
        ...data,
        lastName: dataEdit.lastName,
      };
    }
    if (dataEdit.phone !== user.phone) {
      data = {
        ...data,
        phone: dataEdit.phone,
      };
    }
    if (dataEdit.address !== user.address) {
      data = {
        ...data,
        address: dataEdit.address,
      };
    }
    if (dataEdit.email !== user.email) {
      data = {
        ...data,
        email: dataEdit.email,
      };
    }
    if (dataEdit.role !== user.role) {
      data = {
        ...data,
        role: dataEdit.role,
      };
    }

    // console.log(data)

    fetch(`http://localhost:3000/user/edit/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          // console.log("Success:", data.user)
          succesAlert("Se han actualizado los datos correctamente");
          setEditMode(false);
          setUser(dataEdit);
        } else {
          errorAlert("Ha ocurrido un error al editar el usario");
          console.log("Error:", data.error);
        }
      })
      .catch((error) => {
        errorAlert("Ha ocurrido un error");
        console.error("Error:", error);
      });
  };

  return (
    <>
      <section className="relative">
        <div className="absolute top-0 right-0 flex space-x-4 mt-2 mr-4 z-10">
          <button
            className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold text-center"
            onClick={() => {
              handleSubmit();
            }}
          >
            Guardar
          </button>
          <button
            className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold text-center"
            onClick={() => {
              setEditMode(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-10 bg-grisClaro rounded-md shadow-right-dark p-8 mt-9 w-full border-2 border-grisOscuro">
        <h1 className="font-bold text-3xl">Editar informacion del usuario</h1>
        <form className="grid grid-cols-[auto,1fr,auto,1fr] gap-y-10 gap-x-10 px-5 items-center">
          <label htmlFor="name" className="text-lg font-bold">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoFocus
            className="bg-grisClaro border-b border-azulOscuro rounded-md outline-azulOscuro px-2 text-lg break-words"
            value={dataEdit.name}
            onChange={handleChange}
          />
          <label htmlFor="phone" className="text-lg font-bold">
            Telefono
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            autoFocus
            className="bg-grisClaro border-b border-azulOscuro rounded-md outline-azulOscuro px-2 text-lg break-words"
            value={dataEdit.phone}
            onChange={handleChange}
          />
          <label htmlFor="lastName" className="text-lg font-bold">
            Apellido
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            autoFocus
            className="bg-grisClaro border-b border-azulOscuro rounded-md outline-azulOscuro px-2 text-lg break-words"
            value={dataEdit.lastName}
            onChange={handleChange}
          />
          <label htmlFor="address" className="text-lg font-bold">
            Direccion
          </label>
          <input
            type="text"
            id="address"
            name="address"
            autoFocus
            className="bg-grisClaro border-b border-azulOscuro rounded-md outline-azulOscuro px-2 text-lg break-words"
            value={dataEdit.address}
            onChange={handleChange}
          />
          <label htmlFor="email" className="text-lg font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoFocus
            className="bg-grisClaro border-b border-azulOscuro rounded-md outline-azulOscuro px-2 text-lg break-words"
            value={dataEdit.email}
            onChange={handleChange}
          />
          <label htmlFor="role" className="text-lg font-bold">
            Rol
          </label>
          <select
            id="role"
            name="role"
            className="bg-grisClaro border-b border-azulOscuro rounded-md outline-azulOscuro px-2 text-lg break-words"
            value={dataEdit.role}
            onChange={handleChange}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </form>
      </section>
    </>
  );
}
export default EditInforUser;
