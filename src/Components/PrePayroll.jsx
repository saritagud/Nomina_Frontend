import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaAngleDown, FaEllipsisV } from "react-icons/fa"
import ModalDelete from "./ModalDelete"
import { paymentPeriod as paymentPeriods, statesPayroll } from "../logic/constantes"
import {
  formatMonth,
  formatRangeFirst,
  formatRangeSecond,
  formatTimeDifference,
  formatWeekRange
} from "../logic/functions"
import { getAllPerceptionsName } from "../services/perceptions"
import { getAllDeductionName } from "../services/deductions"
import { deletePayroll, deleteUserOfPayroll, updateStatePayroll } from "../services/payroll"

export function PrePayroll() {
  const navegar = useNavigate()
  const { PreNomina, Abierta } = statesPayroll
  const { Semanal, PrimeraQuin, SegundaQuin, Mensual } = paymentPeriods
  // Estados del componente
  const [isCreated, setIsCreated] = useState(false)
  const [departments, setDepartments] = useState([])
  const [perceptions, setPerceptions] = useState([])
  const [deductions, setDeductions] = useState([])
  const [payroll, setPayroll] = useState(false)
  const [employees, setEmployees] = useState([])
  const [buttonDepart, setButtonDepart] = useState(false)
  const [buttonPercep, setButtonPercep] = useState(false)
  const [buttonDeduc, setButtonDeduc] = useState(false)
  const [date, setDate] = useState("")
  const [employeeDelete, setEmployeeDelete] = useState(null)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalDeletePayroll, setModalDeletePayroll] = useState(false)
  // Estados del formulario
  const [title, setTitle] = useState("")
  const [paymentPeriod, setPaymentPeriod] = useState("0")
  const [arrayOfDepartments, setArrayOfDepartments] = useState([])
  const [arrayOfPerceps, setArrayOfPerceps] = useState([])
  const [arrayOfDeducs, setArrayOfDeducs] = useState([])
  const [dateRange, setDateRange] = useState('')
  // console.log(departments);

  const { id: companyID, currency } = JSON.parse(
    localStorage.getItem("company")
  )
  const token = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {
    fetch(`http://localhost:3000/department/all/${companyID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.departments) {
          // console.log("Success:", data.departments);
          setDepartments(data.departments)
        } else {
          console.log("Error:", data.error)
        }
      })
      .catch(error => {
        console.error("Error:", error)
      })

    const getPercep = async () => {
      const res = await getAllPerceptionsName(token)
      if (res?.perceptionsName) {
        setPerceptions(res.perceptionsName)
      }
    }
    getPercep()

    const getDeduc = async () => {
      const res = await getAllDeductionName(token)
      if (res?.deductionsName) {
        setDeductions(res.deductionsName)
      }
    }
    getDeduc()
  }, [])

  const confirmDelete = async () => {
    // Aqui va ir el codigo con la peticion para eliminar un empleado de esta pre-nomina
    const res = await deleteUserOfPayroll(token, payroll.id, employeeDelete)
    if (res.message) {
      // console.log(res.message)
      const indexItem = payroll.findIndex(item => item.id === employeeDelete)
      if (indexItem >= 0) {
        const newPayroll = [...payroll]
        newPayroll.splice(indexItem, 1)
        setEmployeeDelete(null)
        setPayroll(newPayroll)
      }
    } else {
      console.error(res)
    }
  }

  const confirmDeletePayroll = async () => {
    // Aqui va ir el codigo con la peticion para eliminar un empleado de esta pre-nomina
    const res = await deletePayroll(token, payroll.id, companyID)
    if (res.message) {
      setArrayOfDeducs([])
      setArrayOfPerceps([])
      setArrayOfDepartments([])
      setEmployees([])
      setIsCreated(false)
      setPayroll(null)
      setTitle('')
      setPaymentPeriod('0')
      setDate('')
      setDateRange('')
    } else {
      console.error(res)
    }
  }

  const confirmOpenPayroll = async () => {
    const res = await updateStatePayroll(token, payroll.id, companyID, {state: Abierta})
    if (res.message) {
      navegar(`/nomina/${payroll.id}`)
    } else {
      console.error(res)
    }
  }

  const handleCheckboxChange = event => {
    const { name, value: selectedId, checked } = event.target
    if (name === "department") {
      if (checked) {
        // Si el checkbox está marcado, agrega el departamento al estado
        setArrayOfDepartments(prevSelected => [...prevSelected, selectedId])
      } else {
        // Si el checkbox está desmarcado, elimina el departamento del estado
        setArrayOfDepartments(prevSelected =>
          prevSelected.filter(id => id !== selectedId)
        )
      }
    } else if (name === "perception") {
      if (checked) {
        // Si el checkbox está marcado, agrega la percepcion al estado
        setArrayOfPerceps(prevSelected => [...prevSelected, selectedId])
      } else {
        // Si el checkbox está desmarcado, elimina la percepcion del estado
        setArrayOfPerceps(prevSelected =>
          prevSelected.filter(id => id !== selectedId)
        )
      }
    } else if (name === "deduction") {
      if (checked) {
        // Si el checkbox está marcado, agrega la deduccion al estado
        setArrayOfDeducs(prevSelected => [...prevSelected, selectedId])
      } else {
        // Si el checkbox está desmarcado, elimina la deduccion del estado
        setArrayOfDeducs(prevSelected =>
          prevSelected.filter(id => id !== selectedId)
        )
      }
    }
  }

  const handleDateRange = (date, paymentPeriod) => {
    {date ?
      (paymentPeriod === Semanal
        ? setDateRange(formatWeekRange(date))
        : paymentPeriod === PrimeraQuin
        ? setDateRange(formatRangeFirst(date))
        : paymentPeriod === SegundaQuin
        ? setDateRange(formatRangeSecond(date))
        : setDateRange(formatMonth(date))
      ) : (
        setDateRange('')
      )
    }
  }

  // Aqui el codigo para generar la pre-nomina
  const handleSubmit = e => {
    e.preventDefault()

    let data = null

    if (!title)
      return console.error("Debes colocarle un titulo a la pre-nomina")
    if (paymentPeriod === "0")
      return console.error(
        "Debes seleccionar un periodo de pago de la pre-nomina"
      )
    if (!date)
      return console.error(
        "Debes seleccionar una fecha para el periodo de pago de la pre-nomina"
      )
    if (!dateRange)
      return console.error(
        "Error con el rango de fechas del periodo de pago de la pre-nomina"
      )
    if (arrayOfDepartments.length === 0)
      return console.error(
        "Debes seleccionar un departamento de empleados para traer a la pre-nomina"
      )

    data = {
      title,
      paymentPeriod: paymentPeriod,
      dateRange,
      arrayOfDepartments,
      arrayOfPerceps,
      arrayOfDeducs,
      state: PreNomina
    }

    // console.log(data)

    fetch(
      `http://localhost:3000/payroll/generate-payroll/${companyID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }
    )
      .then(response => response.json())
      .then(data => {
        // console.log("Success:", data)
        if (data.employees) {
          console.log("Success:", data)
          setPayroll(data.payroll)
          setEmployees(data.employees)
          setIsCreated(true)
        } else {
          setPayroll([])
          console.log("Error:", data.error)
        }
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  // Aqui el codigo para modificar los datos de la pre-nomina
  const handleSubmitEdit = e => {
    e.preventDefault()

    let data = null

    if (!title)
      return console.error("Debes colocarle un titulo a la pre-nomina")
    if (paymentPeriod === "0")
      return console.error(
        "Debes seleccionar un periodo de pago de la pre-nomina"
      )
    if (!date)
      return console.error(
        "Debes seleccionar una fecha para el periodo de pago de la pre-nomina"
      )
    if (!dateRange)
      return console.error(
        "Error con el rango de fechas del periodo de pago de la pre-nomina"
      )
    if (arrayOfDepartments.length === 0)
      return console.error(
        "Debes seleccionar un departamento de empleados para traer a la pre-nomina"
      )

    data = {
      title,
      paymentPeriod: paymentPeriod,
      dateRange,
      arrayOfDepartments,
      arrayOfPerceps,
      arrayOfDeducs
    }

    //Aqui debe ir el fetch para editar la informacion 
    console.log("Edita la info")
    // fetch(
    //   `http://localhost:3000/payroll/generate-payroll/${companyID}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`
    //     },
    //     body: JSON.stringify(data)
    //   }
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     // console.log("Success:", data)
    //     if (data.employees) {
    //       console.log("Success:", data)
    //       setPayroll(data.employees)
    //       setIsCreated(true)
    //     } else {
    //       setPayroll([])
    //       console.log("Error:", data.error)
    //     }
    //   })
    //   .catch(error => {
    //     console.error("Error:", error)
    //   })
  }

  const handlePeriod = e => {
    const value = e.target.value
    if (paymentPeriod === Semanal && value !== Semanal) {
      setDate("")
      handleDateRange('', value)
    } else if (paymentPeriod !== Semanal && value === Semanal) {
      setDate("")
      handleDateRange('', value)
    }
    setPaymentPeriod(value)
    handleDateRange(date, value)
  }

  // console.log('Periodo ' + paymentPeriod)
  // console.log('Fecha ' + date)
  // console.log('Departamentos ' + arrayOfDepartments)
  return (
    <div className="h-full">
      <main className="w-full p-10 flex flex-col gap-10">
        <section className="flex justify-between items-center w-full ">
          <form className="flex flex-col gap-10 w-full  ">
            <div className="flex justify-between gap-5">
              <h1 className="text-3xl">Pre-Nomina:</h1>
              <input
                type="text"
                name="title"
                autoFocus
                className="px-3 py-2 rounded-md border-b border-azulOscuro text-black placeholder:text-black outline-none w-2/4 font-semibold"
                placeholder="Nombre de la nomina"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <button
                className="bg-azulClaro px-10 py-2 rounded-md text-grisClaro outline-none"
                onClick={e => {
                  isCreated
                    ? handleSubmitEdit(e)
                    : handleSubmit(e)
                }}
              >
                {isCreated ? 'Modificar' : 'Generar'}
              </button>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="period"
                  className="font-semibold"
                >
                  Periodo de pago
                </label>
                <select
                  name="period"
                  id="period"
                  className="bg-azulClaro px-3 py-2 rounded-md text-grisClaro outline-none w-60"
                  value={paymentPeriod}
                  onChange={handlePeriod}
                >
                  <option
                    value="0"
                    disabled
                  >
                    -- Seleccione --
                  </option>
                  <option value={Semanal}>Semanal</option>
                  <option value={PrimeraQuin}>Primera quincena</option>
                  <option value={SegundaQuin}>Segunda quincena</option>
                  <option value={Mensual}>Mensual</option>
                </select>
              </div>
              {paymentPeriod !== "0" && (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="date"
                    className="font-semibold"
                  >
                    {paymentPeriod === "7" ? "Semana" : "Mes"}
                  </label>
                  <input
                    type={paymentPeriod === "7" ? "week" : "month"}
                    name="date"
                    id="date"
                    className="bg-azulClaro px-3 py-2 rounded-md text-grisClaro outline-none w-60"
                    value={date}
                    onChange={e => {
                      // console.log(e.target.value)
                      handleDateRange(e.target.value, paymentPeriod)
                      setDate(e.target.value)
                    }}
                  />
                </div>
              )}
              {paymentPeriod !== "0" && (
                <div
                  className={`${
                    date ? "opacity-100" : "opacity-0"
                  } flex flex-col gap-2`}
                >
                  <p className="font-semibold">Fecha</p>
                  <p className="bg-azulClaro px-3 py-2 rounded-md text-grisClaro w-60">
                    {date &&
                      (dateRange)
                    }
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-between items-start">
              <div className="relative flex flex-col gap-2">
                <label
                  htmlFor="department"
                  className="font-semibold"
                >
                  Departamentos
                </label>
                <button
                  className="flex items-center justify-between bg-azulClaro pl-5 pr-1 py-2 rounded-md text-grisClaro outline-none w-60"
                  id="department"
                  onClick={e => {
                    e.preventDefault()
                    setButtonDepart(!buttonDepart)
                  }}
                >
                  -- Seleccione --
                  <FaAngleDown className="text-sm" />
                </button>
                {buttonDepart && (
                  <div className="absolute z-10 top-full w-full bg-azulClaro text-grisClaro rounded-lg mt-[1px]">
                    {departments.map(department => (
                      <label
                        htmlFor={department.id}
                        key={department.id}
                        className="hover:bg-azulOscuro/20 cursor-pointer pl-5 pr-1 py-1 flex gap-2 first:rounded-t-lg last:rounded-b-lg"
                      >
                        <input
                          type="checkbox"
                          name="department"
                          id={department.id}
                          value={department.id}
                          onChange={handleCheckboxChange}
                          checked={arrayOfDepartments.includes(department.id)}
                        />
                        {department.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative flex flex-col gap-2">
                <label
                  htmlFor="perception"
                  className="font-semibold"
                >
                  Percepciones
                </label>
                <button
                  className="flex items-center justify-between bg-azulClaro pl-5 pr-1 py-2 rounded-md text-grisClaro outline-none w-60"
                  id="perception"
                  onClick={e => {
                    e.preventDefault()
                    setButtonPercep(!buttonPercep)
                  }}
                >
                  -- Seleccione --
                  <FaAngleDown className="text-sm" />
                </button>
                {buttonPercep && (
                  <div className="absolute z-10 top-full w-full bg-azulClaro text-grisClaro rounded-lg mt-[1px]">
                    {perceptions.map(perception => (
                      <label
                        htmlFor={perception.id}
                        key={perception.id}
                        className="hover:bg-azulOscuro/20 cursor-pointer pl-5 pr-1 py-1 flex gap-2 first:rounded-t-lg last:rounded-b-lg"
                      >
                        <input
                          type="checkbox"
                          name="perception"
                          id={perception.id}
                          value={perception.id}
                          onChange={handleCheckboxChange}
                          checked={arrayOfPerceps.includes(perception.id)}
                        />
                        {perception.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative flex flex-col gap-2">
                <label
                  htmlFor="deduction"
                  className="font-semibold"
                >
                  Deducciones
                </label>
                <button
                  className="flex items-center justify-between bg-azulClaro pl-5 pr-1 py-2 rounded-md text-grisClaro outline-none w-60"
                  id="deduction"
                  onClick={e => {
                    e.preventDefault()
                    setButtonDeduc(!buttonDeduc)
                  }}
                >
                  -- Seleccione --
                  <FaAngleDown className="text-sm" />
                </button>
                {buttonDeduc && (
                  <div className="absolute z-20 top-full w-full bg-azulClaro text-grisClaro rounded-lg mt-[1px]">
                    {deductions.map(deduction => (
                      <label
                        htmlFor={deduction.id}
                        key={deduction.id}
                        className="hover:bg-azulOscuro/20 cursor-pointer pl-5 pr-1 py-1 flex gap-2 first:rounded-t-lg last:rounded-b-lg"
                      >
                        <input
                          type="checkbox"
                          name="deduction"
                          id={deduction.id}
                          value={deduction.id}
                          onChange={handleCheckboxChange}
                          checked={arrayOfDeducs.includes(deduction.id)}
                        />
                        {deduction.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </form>
        </section>
        {employees?.length === 0 ? (
          <strong className="text-xl">
            No hay empleados para asignar a esta nomina
          </strong>
        ) : employees?.length > 0 ? (
          <>
            <table className="bg-grisClaro rounded-md shadow-right-dark px-4 border-separate border-spacing-0 border-spacing-y-4 w-full border-2 border-grisOscuro">
              <thead className="px-5">
                <tr>
                  <th className="p-4 text-lg text-start max-w-[8ch]">
                    Empleado
                  </th>
                  <th className="p-4 text-lg text-start max-w-[8ch]">Cedula</th>
                  <th className="p-4 text-lg text-start max-w-[8ch]">Cargo</th>
                  <th className="p-4 text-lg text-start max-w-[8ch]">
                    Condicion
                  </th>
                  <th className="p-4 text-lg text-start max-w-[8ch]">
                    Años de servicio
                  </th>
                  <th className="p-4 text-lg text-start max-w-[8ch]">
                    Salario Bruto
                  </th>
                  <th className="p-4 text-lg text-start max-w-[8ch]">
                    Salario Neto
                  </th>
                </tr>
              </thead>
              <tbody className="px-5 relative">
                {employees.map(employee => (
                  <tr
                    key={employee.id}
                    className="bg-grisOscuro hover:bg-blue-300"
                  >
                    <td className="p-4 text-lg rounded-l-2xl max-w-[20ch]">
                      {employee.name} {employee.lastName}
                    </td>
                    <td className="p-4 text-lg">{employee.identityCard}</td>
                    <td className="p-4 text-lg max-w-[20ch]">
                      {employee.charge}
                    </td>
                    <td className="p-4 text-lg">{employee.condition}</td>
                    <td className="p-4 text-lg">
                      {formatTimeDifference(employee.startDate)}
                    </td>
                    <td className="p-4 text-lg">
                      {employee.grossSalary} {currency}
                    </td>
                    <td className="p-4 text-lg">
                      {employee.netSalary} {currency}
                    </td>
                    <td className="relative p-4 text-lg rounded-r-2xl">
                      <input
                        type="checkbox"
                        name={`action${employee.id}`}
                        id={`action${employee.id}`}
                        className="hidden peer/action"
                      />
                      <label
                        htmlFor={`action${employee.id}`}
                        className="cursor-pointer"
                      >
                        <FaEllipsisV />
                      </label>
                      <div className="hidden absolute peer-checked/action:flex gap-4 right-14 top-1/2 transform -translate-y-1/2 bg-grisClaro shadow-right-dark p-5 rounded-lg z-10">
                        <Link
                          to={`/empleado/${employee.id}`}
                          className="text-white w-28 text-center rounded-md bg-azulClaro px-2 py-1 font-semibold"
                        >
                          Ver
                        </Link>
                        <button
                          className="text-white w-28 rounded-md bg-red-600 px-2 py-1 font-semibold"
                          onClick={() => {
                            setEmployeeDelete(employee.id)
                            setModalDelete(true)
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <section className="flex justify-between w-full px-5">
              <p className="bg-azulClaro px-5 py-3 rounded-md text-grisClaro font-semibold">
                Total de empleados: {employees.length}
              </p>
              <div className="flex gap-4">
                <button
                  className="bg-azulClaro px-5 py-3 m-auto rounded-md placeholder-grisClaro text-grisClaro outline-none font-semibold"
                  onClick={() => {setModalDeletePayroll(true)}}
                >
                  Cancelar Pre-Nomina
                </button>
                <button
                  className="bg-azulClaro px-5 py-3 m-auto rounded-md placeholder-grisClaro text-grisClaro outline-none font-semibold"
                  onClick={() => confirmOpenPayroll()}
                >
                  Abrir Nomina
                </button>
              </div>
            </section>
          </>
        ) : (
          <strong className="text-xl">No se ha seleccionado una nomina</strong>
        )}
        {modalDelete && (
          <ModalDelete
            peticion={confirmDelete}
            setStateModal={setModalDelete}
          />
        )}
        {modalDeletePayroll && (
          <ModalDelete
            peticion={confirmDeletePayroll}
            setStateModal={setModalDeletePayroll}
          />
        )}
      </main>
    </div>
  )
}
