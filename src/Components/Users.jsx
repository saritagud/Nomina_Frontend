import { SideBar } from "./Sidebar";
import { useEffect, useState } from "react";
export function Users() {
  let users = [5];
  /* const [users, setUser] = useState([]);
  const companyId = JSON.parse(localStorage.getItem("company")).id;

  useEffect(() => {
    fetch(`http://localhost:3000/user/all-company/${companyId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.users);
        setUser(data.users);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []); */
  return (
    <>
      <div className="flex">
        <SideBar />
        <main className="w-screen h-screen p-10 flex flex-col gap-10">
          <section className="flex justify-between items-center">
            <h1 className="text-3xl">Usuarios creados</h1>
          </section>
          {users?.length === 0 ? (
            <strong className="text-xl">No hay usuarios creados aun</strong>
          ) : (
            users?.length > 0 && (
              <>
                <table className="bg-grisClaro rounded-md shadow-right-dark w-full px-4 border-separate border-spacing-0 border-spacing-y-4">
                  <thead className="px-5">
                    <tr>
                      <th className="p-4 text-lg text-start">Nombre</th>
                      <th className="p-4 text-lg text-start">Rol</th>
                    </tr>
                  </thead>
                  {users.map((allUsers) => (
                    <tbody key={allUsers.id} className="px-5">
                      <tr className="bg-grisOscuro">
                        <td className="p-4 text-lg rounded-l-2xl">
                          sara
                        </td>
                        <td className="p-4 text-lg">admin</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </>
            )
          )}
        </main>
      </div>
    </>
  );
}
