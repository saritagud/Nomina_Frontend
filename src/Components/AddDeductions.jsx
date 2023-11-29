import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { createDeductionName, getAllDeductionName } from "../services/deductions";

export function AddDeductions({ dataEdit = null, setStateModal, confirm }) {
  const token = JSON.parse(localStorage.getItem("token"))
  const [nameCreated, setNameCreated] = useState(null)
  const [selectedOther, setSelectedOther] = useState(false)
  const [deductionName, setDeductionName] = useState('')
  const [deductionsNames, setDeductionsNames] = useState([])
  const [deductionSelected, setDeductionSelected] = useState('0')
  const [deductionData, setDeductionData] = useState({
    percentage: '',
    application: '0',
    state: '0'
  })

  useEffect(() => {
    const getDeduc = async () => {
      const res = await getAllDeductionName(token)
      if (res?.deductionsName) {
        setDeductionsNames(res.deductionsName)
      }
    }
    getDeduc()
    if (dataEdit) {
      setDeductionData({
        percentage: dataEdit.percentage.toString(),
        application: dataEdit.application,
        state: dataEdit.state,
      })
      setDeductionSelected(dataEdit.deductionName.id)
    }
  }, [])
  
  
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'deduction') {
      setDeductionSelected(value)
      if (value === 'other') {
        setSelectedOther(true)
      } else if (selectedOther === true) {
        setSelectedOther(false)
        setDeductionName('')
        setNameCreated(null)
      }
    } else {
      setDeductionData({
        ...deductionData,
        [name]: value
      })
    }
  }

  const handleCreateName = async e => {
    e.preventDefault()
    const res = await createDeductionName(token, {name: deductionName})
    if (res?.name) {
      // console.log('Success: ', res.name);
      setNameCreated(res)
    } else {
      console.error(res)
    }
  }

  const handleSubmit = async () => {
    let data = {}

    if (deductionSelected === '0') return console.error('Debes seleccionar el tipo de deduccion')
    if (deductionSelected === 'other') {
      if (deductionName === '') return console.error('Debes ingresar el nombre de la deduccion')
    }
    if (deductionData.percentage === '') return console.error('Debes ingresar el Monto de la deduccion')
    if (deductionData.application === '0') return console.error('Debes seleccionar la Aplicacion de la deduccion')
    if (deductionData.state === '0') return console.error('Debes seleccionar el Estado de la deduccion')

    if (dataEdit) {
      if (deductionData.percentage !== dataEdit.percentage)
        data = {
          ...data,
          percentage: parseFloat(deductionData.percentage),
        };
      if (deductionData.application !== dataEdit.application)
        data = {
          ...data,
          application: deductionData.application,
        };
      if (deductionData.state !== dataEdit.state)
        data = {
          ...data,
          state: deductionData.state,
        };

      confirm(data, dataEdit.id)
    } else {
      data = {
        ...deductionData,
        percentage: parseFloat(deductionData.percentage),
      };
      // console.log(data);
      if (nameCreated?.id) {
        confirm(data, nameCreated.id)
      } else {
        confirm(data, deductionSelected)
      }
    }
  }
  return (
    
    <section className="fixed top-0 left-0 bottom-0 right-0 bg-grisClaro flex flex-col items-center justify-center z-20 min-h-screen gap-10">
      <h1 className="text-4xl font-bold">
        {dataEdit ? 'Editar datos de la deduccion' : 'Agrega una deduccion'}
      </h1>
      <BiArrowBack
        className="absolute top-2 left-3 z-10 text-3xl cursor-pointer"
        onClick={() => setStateModal(false)}
      />
      <form
        className="flex flex-col gap-10"
        onSubmit={handleSubmit}
      >
        <section className="flex gap-10">
          <div className="flex flex-col gap-1">
            <label htmlFor="deduction" className="text-xl">
              Deduccion
            </label>
            <select
              name="deduction"
              id="deduction"
              className="bg-azulClaro px-3 py-2 rounded-md text-grisClaro outline-none w-80"
              value={deductionSelected}
              onChange={handleChange}
              disabled={!!dataEdit}
            >
              <option value="0" disabled>
                -- Elegir deduccion --
              </option>
              {deductionsNames.map((deduction) => (
                <option key={deduction.id} value={deduction.id}>
                  {deduction.name}
                </option>
              ))}
              <option value="other">
                Otro
              </option>
            </select>
          </div>
          {selectedOther && (
            <>
              <div className="flex flex-col gap-1">
                <label htmlFor="deductionName" className="text-xl">
                  Nombre
                </label>
                <input
                  type="text"
                  name="deductionName"
                  id="deductionName"
                  autoFocus
                  className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
                  placeholder="Ingresa el nombre"
                  value={deductionName}
                  onChange={e => setDeductionName(e.target.value)}
                />
              </div>
              <button 
                className="bg-azulOscuro mx-auto mt-auto px-3 py-2 font-bold text-grisClaro outline-none rounded-md"
                onClick={handleCreateName}>
                Crear nombre
              </button>
            </>
          )}
        </section>
        <div className="flex gap-10">
          <div className="flex flex-col gap-1">
            <label htmlFor="percentage" className="text-xl">
              Porcentaje{" "}
              <span className="text-sm">
                {'(Para centimos usar punto ".")'}
              </span>
            </label>
            <input
              type="text"
              name="percentage"
              id="percentage"
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={deductionData.percentage}
              placeholder="Ingresa un porcentaje ( 5.5 )"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="application" className="text-xl">
              Aplicacion
            </label>
            <select
              name="application"
              id="application"
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={deductionData.application}
              onChange={handleChange}
            >
              <option value="0" disabled>
                -- Seleccionar --
              </option>
              <option value="Aplica">Aplica</option>
              <option value="No Aplica">No Aplica</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="state" className="text-xl">
              Estado
            </label>
            <select
              name="state"
              id="state"
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={deductionData.state}
              onChange={handleChange}
            >
              <option value="0" disabled>
                -- Seleccionar --
              </option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>
      </form>
      <button 
        className="bg-azulOscuro mx-auto mt-5 px-3 py-2 font-bold text-grisClaro outline-none rounded-md"
        onClick={() => handleSubmit()}>
        {dataEdit ? 'Guardar Cambios' : 'Agregar Deduccion'}
      </button>
    </section>
  )
}
