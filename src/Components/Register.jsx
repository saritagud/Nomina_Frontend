import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

export function Register() {
    const navegar = useNavigate()
    const [Name, setName] = useState('');
    const [Last_name, setLast_name] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const [Password, setPassword] = useState('');
    const [Role, setRole] = useState('');
    const Company_ID = JSON.parse(localStorage.getItem('company')).id;

    let styleInput = 'bg-azulClaro p-4 rounded-md text-white placeholder:text-white placeholder:font-extralight w-full';
    let styleLabel = 'text-lg';

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
          Name: Name,
          Last_name: Last_name,
          Email: Email,
          Phone: Phone,
          Address: Address,
          Password: Password,
          Role: Role,
          Company_ID: parseInt(Company_ID),
        };

        // console.log(userData);
        fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log('Success:', data);
                if (data.newUser) {
                  navegar('/')
                } else {
                  console.log("Error:", data.error);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <section className="absolute top-0 left-0 bottom-0 right-0 bg-grisClaro flex flex-col justify-center items-center">
                <Link to={'/'}>
                    <BiArrowBack className="absolute top-2 left-3 z-10 text-3xl cursor-pointer"></BiArrowBack>
                </Link>
                <form className="w-full gap-x-20 gap-y-3 grid grid-cols-2 px-40">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className={styleLabel}>Nombre</label>
                            <input
                                type="text"
                                value={Name}
                                onChange={(e) => setName(e.target.value)}
                                className={styleInput}
                                placeholder="Ingresa el nombre"
                            ></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={styleLabel}>Apellido</label>
                            <input
                                type="text"
                                value={Last_name}
                                onChange={(e) => setLast_name(e.target.value)}
                                className={styleInput}
                                placeholder="Ingresa el apellido"
                            ></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={styleLabel}>Email</label>
                            <input
                                type="email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styleInput}
                                placeholder="Ingresa el email"
                            ></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={styleLabel}>Numero de telefono</label>
                            <input
                                type="tel"
                                value={Phone}
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
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styleInput}
                                placeholder="Ingresa tu contrasena"
                            ></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={styleLabel}>Direccion</label>
                            <input
                                type="text"
                                value={Address}
                                onChange={(e) => setAddress(e.target.value)}
                                className={styleInput}
                                placeholder="Ingresa tu direccion"
                            ></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className={styleLabel}>Rol</label>
                            <select name="role" id="role" className={styleInput}
                                onChange={(e) => setRole(e.target.value)} defaultValue={"0"}>
                                <option value="0" disabled>-- Seleccionar --</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <button className="bg-azulOscuro p-4 text-white w-1/2 rounded-md mt-6" onClick={handleSubmit}>Registrar Usuario</button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}
