import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  searchMethods,
  setSearchTerm,
  tabMethods,
} from "../../redux/ducks/search";
import CenteredContainer from "../CenteredContainer";
import AnimalSearchResults from "./AnimalSearchResults";
import FarmSearchResults from "./FarmSearchResults";
import PlaceSearchResults from "./PlaceSearchResults";
import "./SearchResults.css";
import SearchResultsBar from "./SearchResultsBar";

const SearchResults = ({ parent, name }) => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { searchFocused, searchTerm } = useSelector((state) => state.search);

  const currentParent = useMemo(() => {
    return searchMethods[parent] || undefined;
  }, [parent]);

  const currentBody = useMemo(() => {
    if (!currentParent) return undefined;
    return currentParent?.data?.find((value) => value.key === name);
  }, [currentParent, name]);

  useEffect(() => {
    dispatch(setSearchTerm(new URLSearchParams(search).get("q")));
  }, [dispatch, search]);

  if (!currentParent) return null;

  if (!currentBody) return null;

  if (!searchTerm) return null;

  return (
    <CenteredContainer className="SearchResults__container">
      <div
        className={classNames({
          SearchResults__overlay: true,
          "SearchResults__overlay--active": searchFocused,
        })}
      />
      <div className="SearchResults">
        <SearchResultsBar />
        {tabMethods.vegetal.key === currentBody?.key ? (
          <PlaceSearchResults />
        ) : null}
        {tabMethods.animal.key === currentBody?.key ? (
          <AnimalSearchResults />
        ) : null}
        {tabMethods.predio.key === currentBody?.key ? (
          <FarmSearchResults />
        ) : null}
      </div>
    </CenteredContainer>
  );
};

export default SearchResults;
