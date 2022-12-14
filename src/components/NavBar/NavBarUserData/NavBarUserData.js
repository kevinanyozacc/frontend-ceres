import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCredentials, setAccountPopupActive } from '../../../redux/ducks/auth'
import { ADMIN_ROLE, useLogoutMutation } from '../../../redux/services/auth'
import AccountPopup from '../AccountPopup'
import './NavBarUserData.css'

const NavBarUserData = ({ name, role }) => {

  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { accountPopupActive } = useSelector(state => state.auth)

  const closeSession = async () => {
    await logout()
    dispatch(clearCredentials())
    navigate('/')
  }

  const isAdmin = role === ADMIN_ROLE

  return (
    <div
      className="NavBarUserData"
      onClick={() => isAdmin && dispatch(setAccountPopupActive(!accountPopupActive))}
    >
      <AccountPopup closeSession={closeSession} />
      <div className="NavBarUserData__name">{name.toLowerCase()}</div>
      <div className="NavBarUserData__role">
        <Icon className="NavBarUserData__role_icon" icon="mdi-key" /> {role}
      </div>
      {!isAdmin && <div className="NavBarUserData__logout" onClick={closeSession}>Cerrar sesión</div>}
      <Icon className="NavBarUserData__icon" icon="mdi-account" style={{ gridRow: `span ${isAdmin ? 2 : 3}` }} />
    </div>
  )
}

export default NavBarUserData