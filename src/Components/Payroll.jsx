import { SideBar } from "./Sidebar"

export function Payroll() {
  const payroll = null // Asi se ve cuando entra a la vista
  // const payroll = [] // Colocar un numero en el arreglo para activar la tabla, dejar el arreglo vacio, simula que no hay empleados para esa nomina
  return (
    <div className="flex">
      <SideBar />
      <main className="w-screen h-screen p-10 flex flex-col gap-10">
        <section className="flex justify-between items-center">
          <h1 className="text-3xl">Nomina</h1>
          <form className="flex gap-2">
            <select
              name="payroll"
              id="payroll"
              className="bg-azulClaro px-3 py-2 rounded-md text-grisClaro outline-none w-60"
            >
              <option
                value="0"
                disabled
                selected
              >
                Elegir Nomina
              </option>
              <option value="Nomina">Nomina</option>
              <option value="Nomina">Nomina</option>
              <option value="Nomina">Nomina</option>
              <option value="Nomina">Nomina</option>
            </select>
            <button className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold">
              Generar Nomina
            </button>
          </form>
        </section>
        {payroll?.length === 0 ? (
          <strong className="text-xl">
            No hay empleados para asignar a esta nomina
          </strong>
        ) : (
          payroll?.length > 0 && (
            <>
              <table className="bg-grisClaro rounded-md shadow-right-dark w-full px-4 border-separate border-spacing-0 border-spacing-y-4">
                <thead className="px-5">
                  <tr>
                    <th className="p-4 text-lg text-start">Empleado</th>
                    <th className="p-4 text-lg text-start">Periodo de pago</th>
                    <th className="p-4 text-lg text-start">Salario</th>
                    <th className="p-4 text-lg text-start">Percep.</th>
                    <th className="p-4 text-lg text-start">Deduc.</th>
                    <th className="p-4 text-lg text-start">Depart.</th>
                  </tr>
                </thead>
                <tbody className="px-5">
                  <tr className="bg-grisOscuro">
                    <td className="p-4 text-lg rounded-l-2xl">Sara Gudiño</td>
                    <td className="p-4 text-lg">30</td>
                    <td className="p-4 text-lg">20.000$</td>
                    <td className="p-4 text-lg">500$</td>
                    <td className="p-4 text-lg">100$</td>
                    <td className="p-4 text-lg rounded-r-2xl">
                      Recursos Humanos
                    </td>
                  </tr>
                  <tr className="bg-grisOscuro">
                    <td className="p-4 text-lg rounded-l-2xl">Sara Gudiño</td>
                    <td className="p-4 text-lg">30</td>
                    <td className="p-4 text-lg">20.000$</td>
                    <td className="p-4 text-lg">500$</td>
                    <td className="p-4 text-lg">100$</td>
                    <td className="p-4 text-lg rounded-r-2xl">
                      Recursos Humanos
                    </td>
                  </tr>
                  <tr className="bg-grisOscuro">
                    <td className="p-4 text-lg rounded-l-2xl">Sara Gudiño</td>
                    <td className="p-4 text-lg">30</td>
                    <td className="p-4 text-lg">20.000$</td>
                    <td className="p-4 text-lg">500$</td>
                    <td className="p-4 text-lg">100$</td>
                    <td className="p-4 text-lg rounded-r-2xl">
                      Recursos Humanos
                    </td>
                  </tr>
                  <tr className="bg-grisOscuro">
                    <td className="p-4 text-lg rounded-l-2xl">Sara Gudiño</td>
                    <td className="p-4 text-lg">30</td>
                    <td className="p-4 text-lg">20.000$</td>
                    <td className="p-4 text-lg">500$</td>
                    <td className="p-4 text-lg">100$</td>
                    <td className="p-4 text-lg rounded-r-2xl">
                      Recursos Humanos
                    </td>
                  </tr>
                </tbody>
              </table>
              <section className="flex justify-between w-full px-5">
                <p className="bg-azulClaro px-5 py-3 rounded-md text-grisClaro font-semibold">
                  Total de pagos: 40
                </p>
                <div className="flex gap-4">
                  <button className="bg-azulClaro px-3 py-2 m-auto rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold">
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
  )
}
