/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useFocusInput from "../../../hooks/useFocusInput";
import {
  searchMethods,
  setSearchMethod,
  setSearchTerm,
} from "../../../redux/ducks/search";
import "./SearcherBox.css";

const SearcherBox = ({ title, name }) => {
  const navigate = useNavigate();
  const inputSearchRef = useFocusInput();
  const { searchTerm, searchMethod } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const options = useMemo(() => {
    return searchMethods[name]?.data || [];
  }, [name]);

  const search = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/${name}/${searchMethod.key}?q=${searchTerm}`);
    } else {
      inputSearchRef.current.focus();
    }
  };

  const defaultTab = () => {
    if (!options?.length || !options[0]) return;
    dispatch(setSearchMethod(options[0]));
  };

  useEffect(() => {
    dispatch(setSearchMethod(""));
  }, []);

  useEffect(() => {
    inputSearchRef.current?.focus();
  }, [searchMethod, inputSearchRef]);

  useEffect(() => {
    defaultTab();
  }, [options]);

  return (
    <div className="LandingSearchBox">
      <div className="LandingSearchBox__search_form_container">
        <label
          htmlFor="LandingSearchBox__search_input_id"
          className="LandingSearchBox__title"
        >
          <Link to="/" className="LandingSearchBox__back">
            <Icon icon="ep:back" className="LandingSearchBox__back__icon" />
          </Link>
          {title}
        </label>
        <div className="LandingSearchBox__search_options_container">
          <div className="LandingSearchBox__tabs_container">
            {options?.map((method) => (
              <button
                key={`tab-${method.key}`}
                className={classNames({
                  LandingSearchBox__search_option_tab: true,
                  "LandingSearchBox__search_option_tab--selected":
                    searchMethod?.key === method.key,
                })}
                onClick={() => dispatch(setSearchMethod(method))}
              >
                <Icon icon={method.icon} />
                {method.label}
              </button>
            ))}
          </div>
          <form onSubmit={search} className="LandingSearchBox__search_form">
            <div className="LandingSearchBox__search_inputs_container">
              <input
                id="LandingSearchBox__search_input_id"
                className="LandingSearchBox__search_input"
                type="text"
                placeholder={searchMethod?.hint}
                ref={inputSearchRef}
                value={searchTerm || ""}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              />
              <button className="LandingSearchBox__search_button">
                <Icon
                  icon="mdi:search"
                  className="LandingSearchBox__search_icon"
                />{" "}
                Buscar
              </button>
            </div>
            <label
              htmlFor="LandingSearchBox__search_input_id"
              className="LandingSearchBox__extra_text"
            >
              {searchMethod?.description}
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearcherBox;
