import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllPayrolls } from "../services/payroll";
//

export function PayrollHistory() {
  const { id: companyID } = JSON.parse(localStorage.getItem("company"))
  const token = JSON.parse(localStorage.getItem("token"))

  const [payrollsOpen, setPayrollsOpen] = useState([]);
  const [payrollsClosed, setPayrollsClosed] = useState([]);

  useEffect(() => {
    const getPayrolls = async () => {
      const res = await getAllPayrolls(token, companyID)
      if (res.payrollsOpen) {
        setPayrollsOpen(res.payrollsOpen)
      }
      if (res.payrollsClosed) {
        setPayrollsClosed(res.payrollsClosed)
      }
    }
    getPayrolls()
  }, [])

  return (
    <div className="h-full">
      <main className="w-full flex flex-col items-center justify-center p-12 gap-10">
        <h1 className="text-3xl text-left font-semibold w-full">Nominas</h1>
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <div className="bg-blue-900 text-white px-10 py-1 rounded-md font-semibold text-center mb-6  text-xl">
              Abiertas
            </div>
            <table className="bg-grisClaro rounded-md shadow-right-dark px-4 border-separate border-spacing-0 border-spacing-y-4 w-[70vh] border-2 border-grisOscuro">
              <thead className="px-5">
                <tr>
                  <th className="p-4 text-xl text-start">Nomina</th>
                  <th className="p-4 text-xl text-start">Estado</th>
                </tr>
              </thead>
              <tbody>
                {payrollsOpen.map((payroll) => (
                  <tr key={payroll.id} className="bg-grisOscuro">
                    <td className="p-4 text-lg rounded-l-2xl">
                      {payroll.title}
                    </td>
                    <td className="p-4 text-lg">{payroll.state}</td>
                    <td className="p-4 rounded-r-md">
                      <Link
                        to={`/nomina/${payroll.id}`}
                        className="text-white w-28 text-center rounded-md bg-azulClaro px-2 py-1 font-semibold"
                      >
                        Ir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="flex flex-col items-center "
            style={{ marginLeft: "50px" }}
          >
            <div className="bg-blue-900 text-white px-10 py-1 rounded-md  font-semibold text-center mb-6  text-xl">
              Cerradas
            </div>
            <table className="bg-grisClaro rounded-md shadow-right-dark px-4 border-separate border-spacing-0 border-spacing-y-4 w-[70vh] border-2 border-grisOscuro">
              <thead className="px-5">
                <tr>
                  <th className="p-4 text-xl text-start">Nomina</th>
                  <th className="p-4 text-xl text-start">Estado</th>
                </tr>
              </thead>
              <tbody>
                {payrollsClosed.map((payroll) => (
                  <tr key={payroll.id} className="bg-grisOscuro">
                    <td className="p-4 text-lg rounded-l-2xl">
                      {payroll.title}
                    </td>
                    <td className="p-4 text-lg">{payroll.state}</td>
                    <td className="p-4 rounded-r-md">
                      <Link
                        to={`/nomina/${payroll.id}`}
                        className="text-white w-28 text-center rounded-md bg-azulClaro px-2 py-1 font-semibold"
                      >
                        Ir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
