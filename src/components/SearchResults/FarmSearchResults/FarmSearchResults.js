import FarmSearchResultsMap from './FarmSearchResultsMap'
import FarmSearchResultsList from './FarmSearchResultsList'
import FarmSearchResultsFilters from './FarmSearchResultsFilters'
import './FarmSearchResults.css'

const FarmSearchResults = () => {

  return (
    <div className="FarmSearchResults">
      <FarmSearchResultsMap />
      <FarmSearchResultsList />
      <FarmSearchResultsFilters />
    </div>
  )
}

export default FarmSearchResults