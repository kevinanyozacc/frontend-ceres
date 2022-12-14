import { Icon } from '@iconify/react'
import { NavLink, Route, Routes } from 'react-router-dom'
import CenteredContainer from '../CenteredContainer'
import './UsersManagement.css'
import ValidateUser from './ValidateUser'
import Permissions from './Permissions'

const UsersManagement = () => {
  return (
    <CenteredContainer className="UsersManagement__container">
      <div className="UsersManagement">
        <div className="UsersManagement__menu">
          <h2 className="UsersManagement__menu_title">Administración de usuarios</h2>
          <ul>
            <li>
              <NavLink
                to=""
                className={({ isActive }) => isActive
                  ? "UsersManagement__menu_link UsersManagement__menu_link--active"
                  : "UsersManagement__menu_link"
                }
                end
              >
                <Icon icon="mdi:cog" /> General
              </NavLink>
            </li>
            <li>
              <NavLink
                to="validar"
                className={({ isActive }) => isActive
                  ? "UsersManagement__menu_link UsersManagement__menu_link--active"
                  : "UsersManagement__menu_link"
                }
                end
              >
                <Icon icon="mdi:user-add" /> Validación de usuarios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="gestionar"
                className={({ isActive }) => isActive
                  ? "UsersManagement__menu_link UsersManagement__menu_link--active"
                  : "UsersManagement__menu_link"
                }
                end
              >
                <Icon icon="mdi:shield-check" /> Otorgar permiso de administrador
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="UsersManagement__content">
          <Routes>
            <Route path='/validar' element={<ValidateUser />} />
            <Route path='/gestionar' element={<Permissions />} />
            <Route path='/' element={<p>Selecciona opción</p>} />
          </Routes>
        </div>
      </div>
    </CenteredContainer>
  )
}

export default UsersManagement