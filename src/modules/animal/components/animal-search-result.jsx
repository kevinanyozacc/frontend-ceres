import { useSelector } from "react-redux";
import { FilterAdvance } from "../../../shared/filters/components/filter-advance";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import FilterHeader from "../../../shared/filters/components/filter-header";
import FilterItem from "../../../shared/filters/components/filter-item";
import FilterList from "../../../shared/filters/components/filter-list";
import { MapboxSimple } from "../../../shared/mapbox/components/mapbox-simple";

export default function AnimalSearchResult({ onClickItem, isLoading }) {
  const { animalPaginate } = useSelector((state) => state.animal);

  return (
    <div className="PlaceSearchResults">
      <MapboxSimple isLoading={isLoading} />
      <FilterContainer>
        <FilterHeader
          isLoading={isLoading}
          counter={animalPaginate?.meta?.totalItems || 0}
        />
        <FilterList
          isLoading={isLoading}
          counter={animalPaginate?.meta?.totalItems || 0}
        >
          {animalPaginate?.data?.map((item, index) => (
            <FilterItem
              icon="mdi:pig"
              onClick={() => onClickItem && onClickItem(item)}
              key={`item-${index}`}
              name={item?.ESTABLECIMIENTO_PRODUCTOR}
              listInfo={[
                { icon: "icomoon-free:location2", text: item?.UBICATION },
              ]}
            />
          ))}
        </FilterList>
      </FilterContainer>
      <FilterAdvance isLoading={isLoading} />
    </div>
  );
}
