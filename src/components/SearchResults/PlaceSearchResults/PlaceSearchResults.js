import PlaceSearchResultsMap from './PlaceSearchResultsMap'
import PlaceSearchResultsList from './PlaceSearchResultsList'
import PlaceSearchResultsFilters from './PlaceSearchResultsFilters'
import './PlaceSearchResults.css'

const PlaceSearchResults = () => {

  return (
    <div className="PlaceSearchResults">
      <PlaceSearchResultsMap />
      <PlaceSearchResultsList />
      <PlaceSearchResultsFilters />
    </div>
  )
}

export default PlaceSearchResults