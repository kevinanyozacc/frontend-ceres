import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './SearchResults.css'
import { setSearchTerm } from '../../redux/ducks/search'
import { Route, Routes, useLocation } from 'react-router-dom'
import PlaceSearchResults from './PlaceSearchResults'
import classNames from 'classnames'
import CenteredContainer from '../CenteredContainer'
import SearchResultsBar from './SearchResultsBar'
import AnimalSearchResults from './AnimalSearchResults'
import FarmSearchResults from './FarmSearchResults'

const SearchResults = () => {

  const dispatch = useDispatch()
  const { search } = useLocation()
  const { searchFocused, searchTerm } = useSelector(state => state.search)

  useEffect(() => {
    dispatch(setSearchTerm(new URLSearchParams(search).get('q')))
  }, [dispatch, search])

  if (!searchTerm) {
    return null
  }

  return (
    <CenteredContainer className="SearchResults__container">
      <div className={classNames({
        "SearchResults__overlay": true,
        "SearchResults__overlay--active": searchFocused,
      })}
    />
      <div className="SearchResults">
        <SearchResultsBar />
        <Routes>
          <Route path="lugar" element={<PlaceSearchResults />} />
          <Route path="animal" element={<AnimalSearchResults />} />
          <Route path="predio" element={<FarmSearchResults />} />
        </Routes>
      </div>
    </CenteredContainer>
  )
}

export default SearchResults