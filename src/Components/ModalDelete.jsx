function ModalDelete({ peticion, setStateModal, id }) {
  const token = JSON.parse(localStorage.getItem("token"))
  const companyID = JSON.parse(localStorage.getItem("company")).id

  // Debe modificarse para que funcione mejor y se adapte a cualquier peticion
  const handleDelete = async () => {
    const res = await peticion(token, companyID, id)
    if (res.message) {
      // console.log(res.message);
      setStateModal(false)
    } else {
      console.error('hubo un error')
    }
  }

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/50 flex justify-center items-center z-30">
      <section className="flex flex-col gap-10 shadow-right-dark rounded-lg bg-grisClaro text-black py-10 px-20">
        <strong className="text-xl text-center">¿Seguro que deseas eliminarlo?</strong>
        <div className="flex justify-center items-center gap-10">
          <button
            className="px-3 py-2 m-auto rounded-md bg-azulClaro text-grisClaro font-bold"
            onClick={() => {
              setStateModal(false)
            }}
          >
            Cancelar
          </button>
          <button
            className="px-3 py-2 m-auto rounded-md bg-red-600 text-grisClaro font-bold"
            onClick={() => {
              handleDelete()
            }}
          >
            Eliminar
          </button>
        </div>
      </section>
    </div>
  )
}

export default ModalDelete
