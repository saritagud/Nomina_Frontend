import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { createPerceptionName, getAllPerceptionsName } from "../services/perceptions";

export function AddPerceptions({ dataEdit = null, setStateModal, confirm }) {
  const token = JSON.parse(localStorage.getItem("token"))
  const [nameCreated, setNameCreated] = useState(null)
  const [selectedOther, setSelectedOther] = useState(false)
  const [perceptionName, setPerceptionName] = useState('')
  const [perceptionsNames, setPerceptionsNames] = useState([])
  const [perceptionSelected, setPerceptionSelected] = useState('0')
  const [perceptionData, setPerceptionData] = useState({
    amount: '',
    application: '0',
    state: '0'
  })

  useEffect(() => {
    const getPercep = async () => {
      const res = await getAllPerceptionsName(token)
      if (res?.perceptionsName) {
        setPerceptionsNames(res.perceptionsName)
      }
    }
    getPercep()
    if (dataEdit) {
      setPerceptionData({
        amount: dataEdit.amount.toString(),
        application: dataEdit.application,
        state: dataEdit.state,
      })
      setPerceptionSelected(dataEdit.perceptionName.id)
    }
  }, [])
  
  
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'perception') {
      setPerceptionSelected(value)
      if (value === 'other') {
        setSelectedOther(true)
      } else if (selectedOther === true) {
        setSelectedOther(false)
        setPerceptionName('')
        setNameCreated(null)
      }
    } else {
      setPerceptionData({
        ...perceptionData,
        [name]: value
      })
    }
  }

  const handleCreateName = async e => {
    e.preventDefault()
    const res = await createPerceptionName(token, {name: perceptionName})
    if (res?.name) {
      // console.log('Success: ', res.name);
      setNameCreated(res)
    } else {
      console.error(res)
    }
  }

  const handleSubmit = async () => {
    let data = {}

    if (perceptionSelected === '0') return console.error('Debes seleccionar el tipo de percepcion')
    if (perceptionSelected === 'other') {
      if (perceptionName === '') return console.error('Debes ingresar el nombre de la percepcion')
    }
    if (perceptionData.amount === '') return console.error('Debes ingresar el Monto de la percepcion')
    if (perceptionData.application === '0') return console.error('Debes seleccionar la Aplicacion de la percepcion')
    if (perceptionData.state === '0') return console.error('Debes seleccionar el Estado de la percepcion')

    if (dataEdit) {
      if (perceptionData.amount !== dataEdit.amount)
        data = {
          ...data,
          amount: parseFloat(perceptionData.amount),
        };
      if (perceptionData.application !== dataEdit.application)
        data = {
          ...data,
          application: perceptionData.application,
        };
      if (perceptionData.state !== dataEdit.state)
        data = {
          ...data,
          state: perceptionData.state,
        };

      confirm(data, dataEdit.id)
    } else {
      data = {
        ...perceptionData,
        amount: parseFloat(perceptionData.amount),
      };
      console.log(data);
      if (nameCreated?.id) {
        confirm(data, nameCreated.id)
      } else {
        confirm(data, perceptionSelected)
      }
    }
  }
  return (
    
    <section className="fixed top-0 left-0 bottom-0 right-0 bg-grisClaro flex flex-col items-center justify-center z-20 min-h-screen gap-10">
      <h1 className="text-4xl font-bold">
        {dataEdit ? 'Editar datos de la Percepción' : 'Agrega una Percepción'}
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
            <label htmlFor="perception" className="text-xl">
              Percepcion
            </label>
            <select
              name="perception"
              id="perception"
              className="bg-azulClaro px-3 py-2 rounded-md text-grisClaro outline-none w-80"
              value={perceptionSelected}
              onChange={handleChange}
              disabled={!!dataEdit}
            >
              <option value="0" disabled>
                -- Elegir percepcion --
              </option>
              {perceptionsNames.map((perception) => (
                <option key={perception.id} value={perception.id}>
                  {perception.name}
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
                <label htmlFor="perceptionName" className="text-xl">
                  Nombre
                </label>
                <input
                  type="text"
                  name="perceptionName"
                  id="perceptionName"
                  autoFocus
                  className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
                  placeholder="Ingresa el nombre"
                  value={perceptionName}
                  onChange={e => setPerceptionName(e.target.value)}
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
            <label htmlFor="amount" className="text-xl">
              Monto{" "}
              <span className="text-sm">
                {'(Para centimos usar punto ".")'}
              </span>
            </label>
            <input
              type="text"
              name="amount"
              id="amount"
              className="bg-azulClaro px-3 py-2 rounded-md placeholder-grisClaro text-grisClaro outline-none w-80"
              value={perceptionData.amount}
              placeholder="Ingresa un monto ( 100.50 )"
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
              value={perceptionData.application}
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
              value={perceptionData.state}
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
        {dataEdit ? 'Guardar Cambios' : 'Agregar Percepcion'}
      </button>
    </section>
  )
}
