import { SideBar } from "./Sidebar";

export function Company() {
  const company = [5];
  return (
    <>
      <div className="flex">
        <SideBar />
        <main className="w-screen h-screen p-10 flex flex-col gap-10">
          <section className="flex justify-between items-center">
            <h1 className="text-3xl">Empresas creadas</h1>
          </section>
          {company?.length === 0 ? (
            <strong className="text-xl">No hay empresas creadas aun</strong>
          ) : (
            company?.length > 0 && (
              <>
                <table className="bg-grisClaro rounded-md shadow-right-dark w-full px-4 border-separate border-spacing-0 border-spacing-y-4">
                  <thead className="px-5">
                    <tr>
                      <th className="p-4 text-lg text-start">Nombre</th>
                      <th className="p-4 text-lg text-start">Tipo</th>
                    </tr>
                  </thead>
                  <tbody className="px-5">
                    <tr className="bg-grisOscuro">
                      <td className="p-4 text-lg rounded-l-2xl">
                        ASAL Company
                      </td>
                      <td className="p-4 text-lg">Desarrollo</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )
          )}
        </main>
      </div>
    </>
  );
}
