import { useState } from "react";
import { Link } from "react-router-dom";
//

export function PayrollHistory() {
  const [payrollsOpen, setPayrollsOpen] = useState([
    {
      id: 1,
      name: "Nomina Empleados",
      status: "Abierta",
    },
    {
      id: 2,
      name: "Nomina Empleados",
      status: "Abierta",
    },
    {
      id: 3,
      name: "Nomina Empleados",
      status: "Abierta",
    },
    {
      id: 4,
      name: "Nomina Empleados",
      status: "Abierta",
    },
    {
      id: 5,
      name: "Nomina Empleados",
      status: "Abierta",
    },
    {
      id: 6,
      name: "Nomina Empleados",
      status: "Abierta",
    },
    // Otros datos de nóminas abiertas
  ]);

  const [payrollsClosed, setPayrollsClosed] = useState([
    {
      id: 1,
      name: "Nomina Empleados",
      status: "Cerrada",
    },
    {
      id: 2,
      name: "Nomina Empleados",
      status: "Cerrada",
    },
    {
      id: 3,
      name: "Nomina Empleados",
      status: "Cerrada",
    },
    {
      id: 4,
      name: "Nomina Empleados",
      status: "Cerrada",
    },
    {
      id: 5,
      name: "Nomina Empleados",
      status: "Cerrada",
    },
    {
      id: 6,
      name: "Nomina Empleados",
      status: "Cerrada",
    },
    // Otros datos de nóminas cerradas
  ]);

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
                      {payroll.name}
                    </td>
                    <td className="p-4 text-lg">{payroll.status}</td>
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
                      {payroll.name}
                    </td>
                    <td className="p-4 text-lg">{payroll.status}</td>
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
