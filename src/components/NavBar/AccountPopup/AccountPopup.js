import classNames from 'classnames'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAccountPopupActive } from '../../../redux/ducks/auth'
import './AccountPopup.css'

const AccountPopup = ({ closeSession }) => {

  const { accountPopupActive } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div
      className={classNames({
        "AccountPopup": true,
        "AccountPopup--visible": accountPopupActive,
      })}
      onClick={e => e.stopPropagation()}
    >
      <button
        className="AccountPopup__boton_menu"
        onClick={() => {
          dispatch(setAccountPopupActive(false))
          navigate('/usuarios')
        }}
      >
        <Icon icon="mdi-account" />
        Administrar usuarios
      </button>
      <button
        className="AccountPopup__boton_menu"
        onClick={() => {
          dispatch(setAccountPopupActive(false))
          closeSession()
        }}
      >
        <Icon icon="mdi-logout" />
        Cerrar sesión
      </button>
    </div>
  )
}

export default AccountPopup