import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { formatearFecha } from "../logic/functions"
import { FormEmployeed } from "./FormEmployeed"
import { BiArrowBack } from "react-icons/bi"
import { deleteEmployee } from "../services/employees"
import ModalDelete from "./ModalDelete"

export function Employe() {
  const navegar = useNavigate()
  const [employe, setEmploye] = useState([])
  const [modalEdit, setModalEdit] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const { emploID } = useParams()
  const token = JSON.parse(localStorage.getItem("token"))
  const { id: companyID, currency } = JSON.parse(
    localStorage.getItem("company")
  )
  // console.log(emploID);
  useEffect(() => {
    fetch(`http://localhost:3000/employee/find-employee/${emploID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log("Success:", data);
        setEmploye(data.employee)
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }, [])
  // console.log(employe);

  const confirmEdit = data => {
    setEmploye(data)
  }

  const confirmDelete = async () => {
    const res = await deleteEmployee(token, companyID, employe.id)
    if (res.message) {
      // console.log(res.message)
      navegar("/empleados")
    } else {
      console.error(res)
    }
  }

  return (
    <>
      <div className="h-full">
        <main className="relative px-10 py-5 flex flex-col gap-10 w-full">
          {employe && (
            <>
              <section className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <BiArrowBack
                    className="text-3xl cursor-pointer translate-y-[2px]"
                    onClick={() => navegar("/empleados")}
                  />
                  <h1 className="text-3xl">Empleado</h1>
                </div>
                <div>
                  <button
                    className="bg-azulClaro m-4 p-2 pr-6 pl-6 text-white rounded-md font-semibold"
                    onClick={() => setModalDelete(true)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="bg-azulClaro p-2 pr-6 pl-6 text-white rounded-md font-semibold"
                    onClick={() => setModalEdit(true)}
                  >
                    Editar
                  </button>
                </div>
              </section>
              <>
                <section className="bg-grisClaro rounded-md shadow-right-dark w-full pt-6 py-10 px-10 flex flex-col gap-10">
                  <h1 className="text-3xl font-bold">Informacion Personal</h1>
                  <div className="grid grid-cols-[auto,1fr,auto,1fr] gap-y-10 gap-x-10 px-5 items-center">
                    <p className="text-lg font-bold">Nombre</p>
                    <p className="text-lg break-words">
                      {employe.name} {employe.lastName}
                    </p>
                    <p className="text-lg font-bold">Cedula</p>
                    <p className="text-lg break-words">
                      {employe.identityCard}
                    </p>
                    <p className="text-lg font-bold">Fecha de Nacimiento</p>
                    <p className="text-lg break-words">
                      {formatearFecha(employe.birthdate)}
                    </p>
                    <p className="text-lg font-bold">Genero</p>
                    <p className="text-lg break-words">{employe.gender}</p>
                    <p className="text-lg font-bold">Direccion</p>
                    <p className="text-lg break-words">{employe.address}</p>
                    <p className="text-lg font-bold">Estado Civil</p>
                    <p className="text-lg break-words">{employe.civilStatus}</p>
                    <p className="text-lg font-bold">Telefono</p>
                    <p className="text-lg break-words">{employe.phone}</p>
                    <p className="text-lg font-bold">Email</p>
                    <p className="text-lg break-words">{employe.email}</p>
                    <p className="text-lg font-bold">Fecha de Inicio</p>
                    <p className="text-lg break-words">
                      {formatearFecha(employe.startDate)}
                    </p>
                    <p className="text-lg font-bold">Condicion</p>
                    <p className="text-lg break-words">{employe.condition}</p>
                    <p className="text-lg font-bold">Cargo</p>
                    <p className="text-lg break-words">{employe.charge}</p>
                    <p className="text-lg font-bold">Departamento</p>
                    <p className="text-lg break-words">{employe.department}</p>
                    <p className="text-lg font-bold">Cuenta</p>
                    <p className="text-lg break-words">{employe.bankAccount}</p>
                    <p className="text-lg font-bold">Salario Base</p>
                    <p className="text-lg break-words">{employe.baseSalary}</p>
                  </div>
                </section>
                <div className="flex justify-end m-2">
                  <div className="flex items-center gap-3">
                    <p>Agregar: </p>
                    <button className="bg-azulClaro p-2 pr-6 pl-6 text-white rounded-md font-semibold">
                      Percepcion
                    </button>
                    <button className="bg-azulClaro p-2 pr-6 pl-6 text-white rounded-md font-semibold">
                      Deduccion
                    </button>
                  </div>
                </div>
                {/* Esta seccion se debe modificar para obtener las percepciones y deducciones de la API */}
                <section className="bg-grisClaro rounded-md shadow-right-dark w-full pt-6 py-10 px-10 flex flex-col gap-10">
                  <h1 className="text-3xl font-bold">Recibo</h1>
                  <table className="w-full table-auto border-collapse">
                    <thead className="w-full">
                      <tr className="w-full">
                        <td className="text-xl py-1 px-3 font-bold w-3/5">
                          Descripcion
                        </td>
                        <td className="text-xl py-1 px-3 font-bold">
                          Percepcion
                        </td>
                        <td className="text-xl py-1 px-3 font-bold border-l-[1px] border-azulOscuro">
                          Deduccion
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-lg break-words py-3 px-3">
                          {employe.charge}
                        </td>
                        <td className="text-lg break-words py-3 px-3">
                          {employe.baseSalary} {currency}
                        </td>
                        <td className="text-lg break-words py-3 px-3 border-l-[1px] border-azulOscuro"></td>
                      </tr>
                      <tr>
                        <td className="text-lg break-words py-3 px-3">
                          {employe.charge}
                        </td>
                        <td className="text-lg break-words py-3 px-3">
                          {employe.baseSalary} {currency}
                        </td>
                        <td className="text-lg break-words py-3 px-3 border-l-[1px] border-azulOscuro"></td>
                      </tr>
                      <tr>
                        <td className="text-lg break-words py-3 px-3">
                          {employe.charge}
                        </td>
                        <td className="text-lg break-words py-3 px-3 border-b-[1px] border-azulOscuro"></td>
                        <td className="text-lg break-words py-3 px-3 border-b-[1px] border-l-[1px] border-azulOscuro">
                          {employe.baseSalary} {currency}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-xl py-1 px-3 font-bold">
                          Salario Bruto:
                        </td>
                        <td className="text-lg break-words py-3 px-3 border-b-[1px] border-azulOscuro">
                          {employe.baseSalary} {currency}
                        </td>
                        <td className="text-lg break-words py-3 px-3 border-b-[1px] border-l-[1px] border-azulOscuro"></td>
                      </tr>
                      <tr>
                        <td className="text-xl py-1 px-3 font-bold">
                          Salario Neto:
                        </td>
                        <td className="text-lg break-words py-3 px-3"></td>
                        <td className="text-lg break-words py-3 px-3 border-l-[1px] border-azulOscuro">
                          {employe.baseSalary} {currency}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <div className="flex justify-end items-center m-2">
                  <button className="bg-azulClaro p-2 pr-6 pl-6 text-white rounded-md font-semibold">
                    Descargar Recibo
                  </button>
                </div>
              </>
            </>
          )}
          {modalDelete && (
            <ModalDelete
              peticion={confirmDelete}
              setStateModal={setModalDelete}
            />
          )}
          {modalEdit && (
            <FormEmployeed
              dataEdit={employe}
              setStateModal={setModalEdit}
              confirm={confirmEdit}
            />
          )}
        </main>
      </div>
    </>
  )
}
