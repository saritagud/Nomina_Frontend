import { useState } from 'react';

export function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  let styleInput =
    "bg-azulClaro p-2 rounded-md text-white placeholder:text-white placeholder:font-extralight w-full";
  let styleLabel = "w-full text-lg";

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
        Email: Email,
        Password: Password,
    };

    fetch('http://localhost:3000/user/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            // Aquí puedes manejar la respuesta, como almacenar el token o redirigir al usuario.
        })
        .catch((error) => {
            console.error('Error:', error);
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
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className={styleInput}
              placeholder="Ingresa tu email"
            ></input>

            <label className={styleLabel}>Contraseña</label>
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className={styleInput}
              placeholder="Ingresa tu contraseña"
            ></input>

            <button className="bg-azulOscuro p-2 text-white w-1/2 rounded-md" onClick={handleSubmit}>
              Ingresar
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
