import { InlineIcon } from '@iconify/react'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { hideDrawer } from '../../redux/ducks/drawer'
import { useWhoamiQuery } from '../../redux/services/auth'
import Loader from '../Loader'
import './Drawer.css'

const Drawer = () => {

  const { visible } = useSelector(state => state.drawer)
  const { data: userData, isLoading } = useWhoamiQuery()
  const dispatch = useDispatch()

  return (
    <>
      {visible &&
        <div
          className={classNames({
            "Drawer__sheet": true,
            "Drawer__sheet--visible": visible
          })}
          onClick={() => dispatch(hideDrawer())}
        />
      }
      <div
        className={classNames({
          "Drawer": true,
          "Drawer--visible": visible
        })}
      >
        <div>
          <button
            className="Drawer__close_button"
            onClick={() => dispatch(hideDrawer())}
          >
            <InlineIcon icon="mdi:close" />
          </button>
        </div>
        <ul className="Drawer__list">
          {isLoading
            ? <Loader />
            : !userData &&
              <li>
                <Link
                  to='/acceso' 
                  className="Drawer__link"
                  onClick={() => dispatch(hideDrawer())}
                >
                  <InlineIcon className="Drawer__link_icon" icon="mdi:login" /> Iniciar sesión
                </Link>
              </li>
          }
          <li>
            <Link
              to='/leer-codigo'
              className="Drawer__link"
              onClick={() => dispatch(hideDrawer())}
            >
              <InlineIcon className="Drawer__link_icon" icon="mdi:barcode-scan" />Leer código de arete
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Drawer