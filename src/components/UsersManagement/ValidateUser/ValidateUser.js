import './ValidateUser.css'

const ValidateUser = () => {
  return (
    <div className="ValidateUser">
      <h2 className="ValidateUser__title">Validación de usuarios</h2>
      <p>Esta es la lista de solicitudes de registro en espera de validación</p>
      <div className="ValidateUser__table">
        <div className="ValidateUser__row">
          <div>Usuario 1 </div>
          <div>email1@gmail.com</div>
          <button>Validar registro</button>
        </div>
        <div className="ValidateUser__row">
          <div>Usuario 2 </div>
          <div>email2@gmail.com</div>
          <button>Validar registro</button>
        </div>
        <div className="ValidateUser__row">
          <div>Usuario 3 </div>
          <div>email3@gmail.com</div>
          <button>Validar registro</button>
        </div>
      </div>
    </div>
  )
}

export default ValidateUser