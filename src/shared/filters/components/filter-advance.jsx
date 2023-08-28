import Select from "react-select";
import "../styles/filter-advance.css";

export function FilterAdvance({ isLoading }) {
  return (
    <div className="PlaceSearchResultsFilters">
      <div className="PlaceSearchResultsFilters__filters_container">
        <h3 className="PlaceSearchResultsFilters__title">Filtros avanzados</h3>
        <div className="PlaceSearchResultsFilters__field_container">
          <label htmlFor="advanced-filters-place-select">Sede</label>
          <Select id="advanced-filters-hq-select" isDisabled={isLoading} />
        </div>
        <div className="PlaceSearchResultsFilters__field_container">
          <label htmlFor="advanced-filters-place-select">Departamento</label>
          <Select id="advanced-filters-place-select" isDisabled={isLoading} />
        </div>
        <div className="PlaceSearchResultsFilters__field_container">
          <label htmlFor="advanced-filters-place-select">Año</label>
          <Select id="advanced-filters-year-select" isDisabled={isLoading} />
        </div>
        <div className="PlaceSearchResultsFilters__field_container">
          <label>Tipo de establecimiento</label>
          {/* {typesCheckBoxesData.map((t) => (
            <label
              key={`type-checkbox-container-${t.value}`}
              className="PlaceSearchResultsFilters__checkbox_container"
            >
              <input
                type="checkbox"
                checked={
                  typesFilters.includes(t.value) ||
                  (isEmpty(typesFilters) && t.value === "all")
                }
                onChange={() => {
                  if (t.value === "all") {
                    dispatch(clearTypesFilter());
                  } else {
                    if (!typesFilters.includes(t.value)) {
                      dispatch(addTypeFilter(t.value));
                    } else {
                      dispatch(removeTypeFilter(t.value));
                    }
                  }
                }}
              />{" "}
              {!t.label.startsWith("Todos") && (
                <InlineIcon
                  className="PlaceSearchResultsFilters__checkbox_icon"
                  icon={getIconByPlaceType(t.value)}
                />
              )}{" "}
              {t.label}
            </label>
          ))} */}
        </div>
      </div>
    </div>
  );
}
