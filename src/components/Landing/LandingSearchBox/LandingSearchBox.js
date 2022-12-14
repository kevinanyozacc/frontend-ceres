import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router'
import useFocusInput from '../../../hooks/useFocusInput'
import { useEffect } from 'react'
import classNames from 'classnames'
import './LandingSearchBox.css'
import { useDispatch, useSelector } from 'react-redux'
import { searchMethods, setSearchMethod, setSearchTerm } from '../../../redux/ducks/search'

const LandingSearchBox = () => {

  const navigate = useNavigate()
  const inputSearchRef = useFocusInput()
  const { searchTerm, searchMethod } = useSelector(state => state.search)
  const dispatch = useDispatch()

  const search = e => {
    e.preventDefault()
    if (searchTerm) {
      switch (searchMethod.key) {
        case 'animal':
          navigate(`/busqueda/animal?q=${searchTerm}`)
          break
        case 'farm':
          navigate(`/busqueda/predio?q=${searchTerm}`)
          break
        default:
          navigate(`/busqueda/lugar?q=${searchTerm}`)
      }
    }
    else {
      inputSearchRef.current.focus()
    }
  }

  useEffect(() => {
    inputSearchRef.current.focus()
  }, [searchMethod, inputSearchRef])

  return (
    <div className="LandingSearchBox">
      <div className="LandingSearchBox__search_form_container">
        <label
          htmlFor="LandingSearchBox__search_input_id"
          className="LandingSearchBox__title"
        >
          Trazabilidad a tu alcance
        </label>
        <div className="LandingSearchBox__search_options_container">
          <div className="LandingSearchBox__tabs_container">
            {searchMethods.map(method => (
              <button
                key={`tab-${method.key}`}
                className={classNames({
                  "LandingSearchBox__search_option_tab": true,
                  "LandingSearchBox__search_option_tab--selected": searchMethod.key === method.key
                })}
                onClick={() => dispatch(setSearchMethod(method))}
              >
                <Icon icon={method.icon} />
                {method.label}
              </button>
            ))}
          </div>
          <form
            onSubmit={search}
            className="LandingSearchBox__search_form"
          >
            <div className="LandingSearchBox__search_inputs_container">
              <input
                id="LandingSearchBox__search_input_id"
                className="LandingSearchBox__search_input"
                type="text"
                placeholder={searchMethod.hint}
                ref={inputSearchRef}
                value={searchTerm}
                onChange={e => dispatch(setSearchTerm(e.target.value))}
              />
              <button
                className="LandingSearchBox__search_button"
              >
                <Icon icon="mdi:search" className="LandingSearchBox__search_icon" /> Buscar
              </button>
            </div>
            <label
              htmlFor="LandingSearchBox__search_input_id"
              className="LandingSearchBox__extra_text"
            >
              {searchMethod.description}
            </label>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LandingSearchBox