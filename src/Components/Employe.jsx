import { useState } from "react";
import { SideBar } from "./Sidebar"
import { useParams } from "react-router-dom";

export function Employe(){
    // const [employe,setEmploye]=useState([])
    // const { emploID }=useParams()
    // console.log(emploID)
    // useEffect(() => {
    //     fetch(`http://localhost:3000/find-employee/${emploID}`, {
    //       method: "GET",
    //       headers: { "Content-Type": "application/json" },
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log("Success:", data);
    //         setEmploye(data);
    //       })
    //       .catch((error) => {
    //         console.error("Error:", error);
    //       });
    //   }, []);
    //   console.log(employe)

    return(
        <>
        <div className="flex">
            <SideBar />
            <main className="w-screen h-screen p-10 flex flex-col gap-4 mb-10">
            <section className="flex justify-between items-center">
                <h1 className="text-3xl">Empleado</h1>
                <div className="m-2">
                    <button className="bg-azulClaro m-4 p-2 pr-6 pl-6 text-white rounded-md">Eliminar</button>
                    <button className="bg-azulClaro p-2 pr-6 pl-6 text-white rounded-md">Editar</button>
                </div>
            </section>
                <>
                    <section className="bg-grisOscuro rounded-md shadow-right-dark w-full px-4 border-separate border-spacing-0 border-spacing-y-4 h-screen grid grid-rows-4 gap-4 ">
                        <div className="col-span-1">
                            <h1 className="text-3xl m-8">Datos</h1>
                        </div>
                        <div className="row-start-2 row-span-3 break-all grid grid-cols-4 grid-rows-4 gap-4 p-4">
                            <div className="nombre">
                                <h1>Nombre Completo</h1>
                                <h1>Sara Gudiño Rosales</h1>
                            </div>
                            <div className="nombre">
                                <h1>Correo</h1>
                                <h1>sara@gmail.com</h1>
                            </div>
                            <div className="nombre">
                                <h1>Empresa</h1>
                                <h1>ASAL COMPANY</h1>
                            </div>
                            <div className="nombre">
                                <h1>Nombre Completo</h1>
                                <h1>Sara Gudiño Rosales</h1>
                            </div>
                            <div className="nombre">
                                <h1>Correo</h1>
                                <h1>sara@gmail.com</h1>
                            </div>
                            <div className="nombre">
                                <h1>Empresa</h1>
                                <h1>ASAL COMPANY</h1>
                            </div>
                            <div className="nombre">
                                <h1>Nombre Completo</h1>
                                <h1>Sara Gudiño Rosales</h1>
                            </div>
                            <div className="nombre">
                                <h1>Correo</h1>
                                <h1>sara@gmail.com</h1>
                            </div>
                            <div className="nombre">
                                <h1>Empresa</h1>
                                <h1>ASAL COMPANY</h1>
                            </div>
                            <div className="nombre">
                                <h1>Nombre Completo</h1>
                                <h1>Sara Gudiño Rosales</h1>
                            </div>
                            <div className="nombre">
                                <h1>Correo</h1>
                                <h1>sara@gmail.com</h1>
                            </div>
                            <div className="nombre">
                                <h1>Empresa</h1>
                                <h1>ASAL COMPANY</h1>
                            </div>
                            <div className="nombre">
                                <h1>Nombre Completo</h1>
                                <h1>Sara Gudiño Rosales</h1>
                            </div>
                            <div className="nombre">
                                <h1>Correo</h1>
                                <h1>sara@gmail.com</h1>
                            </div>
                            <div className="nombre">
                                <h1>Empresa</h1>
                                <h1>ASAL COMPANY</h1>
                            </div>
                            <div className="nombre">
                                <h1>Nombre Completo</h1>
                                <h1>Sara Gudiño Rosales</h1>
                            </div>
                        </div>
                        <div className="flex justify-end m-2">
                            <div className="flex flex-col gap-2">
                                <button className="bg-azulClaro p-2 pr-6 pl-6 text-white rounded-md">Agregar Deduccion</button>
                                <button className="bg-azulClaro p-2 pr-6 pl-6 text-white rounded-md">Agregar Percepcion</button>
                            </div>
                        </div>
                    </section>
                </>
            </main>
        </div>
        </>
    )
}