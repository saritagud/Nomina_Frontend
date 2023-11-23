import { useEffect, useState } from "react"
import { SideBar } from "./Sidebar"
import { Link } from "react-router-dom"
import { FaEllipsisV } from "react-icons/fa";
import ModalDelete from "./ModalDelete"

export function PrePayroll() {
  const [departments, setDepartments] = useState([])
  const [departmentSelected, setDepartmentSelected] = useState('0')
  const [payroll, setPayroll] = useState(false)
  const [employeeDelete, setEmployeeDelete] = useState(null)
  const [modalDelete, setModalDelete] = useState(false)
  const companyID = JSON.parse(localStorage.getItem('company')).id;
  // const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    fetch(`http://localhost:3000/department/all/${companyID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data.departments);
        if (data.departments) {
          setDepartments(data.departments)
        } else {
          console.log("Error:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [companyID])
  
  const deleteEmployee = () => {
    const indexItem = payroll.findIndex(item => item.id === employeeDelete)
    if (indexItem >= 0) {
      const newPayroll = [...payroll]
      newPayroll.splice(indexItem, 1)
      setEmployeeDelete(null)
      setPayroll(newPayroll)
      setModalDelete(false)
    }
  }
  
  const handlePayroll = (e) => {
    const departmentID = e.target.value

    // setPayroll([
    //   {
    //     "id": 1,
    //     "name": "Alexander",
    //     "lastName": "Avendaño",
    //     "identityCard": 29694896,
    //     "charge": "Full Stack",
    //     "periodicity": 30,
    //     "baseSalary": 400.50,
    //     "perceptions": 50.50,
    //     "deductions": 10.00
    //   },
    //   {
    //     "id": 2,
    //     "name": "Luis",
    //     "lastName": "Paredes",
    //     "identityCard": 45687814,
    //     "charge": "Backend",
    //     "periodicity": 30,
    //     "baseSalary": 350.50,
    //     "perceptions": 50.50,
    //     "deductions": 10.00
    //   },
    //   {
    //     "id": 3,
    //     "name": "Sara",
    //     "lastName": "Gudiño",
    //     "identityCard": 2846545,
    //     "charge": "Frontend",
    //     "periodicity": 30,
    //     "baseSalary": 500.50,
    //     "perceptions": 50.50,
    //     "deductions": 20.00
    //   },
    //   {
    //     "id": 4,
    //     "name": "Añilio",
    //     "lastName": "Garcia",
    //     "identityCard": 544864251,
    //     "charge": "Full Stack",
    //     "periodicity": 30,
    //     "baseSalary": 520.50,
    //     "perceptions": 80.00,
    //     "deductions": 15.00
    //   }
    // ])

    fetch(`http://localhost:3000/payroll/create-payroll/${companyID}/${departmentID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data.newCompany);
        if (data.employees) {
          setPayroll(data.employees)
        } else {
          console.log("Error:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  return (
    <div className="h-full">
      <SideBar />
      <main className="w-screen  p-10 flex flex-col gap-10 items-end">
        <section className="flex justify-between items-center w-4/5">
          <h1 className="text-3xl">Pre-Nomina</h1>
          <form className="flex gap-2">
            <select
              name="payroll"
              id="payroll"
              className="bg-azulClaro px-3 py-2 rounded-md text-grisClaro outline-none w-60"
              value={departmentSelected}
              onChange={handlePayroll}
            >
              <option
                value="0"
                disabled
              >
                Elegir Nomina
              </option>
              {departments.map(department => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
          </form>
        </section>
        {payroll?.length === 0 ? (
          <strong className="text-xl">
            No hay empleados para asignar a esta nomina
          </strong>
        ) : (
          payroll?.length > 0 ? (
            <>
              <table className="bg-grisClaro rounded-md shadow-right-dark px-4 border-separate border-spacing-0 border-spacing-y-4 w-4/5">
                <thead className="px-5">
                  <tr>
                    <th className="p-4 text-lg text-start">Empleado</th>
                    <th className="p-4 text-lg text-start">Cedula</th>
                    <th className="p-4 text-lg text-start">Cargo</th>
                    <th className="p-4 text-lg text-start">Periodo de pago</th>
                    <th className="p-4 text-lg text-start">Salario</th>
                    <th className="p-4 text-lg text-start">Percep.</th>
                    <th className="p-4 text-lg text-start">Deduc.</th>
                    <th className="p-4 text-lg text-start">Total</th>
                  </tr>
                </thead>
                <tbody className="px-5 relative">
                  {payroll.map(employee => (
                    <tr key={employee.id} className="bg-grisOscuro hover:bg-blue-300">
                      <td className="p-4 text-lg rounded-l-2xl">{employee.name} {employee.lastName}</td>
                      <td className="p-4 text-lg">{employee.identityCard}</td>
                      <td className="p-4 text-lg">{employee.charge}</td>
                      <td className="p-4 text-lg">{employee.periodicity} Dias</td>
                      <td className="p-4 text-lg">{employee.baseSalary} Bs.</td>
                      <td className="p-4 text-lg">{employee.perceptions} Bs.</td>
                      <td className="p-4 text-lg">{employee.deductions} Bs.</td>
                      <td className="p-4 text-lg">{(employee.baseSalary + employee.perceptions) - employee.deductions} Bs.</td>
                      <td className="relative p-4 text-lg rounded-r-2xl">
                        <input type="checkbox" name={`action${employee.id}`} id={`action${employee.id}`} className="hidden peer/action"/>
                        <label htmlFor={`action${employee.id}`} className="cursor-pointer">
                          <FaEllipsisV/>
                        </label>
                        <div className="hidden absolute peer-checked/action:flex gap-4 right-14 top-1/2 transform -translate-y-1/2 bg-grisClaro shadow-right-dark p-5 rounded-lg z-10">
                          <Link to={`/empleado/${employee.id}`} className="text-white w-28 text-center rounded-md bg-azulClaro px-2 py-1 font-semibold">Ver</Link>
                          <button className="text-white w-28 rounded-md bg-red-600 px-2 py-1 font-semibold" onClick={() => {
                            setEmployeeDelete(employee.id)
                            setModalDelete(true)
                          }}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <section className="flex justify-between w-full px-5">
                <p className="bg-azulClaro px-5 py-3 rounded-md text-grisClaro font-semibold">
                  Total de pagos: 40
                </p>
                <div className="flex gap-4">
                  <button className="bg-azulClaro px-3 py-2 m-auto rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold"
                    onClick={() => {
                      setDepartmentSelected("0")
                      setPayroll(null)
                    }}>
                    Cancelar Nomina
                  </button>
                  <Link to={'/nomina'} className="bg-azulClaro px-3 py-2 m-auto rounded-md placeholder-grisClaro text-grisClaro outline-none w-40 font-semibold text-center">
                    Generar Nomina
                  </Link>
                </div>
              </section>
            </>
          ) : (
            <strong className="text-xl">
              No se ha seleccionado una nomina
            </strong>
          )
        )}
        {modalDelete && (
          <ModalDelete peticion={deleteEmployee} setStateModal={setModalDelete}/>
        )}
      </main>
    </div>
  )
}
