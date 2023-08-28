import { useSelector } from "react-redux";
import { FilterAdvance } from "../../../shared/filters/components/filter-advance";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import FilterHeader from "../../../shared/filters/components/filter-header";
import FilterItem from "../../../shared/filters/components/filter-item";
import FilterList from "../../../shared/filters/components/filter-list";
import { MapboxSimple } from "../../../shared/mapbox/components/mapbox-simple";

export default function VegetalSearchResult({ onClickItem, isLoading }) {
  const { predioPaginate } = useSelector((state) => state.predio);

  return (
    <div className="PlaceSearchResults">
      <MapboxSimple isLoading={isLoading} />
      <FilterContainer>
        <FilterHeader
          isLoading={isLoading}
          counter={predioPaginate?.meta?.totalItems || 0}
        />
        <FilterList
          isLoading={isLoading}
          counter={predioPaginate?.meta?.totalItems || 0}
        >
          {predioPaginate?.data?.map((item, index) => (
            <FilterItem
              onClick={() => onClickItem && onClickItem(item)}
              key={`item-${index}`}
              name={item?.NAME}
              listInfo={[
                { icon: "ic:sharp-person", text: item?.FARMER_NAME },
                { icon: "icon-park:id-card", text: item?.FARMER_DNI },
              ]}
            />
          ))}
        </FilterList>
      </FilterContainer>
      <FilterAdvance isLoading={isLoading} />
    </div>
  );
}
