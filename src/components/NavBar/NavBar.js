import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import logoSenasa from '../../assets/images/logo-senasa-peru.png'	
import { useWhoamiQuery } from '../../redux/services/auth'
import { useDispatch, useSelector } from 'react-redux'
import './NavBar.css'
import { useEffect } from 'react'
import NavBarUserData from './NavBarUserData'
import { showDrawer } from '../../redux/ducks/drawer'
import { clearCredentials } from '../../redux/ducks/auth'

const NavBar = () => {

  const { token } = useSelector(state => state.auth)
  const { data: userData, isLoading, refetch, isError } = useWhoamiQuery()
  const dispatch = useDispatch()

  if (isError) {
    // dispatch(clearCredentials())
  }

  useEffect(() => refetch(), [token, refetch])

  return (
    <div className="NavBar">
      <div className="NavBar__extra">
        <div className="NavBar__container">
          <div className="NabBar__secondary_main_message">
            Esta plataforma forma parte del proyecto BID-SENASA 2021
          </div>
          <nav className="NavBar__secondary_links_container">
            <Link to="/">Acerca De</Link>
            {/* <Link to="/">Mapa de la plataforma</Link> */}
            <a rel="noreferrer noopener" target="_blank" href="http://192.168.0.34/docs">Documentación de API</a>
          </nav>
        </div>
      </div>
      <nav className="NavBar__container">
        <button
          className="NavBar__menu_button"
          title="Menú desplegable"
          onClick={() => dispatch(showDrawer())}
        >
          <Icon icon="mdi:menu" />
        </button>
        <Link to='/' className="NavBar__logo_container">
          <img
            src={logoSenasa}
            alt="Logo Senasa"
            className="NavBar__logo"
          />
          <h1 className="NavBar__title">Plataforma de Trazabilidad Agropecuaria</h1>
        </Link>
        <div className="NavBar__links">
          {isLoading
            ? <div className="NavBar__loading_user" />
            : userData && !isError
              ? <NavBarUserData name={userData.name} role={userData.role} />
              : <Link
                  to='/acceso'
                  className="NavBar__link NavBar__link--inverted"
                  title="Iniciar sesión"
                >
                  <Icon icon="mdi:login-variant" className="NavBar__link_icon" /> Iniciar sesión
                </Link>
          }
        </div>
      </nav>
    </div>
  )
}

export default NavBar