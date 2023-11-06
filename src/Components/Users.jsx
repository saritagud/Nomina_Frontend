import { SideBar } from "./Sidebar"

export function Users(){
    const users = [5] // Colocar un numero en el arreglo para activar la tabla, dejar el arreglo vacio, simula que no hay empleados para esa nomina

    return(
        <>
            <div className="flex">
        <SideBar />
        <main className="w-screen h-screen p-10 flex flex-col gap-10">
          <section className="flex justify-between items-center">
            <h1 className="text-3xl">Usuarios creados</h1>
          </section>
          {users?.length === 0 ? (
            <strong className="text-xl">No hay empresas creadas aun</strong>
          ) : (
            users?.length > 0 && (
              <>
                <table className="bg-grisClaro rounded-md shadow-right-dark w-full px-4 border-separate border-spacing-0 border-spacing-y-4">
                  <thead className="px-5">
                    <tr>
                      <th className="p-4 text-lg text-start">Nombre</th>
                      <th className="p-4 text-lg text-start">Correo</th>
                      <th className="p-4 text-lg text-start">Empresa</th>
                    </tr>
                  </thead>
                  <tbody className="px-5">
                    <tr className="bg-grisOscuro">
                      <td className="p-4 text-lg rounded-l-2xl">
                        Sara
                      </td>
                      <td className="p-4 text-lg">sara@gmail.com</td>
                      <td className="p-4 text-lg">ASAL Company</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )
          )}
        </main>
      </div>
        </>
    )
}