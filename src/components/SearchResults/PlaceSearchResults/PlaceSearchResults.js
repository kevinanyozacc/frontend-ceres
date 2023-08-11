import "./PlaceSearchResults.css";
import PlaceSearchResultsFilters from "./PlaceSearchResultsFilters";
import PlaceSearchResultsList from "./PlaceSearchResultsList";
import PlaceSearchResultsMap from "./PlaceSearchResultsMap";

const PlaceSearchResults = () => {
  return (
    <div className="PlaceSearchResults">
      <PlaceSearchResultsMap />
      <PlaceSearchResultsList />
      <PlaceSearchResultsFilters />
    </div>
  );
};

export default PlaceSearchResults;
