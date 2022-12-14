import { Icon } from '@iconify/react'
import { useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { setSearchTerm, setSearchFocused, clearPlaceFilter } from '../../../redux/ducks/search'
import './SearchResultsBar.css'

const SearchResultsBar = () => {

  const navigate = useNavigate()
  const { searchTerm } = useSelector(state => state.search)
  const { register, handleSubmit } = useForm()
  const searchInputRef = useRef()
  const { ref, ...rest } = register('searchTerm')
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const onSubmit = data => {
    dispatch(setSearchTerm(data.searchTerm))
    dispatch(setSearchFocused(false))
    dispatch(clearPlaceFilter())
    navigate(`${pathname}?q=${searchInputRef.current.value}`)
    searchInputRef.current.blur()
  }

  useEffect(() => {
    searchInputRef.current.value = searchTerm
  }, [searchTerm])

  return (
    <div className="SearchResultsBar">
      <h2 className="SearchResultsBar__title">Búsqueda</h2>
      <div className="SearchResultsBar__input_container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            className="SearchResultsBar__input_icon_container"
            type="submit"
            title="Buscar"
          >
            <Icon icon="mdi:search" className="SearchResultsBar__input_icon" />
          </button>
          <input
            {...rest}
            className="SearchResultsBar__input"
            defaultValue={searchTerm}
            onFocusCapture={() => dispatch(setSearchFocused(true))}
            onBlur={() => dispatch(setSearchFocused(false))}
            ref={e => {
              ref(e)
              searchInputRef.current = e
            }}
          />
        </form>
      </div>
    </div>
  )
}

export default SearchResultsBar