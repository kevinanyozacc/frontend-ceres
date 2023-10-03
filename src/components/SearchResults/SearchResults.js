/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import tabs from "../../data/tabs.json";
import {
  searchMethods,
  setSearchTerm,
  setSearchType,
} from "../../redux/ducks/search";
import CenteredContainer from "../CenteredContainer";
import FarmSearchResults from "./FarmSearchResults";
import PlaceSearchResults from "./PlaceSearchResults/PlaceSearchResults";
import "./SearchResults.css";
import SearchResultsBar from "./SearchResultsBar";

const SearchResults = ({ parent, name, children }) => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { searchFocused } = useSelector((state) => state.search);

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

  useEffect(() => {
    if (currentBody) {
      dispatch(setSearchType(currentParent.type));
    }
  }, [currentBody]);

  return (
    <>
      <CenteredContainer className="SearchResults__container">
        <div
          className={classNames({
            SearchResults__overlay: true,
            "SearchResults__overlay--active": searchFocused,
          })}
        />
        <div className="SearchResults">
          <SearchResultsBar />
          {children || null}

          {currentBody &&
          tabs["production:establishment"]?.key === currentBody?.key ? (
            <PlaceSearchResults />
          ) : null}
          {currentBody &&
          tabs["production:vegetal"]?.key === currentBody?.key ? (
            <PlaceSearchResults />
          ) : null}
          {currentBody &&
          tabs["production:predio"]?.key === currentBody?.key ? (
            <FarmSearchResults />
          ) : null}
          {/* process */}
          {currentBody &&
          tabs["process:establishment"]?.key === currentBody?.key ? (
            <PlaceSearchResults />
          ) : null}
          {currentBody && tabs["process:vegetal"]?.key === currentBody?.key ? (
            <PlaceSearchResults />
          ) : null}
          {currentBody && tabs["process:predio"]?.key === currentBody?.key ? (
            <FarmSearchResults />
          ) : null}
        </div>
      </CenteredContainer>
    </>
  );
};

export default SearchResults;
