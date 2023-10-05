import { useDispatch, useSelector } from "react-redux";
import { filterOrderbyData } from "../data/filter-orderby.data";
import { filterActions } from "../features/filter-slice";

export function FilterHeader({ counter, isLoading }) {
  const { orderBySelected } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onSelected = (value) => {
    const currentSelected = filterOrderbyData.find(
      (item) => item.value === value
    );
    dispatch(filterActions.setOrderBySelected(currentSelected));
  };

  return (
    <div className="PlaceSearchResultsList__top">
      <h2 className="PlaceSearchResultsList__title">
        {counter || 0}
        {counter <= 1 ? " resultado" : " resultados"}
      </h2>
      <div className="PlaceSearchResultsList__sort_by_field_container">
        <label
          htmlFor="PlaceSearchResultsList__se lect_id"
          className="PlaceSearchResultsList__select_label"
        >
          Ordenar:
        </label>
        <select
          id="PlaceSearchResultsList__select_id"
          className="PlaceSearchResultsList__select"
          onChange={({ target }) => onSelected(target.value)}
          value={orderBySelected?.value}
          disabled={isLoading}
        >
          {filterOrderbyData?.map((opt) => (
            <option value={opt.value} key={`option-filter-header-${opt.value}`}>
              {opt.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
