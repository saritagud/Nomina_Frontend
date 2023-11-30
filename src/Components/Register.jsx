import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { userRoles } from "../logic/constantes";
import { succesAlert, errorAlert } from "./alerts/alerts";

export function Register() {
  const navegar = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const companyID = JSON.parse(localStorage.getItem("company")).id;
  const rol = JSON.parse(localStorage.getItem("user")).role;
  const token = JSON.parse(localStorage.getItem("token"));

  const { SuperAdmin, Admin } = userRoles;

  let styleInput =
    "bg-azulClaro p-4 rounded-md text-white placeholder:text-white placeholder:font-extralight w-full";
  let styleLabel = "text-lg";

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (
      !name ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !password ||
      !role
    ) {
      console.log("Es necesario rellenar todos los campos");
    } else if (!emailRegex.test(email)) {
      console.log("Email no valido");
    } else if (!passwordRegex.test(password)) {
      console.log(
        "La contraseña debe ser de al menos 6 caracteres, incluir una mayúscula y un número."
      );
    } else {
      const userData = {
        name: name,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
        password: password,
        role: role,
      };

      // console.log(userData);
      fetch(`http://localhost:3000/user/signup/${companyID}`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if (data.message) {
            if (rol == SuperAdmin) {
              succesAlert("Se ha creado correctamente el usuario");
              navegar("/");
            } else if (rol == Admin) {
              succesAlert("Se ha creado correctamente el usuario");
              navegar("/usuarios");
            }
          } else {
            errorAlert("Ha ocurrido un error al crear el usuario");
            console.log("Error:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <section className="absolute top-0 left-0 bottom-0 right-0 bg-grisClaro flex flex-col justify-center items-center">
        {rol === Admin && (
          <BiArrowBack
            className="absolute top-2 left-3 z-10 text-3xl cursor-pointer"
            onClick={() => {
              navegar("/usuarios");
            }}
          />
        )}
        <h1 className="text-4xl font-bold mb-16">Registrar Usuario</h1>
        <form className="w-full gap-x-20 gap-y-3 grid grid-cols-2 px-40">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className={styleLabel}>Nombre</label>
              <input
                type="text"
                value={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
                className={styleInput}
                placeholder="Ingresa el nombre"
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className={styleLabel}>Apellido</label>
              <input
                type="text"
                value={lastName}
                autoFocus
                onChange={(e) => setLast_name(e.target.value)}
                className={styleInput}
                placeholder="Ingresa el apellido"
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className={styleLabel}>email</label>
              <input
                type="email"
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                className={styleInput}
                placeholder="Ingresa el email"
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className={styleLabel}>Numero de telefono</label>
              <input
                type="tel"
                value={phone}
                autoFocus
                onChange={(e) => setPhone(e.target.value)}
                className={styleInput}
                placeholder="Ingresa el telefono"
              ></input>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className={styleLabel}>Contrasena</label>
              <input
                type="password"
                value={password}
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                className={styleInput}
                placeholder="Ingresa tu contrasena"
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className={styleLabel}>Direccion</label>
              <input
                type="text"
                value={address}
                autoFocus
                onChange={(e) => setAddress(e.target.value)}
                className={styleInput}
                placeholder="Ingresa tu direccion"
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className={styleLabel}>Rol</label>
              <select
                name="role"
                id="role"
                autoFocus
                className={styleInput}
                onChange={(e) => setRole(e.target.value)}
                defaultValue={"0"}
              >
                <option value="0" disabled>
                  -- Seleccionar --
                </option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="text-center">
              <button
                className="bg-azulOscuro p-4 text-white w-1/2 rounded-md mt-6"
                onClick={handleSubmit}
              >
                Registrar Usuario
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
