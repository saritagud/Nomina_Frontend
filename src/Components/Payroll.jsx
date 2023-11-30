import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

export function Payroll() {
  const [statePayroll, setStatePayroll] = useState(
    localStorage.getItem("statePayroll")
      ? localStorage.getItem("statePayroll") === "true"
      : true
  );

  useEffect(() => {
    localStorage.setItem("statePayroll", statePayroll);
  }, [statePayroll]);

  //const payroll = null // Asi se ve cuando entra a la vista
  const payroll = [5]; // Colocar un numero en el arreglo para activar la tabla, dejar el arreglo vacio, simula que no hay empleados para esa nomina
  return (
    <div className="h-full">
      <main className="w-full p-10 flex flex-col gap-10">
        <section className="flex justify-between items-center ">
          <h1 className="text-3xl text-left w-full">Nomina</h1>

          <p className="bg-azulClaro px-3 py-2 rounded-md text-white outline-none w-40 font-semibold text-center">
            {statePayroll ? "Abierta" : "Cerrada"}
          </p>
        </section>
        {payroll?.length === 0 ? (
          <strong className="text-xl">
            No hay empleados para asignar a esta nomina
          </strong>
        ) : (
          payroll?.length > 0 && (
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
                  <tr className="bg-grisOscuro">
                    <td className="p-4 text-lg rounded-l-2xl">Sara Gudiño</td>
                    <td className="p-4 text-lg text-center">30391704</td>
                    <td className="p-4 text-lg text-center">Desarrollador</td>
                    <td className="p-4 text-lg text-center">Contratada</td>
                    <td className="p-4 text-lg text-center">3 años</td>
                    <td className="p-4 text-lg text-center">10.000$</td>
                    <td
                      className={
                        !statePayroll
                          ? "p-4 text-lg text-center rounded-r-md"
                          : "p-4 text-lg text-center"
                      }
                    >
                      10.000$
                    </td>
                    {statePayroll && (
                      <td className="relative p-4 text-lg rounded-r-2xl">
                        <input
                          type="checkbox"
                          name={"action"}
                          id={"action"}
                          className="hidden peer/action"
                        />
                        <label htmlFor={"action"} className="cursor-pointer">
                          <FaEllipsisV />
                        </label>
                        <div className="hidden absolute peer-checked/action:flex gap-4 right-20 top-1/2 transform -translate-y-1/2 bg-grisClaro shadow-right-dark p-5 rounded-lg z-10">
                          <Link //to={`/empleado/${employee.id}`}
                            className="text-white w-28 text-center rounded-md bg-azulClaro px-2 py-1 font-semibold"
                          >
                            Ver
                          </Link>
                        </div>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
              <section className="flex justify-between  px-5 ">
                <p className="bg-azulClaro px-5 py-3 rounded-md text-grisClaro font-semibold">
                  Total de empelados: 40
                </p>
                <div className="flex gap-4">
                  <button
                    className={
                      !statePayroll
                        ? "bg-azulClaro/70 cursor-not-allowed px-3 py-2 m-auto rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold"
                        : "bg-azulClaro px-3 py-2 m-auto rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold"
                    }
                    onClick={() => setStatePayroll(!statePayroll)}
                    disabled={!statePayroll}
                  >
                    Cerrar Nomina
                  </button>

                  <button className="bg-azulClaro px-3 py-2 m-auto rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold">
                    Descargar
                  </button>
                </div>
              </section>
            </>
          )
        )}
      </main>
    </div>
  );
}
