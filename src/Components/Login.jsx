import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRoles } from "../logic/constantes";

export function Login() {
  const navegar = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { SuperAdmin, Admin } = userRoles;
  localStorage.removeItem("user");
  localStorage.removeItem("company");

  let styleInput =
    "bg-azulClaro p-2 rounded-md text-white placeholder:text-white placeholder:font-extralight w-full";
  let styleLabel = "w-full text-lg";

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data.token));
        if (data.userInfo) {
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data.userInfo));
          localStorage.setItem(
            "company",
            JSON.stringify({
              id: data.userInfo.companyId,
              currency: data.currency.currency,
            })
          );

          if (data.userInfo.role == SuperAdmin) {
            navegar("/");
          } else if (data.userInfo.role == Admin) {
            navegar("/admin");
          } else {
            navegar("/pre-nomina");
          }
        } else {
          console.log("Error:", data.error);
        }
        // Aquí puedes manejar la respuesta, como almacenar el token o redirigir al usuario.
      })
      .catch((error) => {
        console.error("Error:", error);
        // Manejar errores, como mostrar un mensaje de error al usuario.
      });
  };

  return (
    <>
      <section className="h-screen w-screen flex justify-center items-center font-Quicksand gap-52">
        <img
          src="src\assets\04f7517b2c2a955043a8a66ea51876e2-removebg-preview.png"
          alt="image"
        />

        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="font-Quicksand text-center text-4xl m-5">
            Inicio de Sesión
          </h1>
          <form className="flex flex-col w-full gap-4 justify-center items-center">
            <label className={styleLabel}>Usuario</label>
            <input
              type="text"
              value={email}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              className={styleInput}
              placeholder="Ingresa tu email"
            ></input>

            <label className={styleLabel}>Contraseña</label>
            <input
              type="password"
              value={password}
              autoFocus
              onChange={(e) => setPassword(e.target.value)}
              className={styleInput}
              placeholder="Ingresa tu contraseña"
            ></input>

            <button
              className="bg-azulOscuro p-2 text-white w-1/2 rounded-md"
              onClick={handleSubmit}
            >
              Ingresar
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
