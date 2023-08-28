import { useSelector } from "react-redux";
import { FilterAdvance } from "../../../shared/filters/components/filter-advance";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import FilterHeader from "../../../shared/filters/components/filter-header";
import FilterItem from "../../../shared/filters/components/filter-item";
import FilterList from "../../../shared/filters/components/filter-list";
import { MapboxSimple } from "../../../shared/mapbox/components/mapbox-simple";

export default function VegetalSearchResult({ onClickItem, isLoading }) {
  const { vegetalPaginate } = useSelector((state) => state.vegetal);

  return (
    <div className="PlaceSearchResults">
      <MapboxSimple isLoading={isLoading} />
      <FilterContainer>
        <FilterHeader
          isLoading={isLoading}
          counter={vegetalPaginate?.meta?.totalItems || 0}
        />
        <FilterList
          isLoading={isLoading}
          counter={vegetalPaginate?.meta?.totalItems || 0}
        >
          {vegetalPaginate?.data?.map((item, index) => (
            <FilterItem
              onClick={() => onClickItem && onClickItem(item)}
              icon="ph:plant-fill"
              key={`item-${index}`}
              name={item?.ESTABLECIMIENTO_PRODUCTOR}
              listInfo={[
                { icon: "icomoon-free:location2", text: item?.UBICATION },
              ]}
              moreInfo={[`RUC: ${item.CNUMDOC}`]}
            />
          ))}
        </FilterList>
      </FilterContainer>
      <FilterAdvance isLoading={isLoading} />
    </div>
  );
}
