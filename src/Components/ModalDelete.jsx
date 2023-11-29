function ModalDelete({ peticion, setStateModal, fetchCompanies }) {
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
              peticion()
              fetchCompanies()
              setStateModal(false)
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
