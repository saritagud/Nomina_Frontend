import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';

export function Register() {
    const [isOpen, setIsOpen] = useState(false);
    const [Name, setName] = useState('');
    const [Last_name, setLast_name] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const [Password, setPassword] = useState('');
    const [Role, setRole] = useState('');
    const [Company_ID, setCompany_ID] = useState('');

    let styleInput = 'bg-azulClaro p-4 rounded-md text-white placeholder:text-white placeholder:font-extralight w-full';
    let styleLabel = 'w-full text-lg';

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

        console.log(userData);
        fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <button
                className="bg-grisOscuro h-36 border-black/40 border-r-4 border-b-4 w-full rounded-md text-lg text-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                Crear Empresa
            </button>

            {isOpen && (
                <section className="absolute top-0 left-0 bottom-0 right-0 bg-grisClaro flex flex-col justify-center items-center gap-10">
                    <BiArrowBack className="absolute top-2 left-3 z-10 text-3xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}></BiArrowBack>
                    <h1 className="text-3xl text-start ">Agregar Usuario</h1>
                    <form className=" w-full gap-4 justify-center items-center grid grid-cols-2">
                        <div className="p-8 grid grid-rows-4 gap-4">
                            <div className="1">
                                <label className={styleLabel}>Nombre</label>
                                <input
                                    type="text"
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={styleInput}
                                    placeholder="Ingresa el nombre"
                                ></input>
                            </div>
                            <div className="2">
                                <label className={styleLabel}>Apellido</label>
                                <input
                                    type="text"
                                    value={Last_name}
                                    onChange={(e) => setLast_name(e.target.value)}
                                    className={styleInput}
                                    placeholder="Ingresa el apellido"
                                ></input>
                            </div>
                            <div className="2">
                                <label className={styleLabel}>Email</label>
                                <input
                                    type="email"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styleInput}
                                    placeholder="Ingresa el email"
                                ></input>
                            </div>
                            <div className="2">
                                <label className={styleLabel}>Numero de telefono</label>
                                <input
                                    type="text"
                                    value={Phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className={styleInput}
                                    placeholder="Ingresa el telefono"
                                ></input>
                            </div>
                        </div>
                        <div className="p-8 grid grid-rows-4  gap-4">
                            <div className="1">
                                <label className={styleLabel}>Contrasena</label>
                                <input
                                    type="password"
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styleInput}
                                    placeholder="Ingresa tu contrasena"
                                ></input>
                            </div>
                            <div className="1">
                                <label className={styleLabel}>Direccion 2</label>
                                <input
                                    type="text"
                                    value={Address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className={styleInput}
                                    placeholder="Ingresa tu direccion"
                                ></input>
                            </div>
                            <div className="3">
                                <label className={styleLabel}>Rol</label>
                                <input
                                    type="text"
                                    value={Role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className={styleInput}
                                    placeholder="Elige el rol"
                                ></input>
                            </div>
                            <div className="3">
                                <label className={styleLabel}>ID de la compania</label>
                                <input
                                    type="number"
                                    value={Company_ID}
                                    onChange={(e) => setCompany_ID(e.target.value)}
                                    className={styleInput}
                                    placeholder="Ingresa el ID de tu compania"
                                ></input>
                            </div>
                            <div className="text-center">
                                <button className="bg-azulOscuro p-4 text-white w-1/2 rounded-md mt-6" onClick={handleSubmit}>Registrar Usuario</button>
                            </div>
                        </div>
                    </form>
                </section>
            )}
        </>
    );
}
