import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from 'react-icons/fa';

export function Companies() {
  const [company, setCompany] = useState([]);
  const [editMode, setEditMode] = useState(false); // Definición de editMode
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetch("http://localhost:3000/company/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setCompany(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  console.log(company);

  const handleEditClick = () => {
    setEditMode(true); // Cambiar a editMode a true al hacer clic en Editar
  };

  const handleCurrencyChange = (e, companyId) => {
    const updatedValue = e.target.value;
  
    // Actualizar el estado local inmediatamente
    setCompany(prevCompany => {
      const updatedCompanies = prevCompany.allCompanies.map(companyItem => {
        if (companyItem.id === companyId) {
          return { ...companyItem, currency: updatedValue };
        }
        return companyItem;
      });
      return { ...prevCompany, allCompanies: updatedCompanies };
    });
  
    // Realizar la solicitud PUT para actualizar los datos en la API
    fetch(`http://localhost:3000/company/edit-company/${companyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currency: updatedValue }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Currency updated:", data);
      })
      .catch(error => {
        console.error("Error updating currency:", error);
      });
  };
  
  // Función similar para handleCountryChange
  
  const handleCountryChange = (e, companyId) => {
    const updatedValue = e.target.value;
  
    setCompany(prevCompany => {
      const updatedCompanies = prevCompany.allCompanies.map(companyItem => {
        if (companyItem.id === companyId) {
          return { ...companyItem, country: updatedValue };
        }
        return companyItem;
      });
      return { ...prevCompany, allCompanies: updatedCompanies };
    });
  
    fetch(`http://localhost:3000/company/edit-company/${companyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ country: updatedValue }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Country updated:", data);
      })
      .catch(error => {
        console.error("Error updating country:", error);
      });
  };
  const handleSaveChanges = (id) => {
    window.location.reload();
  };

  return (
    <>
       <div className="flex justify-center items-center h-screen"> {/* Centra el contenido vertical y horizontalmente */}
      <main className="max-w-4xl w-full p-10"> {/* Limita el ancho máximo de la tabla */}
          <section className="flex justify-between items-center">
            <h1 className="text-3xl mb-6">Empresas creadas</h1>
          </section>
          {company?.length === 0 ? (
            <strong className="text-xl">No hay empresas creadas aun</strong>
          ) : (
            <>
               <table className="bg-grisClaro rounded-md shadow-right-dark w-full px-4 border-separate border-spacing-0 border-spacing-y-5">
                <thead className="px-5">
                  <tr>
                    <th className="p-4 text-lg text-start ">Nombre</th>
                    <th className="p-4 text-lg text-start">Tipo</th>
                    <th className="p-4 text-lg text-start">Moneda</th>
                    <th className="p-4 text-lg text-start">País</th>
                  </tr>
                </thead>
                {company.allCompanies.map((companys) => (
  <tbody key={companys.id} className="px-5">
    <tr className="bg-grisOscuro">
      <td className="p-4 text-lg rounded-l-2xl">{companys.name}</td>
      <td className="p-4 text-lg">{companys.type}</td>
      {!editMode ? (
        <>
          <td className="p-4 text-lg">{companys.currency}</td>
          <td className="p-4 text-lg">{companys.country}</td>
        </>
      ) : (
        <>
          <td className="p-4 text-lg">
            <input
              type="text"
              value={companys.currency}
              onChange={(e) => handleCurrencyChange(e, companys.id)}
              className="bg-grisOscuro border border-transparent focus:outline-none focus:ring-2 focus:ring-azulClaro rounded-md px-3 py-2"
            />
          </td>
          <td className="p-4 text-lg">
            <input
              type="text"
              value={companys.country}
              onChange={(e) => handleCountryChange(e, companys.id)}
              className="bg-grisOscuro border border-transparent focus:outline-none focus:ring-2 focus:ring-azulClaro rounded-md px-3 py-2"
            />
          </td>
        </>
      )}
                      <td className="relative p-4 text-lg rounded-r-2xl">
                        <input
                          type="checkbox"
                          name={`action${companys.id}`}
                          id={`action${companys.id}`}
                          className="hidden peer/action"
                        />
                        <label
                          htmlFor={`action${companys.id}`}
                          className="cursor-pointer"
                        >
                          <FaEllipsisV />
                        </label>
                        <div className="hidden absolute peer-checked/action:flex gap-4 right-52 top-1/2 transform -translate-y-1/2 bg-grisClaro shadow-right-dark p-5 rounded-lg z-10">
                          <Link
                            className="text-white w-28 rounded-md bg-azulClaro px-2 py-1 font-semibold text-center"
                            to={""}
                          >
                            Ver
                          </Link>
                          <button
                            className="text-white w-28 rounded-md bg-azulClaro px-2 py-1 font-semibold"
                            onClick={handleEditClick}
                          >
                            Editar
                          </button>
                          <button
                          className="text-white w-28 rounded-md bg-azulClaro px-2 py-1 font-semibold"
                          onClick={() => handleSaveChanges(company.id)}
                        >
                          Guardar
                        </button>
                          <button
                            className="text-white w-28 rounded-md bg-red-600 px-2 py-1 font-semibold"
                            onClick={() => {}}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </>
          )}
        </main>
      </div>
    </>
  );
}
