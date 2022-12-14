import { useEffect, useRef, useState } from 'react'
import './Permissions.css'
import PermissionsSearchResult from './PermissionsSearchResult'

const Permissions = () => {

  const inputRef = useRef()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [searchTerm, setSearchTerm] = useState()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const searchUser = e => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const cancel = () => setFormSubmitted(false)

  return (
    <div className="Permissions">
      <h2 className="Permissions__title">Otorgar permiso de administrador</h2>
      {formSubmitted
        ? <PermissionsSearchResult searchTerm={searchTerm} cancel={cancel} />
        : <>
            <p>Ingrese nombre de usuario de SENASA para otorgarle permiso de administración en la plataforma</p>
            <form
              className="Permissions__form"
              onSubmit={searchUser}
            >
              <input
                type="text"
                ref={inputRef}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button>
                Buscar usuario
              </button>
            </form>
          </>
      }
    </div>
  )
}

export default Permissions