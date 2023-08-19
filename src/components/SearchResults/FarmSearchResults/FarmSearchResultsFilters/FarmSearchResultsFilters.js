/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setHQFilter, setPlaceFilter } from "../../../../redux/ducks/search";
import { useSearchForFarmQuery } from "../../../../redux/services/search";
import "./FarmSearchResultsFilters.css";

const FarmSearchResultsFilters = () => {
  const dispatch = useDispatch();
  const { searchTerm, placeFilter, hqFilter, searchType } = useSelector(
    (state) => state.search
  );
  const { data, error, isLoading, isFetching } = useSearchForFarmQuery({
    search: searchTerm,
    type: searchType,
  });

  const departamentosOptions = useMemo(
    () =>
      data
        ? [
            {
              label: `Todos (${data.departamentos.reduce(
                (acc, d) => acc + d.count,
                0
              )})`,
            },
            ...data.departamentos.map((d) => ({
              value: d.name,
              label: `${d.name.toUpperCase()} (${d.count})`,
            })),
          ]
        : [],
    [data, searchTerm]
  );

  const hqsOptions = useMemo(
    () =>
      data
        ? [
            {
              label: `Todos (${data.hqs.reduce((acc, d) => acc + d.count, 0)})`,
            },
            ...data.hqs.map((d) => ({
              value: d.name,
              label: `${d.name} (${d.count})`,
            })),
          ]
        : [],
    [data, searchTerm]
  );

  if (isLoading || isFetching) return <div />;
  if (error) return <div>Error</div>;

  return (
    <div className="FarmSearchResultsFilters">
      <div className="FarmSearchResultsFilters__filters_container">
        <h3 className="FarmSearchResultsFilters__title">Filtros avanzados</h3>
        <div className="FarmSearchResultsFilters__field_container">
          <label htmlFor="advanced-filters-place-select">Sede</label>
          <Select
            id="advanced-filters-hq-select"
            value={hqsOptions.find((v) => v.value === hqFilter)}
            onChange={(v) => dispatch(setHQFilter(v.value))}
            options={hqsOptions}
            placeholder={hqsOptions[0].label}
          />
        </div>
        <div className="FarmSearchResultsFilters__field_container">
          <label htmlFor="advanced-filters-place-select">Departamento</label>
          <Select
            id="advanced-filters-place-select"
            value={departamentosOptions.find((v) => v.value === placeFilter)}
            onChange={(v) => dispatch(setPlaceFilter(v.value))}
            options={departamentosOptions}
            placeholder={departamentosOptions[0].label}
          />
        </div>
        {/* {data.departamentos.map((departamento, i) => (
          <button
            key={`place-filter-${i}`}
            className="FarmSearchResultsFilters__place_filter"
            onClick={() => dispatch(addPlaceFilter(departamento.name))}
          >
            <span className="FarmSearchResultsFilters__place_filter_name">{departamento.name}</span>
            <span className="FarmSearchResultsFilters__place_filter_results">({departamento.count})</span>
            <Icon className="FarmSearchResultsFilters__place_filter_icon" icon="mdi:chevron-right" />
          </button>
        ))} */}
      </div>
    </div>
  );
};

export default FarmSearchResultsFilters;
