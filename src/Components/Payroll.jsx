import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { generatePayrollPDF } from "../logic/functionsPDF"
import { statesPayroll } from "../logic/constantes";
import { deletePayroll, getPayroll, updateStatePayroll } from "../services/payroll";
import { formatTimeDifference } from "../logic/functions";
import ModalDelete from "./ModalDelete";

export function Payroll() {
  const navegar = useNavigate()
  const { id: payrollID } = useParams()
  const { id: companyID, currency } = JSON.parse(localStorage.getItem("company"))
  const token = JSON.parse(localStorage.getItem("token"))
  const [modalDeletePayroll, setModalDeletePayroll] = useState(false)
  const [payroll, setPayroll] = useState([]);

  useEffect(() => {
    const getPayrollData = async () => {
      const res = await getPayroll(token, companyID, payrollID)
      if (res.payroll) {
        setPayroll(res.payroll)
      }
    }
    getPayrollData()
  }, [])

  const confirmDeletePayroll = async () => {
    // Aqui va ir el codigo con la peticion para eliminar un empleado de esta pre-nomina
    const res = await deletePayroll(token, payroll.id, companyID)
    if (res.message) {
      navegar('/historial')
    } else {
      console.error(res)
    }
  }
  
  const confirmClosePayroll = async () => {
    const res = await updateStatePayroll(token, payroll.id, companyID, {state: statesPayroll.Cerrada})
    if (res.message) {
      setPayroll({
        ...payroll,
        state: statesPayroll.Cerrada
      })
    } else {
      console.error(res)
    }
  }

  // const [statePayroll, setStatePayroll] = useState(
  //   localStorage.getItem("statePayroll")
  //     ? localStorage.getItem("statePayroll") === "true"
  //     : true
  // );

  // useEffect(() => {
  //   localStorage.setItem("statePayroll", statePayroll);
  // }, [statePayroll]);

  return (
    <div className="h-full">
      <main className="w-full p-10 flex flex-col gap-10">
        <section className="flex justify-between items-center ">
          <h1 className="text-3xl text-left w-full">Nomina</h1>

          <p className="bg-azulClaro px-3 py-2 rounded-md text-white outline-none w-40 font-semibold text-center">
            {statesPayroll[payroll?.state]}
          </p>
        </section>
        {payroll?.employees?.length === 0 ? (
          <strong className="text-xl">
            No hay empleados para asignados a esta nomina
          </strong>
        ) : (
          payroll?.employees?.length > 0 && (
            <>
              <table className="bg-grisClaro rounded-md shadow-right-dark  px-4 border-separate border-spacing-0 border-spacing-y-4 border-2 border-grisOscuro">
                <thead className="px-5">
                  <tr>
                    <th className="p-4 text-lg text-center">Empleado</th>
                    <th className="p-4 text-lg text-center">Cédula</th>
                    <th className="p-4 text-lg text-center">Cargo</th>
                    <th className="p-4 text-lg text-center">Condicion</th>
                    <th className="p-4 text-lg text-center">Años</th>
                    <th className="p-4 text-lg text-center">Salario Bruto</th>
                    <th className="p-4 text-lg text-center">Salario Neto</th>
                  </tr>
                </thead>
                <tbody className="px-5">
                  {payroll.employees.map(employee => (
                    <tr key={employee.employeeName.id} className="bg-grisOscuro">
                      <td className="p-4 text-lg rounded-l-2xl max-w-[20ch]">
                        {employee.employeeName.name} {employee.employeeName.lastName}
                      </td>
                      <td className="p-4 text-lg">{employee.employeeName.identityCard}</td>
                      <td className="p-4 text-lg max-w-[20ch]">
                        {employee.employeeName.charge}
                      </td>
                      <td className="p-4 text-lg">{employee.employeeName.condition}</td>
                      <td className="p-4 text-lg">
                        {formatTimeDifference(employee.employeeName.startDate)}
                      </td>
                      <td className="p-4 text-lg">
                        {employee.grossSalary} {currency}
                      </td>
                      <td
                        className={
                          payroll.state !== statesPayroll.Abierta
                            ? "p-4 text-lg text-center rounded-r-md"
                            : "p-4 text-lg text-center"
                        }
                      >
                        {employee.netSalary} {currency}
                      </td>
                      {payroll.state === statesPayroll.Abierta && (
                        <td className="relative p-4 text-lg rounded-r-2xl">
                          <input
                            type="checkbox"
                            name={`action${employee.employeeName.id}`}
                            id={`action${employee.employeeName.id}`}
                            className="hidden peer/action"
                          />
                          <label htmlFor={`action${employee.employeeName.id}`} className="cursor-pointer">
                            <FaEllipsisV />
                          </label>
                          <div className="hidden absolute peer-checked/action:flex gap-4 right-20 top-1/2 transform -translate-y-1/2 bg-grisClaro shadow-right-dark p-5 rounded-lg z-10">
                            <Link 
                              to={`/empleado/${employee.employeeName.id}`}
                              className="text-white w-28 text-center rounded-md bg-azulClaro px-2 py-1 font-semibold"
                            >
                              Ver
                            </Link>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <section className="flex justify-between  px-5 ">
                <p className="bg-azulClaro px-5 py-3 rounded-md text-grisClaro font-semibold">
                  Total de empelados: {payroll.employees.length}
                </p>
                <div className="flex gap-4">
                  <button
                    className={
                      payroll.state !== statesPayroll.Abierta
                        ? "bg-azulClaro/70 cursor-not-allowed px-3 py-2 m-auto rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold"
                        : "bg-azulClaro px-3 py-2 m-auto rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold"
                    }
                    onClick={() => setModalDeletePayroll(true)}
                    disabled={payroll.state !== statesPayroll.Abierta}
                  >
                    Cancelar Nomina
                  </button>
                  <button
                    className={
                      payroll.state !== statesPayroll.Abierta
                        ? "bg-azulClaro/70 cursor-not-allowed px-3 py-2 m-auto rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold"
                        : "bg-azulClaro px-3 py-2 m-auto rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold"
                    }
                    onClick={() => confirmClosePayroll()}
                    disabled={payroll.state !== statesPayroll.Abierta}
                  >
                    Cerrar Nomina
                  </button>

                  <button className="bg-azulClaro px-3 py-2 m-auto rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold"
                    onClick={() => generatePayrollPDF(payroll.employees)}>
                    Descargar
                  </button>
                </div>
              </section>
            </>
          )
        )}
        {modalDeletePayroll && (
          <ModalDelete
            peticion={confirmDeletePayroll}
            setStateModal={setModalDeletePayroll}
          />
        )}
      </main>
    </div>
  );
}
