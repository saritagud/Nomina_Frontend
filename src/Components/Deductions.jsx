import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaEllipsisV } from "react-icons/fa";
import { createDeductionData, deleteEmployee, editDeductionData, getAllDeductions } from "../services/deductions";
import { addItemToState, deleteItemFromState, udpateItemFromState } from "../logic/functions";
import ModalDelete from "./ModalDelete";
import { AddDeductions } from "./AddDeductions";

export function Deductions() {
  const token = JSON.parse(localStorage.getItem("token"))
  const navegar = useNavigate()
  const { emploID } = useParams()
  const [deductions, setDeductions] = useState([])
  const [deductionSelect, setDeductionSelect] = useState(null)
  const [modalAddDeduc, setModalAddDeduc] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)

  useEffect(() => {
    const getDeduc = async () => {
      const res = await getAllDeductions(token, emploID)
      if (res?.deductions) {
        setDeductions(res.deductions)
      }
    }
    getDeduc()
  }, [])

  
  const confirmDelete = async () => {
    const res = await deleteEmployee(token, deductionSelect, emploID)
    if (res.message) {
      const newState = deleteItemFromState(deductionSelect, [...deductions])
      setDeductions(newState)
    } else {
      console.error(res)
    }
  }

  const confirmAddDeduction = async (data, deductionId) => {
    const res = await createDeductionData(token, emploID, deductionId ,data)
    if (res) {
    //   console.log('Success: ', res);
      const newList = addItemToState(res, [...deductions])
      setDeductions(newList)
      setModalAddDeduc(false)
    } else {
      console.error(res)
    }
  }

  const confirmEditDeduction = async (data, deductionId) => {
    const res = await editDeductionData(token, emploID, deductionId ,data)
    if (res) {
    //   console.log('Success: ', res);
      const newList = udpateItemFromState(res, [...deductions])
      setDeductions(newList)
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
            <h1 className="text-3xl">Deducciones</h1>
          </div>
          <div>
            <button
              className="bg-azulClaro p-2 pr-6 pl-6 text-white rounded-md font-semibold"
              onClick={() => setModalAddDeduc(true)}
            >
              Agregar
            </button>
          </div>
        </section>
        {deductions.length > 0 && (
          <section className="">
            <table className="w-full bg-grisClaro rounded-md shadow-right-dark px-4 border-separate border-spacing-0 border-spacing-y-4 border-2 border-grisOscuro">
              <thead className="px-5">
                <tr>
                  <th className="p-4 text-lg text-start">Tipo</th>
                  <th className="p-4 text-lg text-start">Porcentaje</th>
                  <th className="p-4 text-lg text-start">Aplicacion</th>
                  <th className="p-4 text-lg text-start">Estado</th>
                </tr>
              </thead>
              <tbody className="px-5">
                {deductions.map((deduction) => (
                  <tr className="bg-grisOscuro hover:bg-blue-300" key={deduction.id}>
                    <td className="p-4 text-lg rounded-l-2xl">{deduction.deductionName.name}</td>
                    <td className="p-4 text-lg">{deduction.percentage} %</td>
                    <td className="p-4 text-lg">{deduction.application}</td>
                    <td className="p-4 text-lg">{deduction.state}</td>
                    <td className="relative p-4 text-lg rounded-r-2xl">
                      <input type="checkbox" name={`action${deduction.id}`} id={`action${deduction.id}`} className="hidden peer/action"/>
                      <label htmlFor={`action${deduction.id}`} className="cursor-pointer">
                        <FaEllipsisV/>
                      </label>
                      <div className="hidden absolute peer-checked/action:flex gap-4 right-28 top-1/2 transform -translate-y-1/2 bg-grisClaro shadow-right-dark p-5 rounded-lg z-10">
                        <button className="text-white w-28 rounded-md bg-azulClaro px-2 py-1 font-semibold" onClick={() => {
                          setDeductionSelect(deduction)
                          setModalEdit(true)
                        }}>Editar</button>
                        <button className="text-white w-28 rounded-md bg-red-600 px-2 py-1 font-semibold" onClick={() => {
                          setDeductionSelect(deduction.id)
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
        {modalAddDeduc && (
          <AddDeductions
            setStateModal={setModalAddDeduc}
            confirm={confirmAddDeduction}
          />
        )}
        {modalDelete && (
          <ModalDelete peticion={confirmDelete} setStateModal={setModalDelete}/>
        )}
        {modalEdit && (
          <AddDeductions
            dataEdit={deductionSelect}
            setStateModal={setModalEdit}
            confirm={confirmEditDeduction}
          />
        )}
      </main>
    </div>
  )
}
