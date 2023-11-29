import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaEllipsisV } from "react-icons/fa";
import { createPerceptionData, deleteEmployee, editPerceptionData, getAllPerceptions } from "../services/perceptions";
import { addItemToState, deleteItemFromState, udpateItemFromState } from "../logic/functions";
import ModalDelete from "./ModalDelete";
import { AddPerceptions } from "./AddPerceptions";

export function Perceptions() {
  const token = JSON.parse(localStorage.getItem("token"))
  const { currency } = JSON.parse(localStorage.getItem("company"))
  const navegar = useNavigate()
  const { emploID } = useParams()
  const [perceptions, setPerceptions] = useState([])
  const [perceptionSelect, setPerceptionSelect] = useState(null)
  const [modalAddPercep, setModalAddPercep] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)

  useEffect(() => {
    const getPercep = async () => {
      const res = await getAllPerceptions(token, emploID)
      if (res?.perceptions) {
        setPerceptions(res.perceptions)
      }
    }
    getPercep()
  }, [])

  
  const confirmDelete = async () => {
    const res = await deleteEmployee(token, perceptionSelect, emploID)
    if (res.message) {
      const newState = deleteItemFromState(perceptionSelect, [...perceptions])
      setPerceptions(newState)
    } else {
      console.error(res)
    }
  }

  const confirmAddPerception = async (data, perceptionId) => {
    const res = await createPerceptionData(token, emploID, perceptionId ,data)
    if (res) {
      // console.log('Success: ', res);
      const newList = addItemToState(res, [...perceptions])
      setPerceptions(newList)
      setModalAddPercep(false)
    } else {
      console.error(res)
    }
  }

  const confirmEditPerception = async (data, perceptionId) => {
    const res = await editPerceptionData(token, emploID, perceptionId ,data)
    if (res) {
      // console.log('Success: ', res);
      const newList = udpateItemFromState(res, [...perceptions])
      setPerceptions(newList)
      setModalEdit(false)
    } else {
      console.error(res)
    }
  }

  return (
    <div className="h-full">
      <main className="relative px-10 py-5 flex flex-col gap-10 w-full">
        <section className="flex justify-between items-center gap-5">
          <div className="flex items-center gap-5">
            <BiArrowBack
              className="text-3xl cursor-pointer translate-y-[2px]"
              onClick={() => navegar(`/empleado/${emploID}`)}
            />
            <h1 className="text-3xl">Percepciones</h1>
          </div>
          <div>
            <button
              className="bg-azulClaro p-2 pr-6 pl-6 text-white rounded-md font-semibold"
              onClick={() => setModalAddPercep(true)}
            >
              Agregar
            </button>
          </div>
        </section>
        {perceptions.length > 0 && (
          <section className="">
            <table className="w-full bg-grisClaro rounded-md shadow-right-dark px-4 border-separate border-spacing-0 border-spacing-y-4 border-2 border-grisOscuro">
              <thead className="px-5">
                <tr>
                  <th className="p-4 text-lg text-start">Tipo</th>
                  <th className="p-4 text-lg text-start">Monto</th>
                  <th className="p-4 text-lg text-start">Aplicacion</th>
                  <th className="p-4 text-lg text-start">Estado</th>
                </tr>
              </thead>
              <tbody className="px-5">
                {perceptions.map((perception) => (
                  <tr className="bg-grisOscuro hover:bg-blue-300" key={perception.id}>
                    <td className="p-4 text-lg rounded-l-2xl">{perception.perceptionName.name}</td>
                    <td className="p-4 text-lg">{perception.amount} {currency}</td>
                    <td className="p-4 text-lg">{perception.application}</td>
                    <td className="p-4 text-lg">{perception.state}</td>
                    <td className="relative p-4 text-lg rounded-r-2xl">
                      <input type="checkbox" name={`action${perception.id}`} id={`action${perception.id}`} className="hidden peer/action"/>
                      <label htmlFor={`action${perception.id}`} className="cursor-pointer">
                        <FaEllipsisV/>
                      </label>
                      <div className="hidden absolute peer-checked/action:flex gap-4 right-28 top-1/2 transform -translate-y-1/2 bg-grisClaro shadow-right-dark p-5 rounded-lg z-10">
                        <button className="text-white w-28 rounded-md bg-azulClaro px-2 py-1 font-semibold" onClick={() => {
                          setPerceptionSelect(perception)
                          setModalEdit(true)
                        }}>Editar</button>
                        <button className="text-white w-28 rounded-md bg-red-600 px-2 py-1 font-semibold" onClick={() => {
                          setPerceptionSelect(perception.id)
                          setModalDelete(true)
                        }}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        {modalAddPercep && (
          <AddPerceptions
            setStateModal={setModalAddPercep}
            confirm={confirmAddPerception}
          />
        )}
        {modalDelete && (
          <ModalDelete peticion={confirmDelete} setStateModal={setModalDelete}/>
        )}
        {modalEdit && (
          <AddPerceptions
            dataEdit={perceptionSelect}
            setStateModal={setModalEdit}
            confirm={confirmEditPerception}
          />
        )}
      </main>
    </div>
  )
}
