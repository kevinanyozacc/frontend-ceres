/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterAdvance } from "../../../shared/filters/components/filter-advance";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import { FilterHeader } from "../../../shared/filters/components/filter-header";
import FilterItem from "../../../shared/filters/components/filter-item";
import FilterList from "../../../shared/filters/components/filter-list";
import { MapboxSimple } from "../../../shared/mapbox/components/mapbox-simple";
import usePredioMetainfo from "../hooks/use-predio-metainfo";
import usePredioPaginate from "../hooks/use-predio-paginate";

export default function VegetalSearchResult({ onClickItem }) {
  const { predioPaginate } = useSelector((state) => state.predio);
  const { searchTerm } = useSelector((state) => state.search);

  const hookPaginate = usePredioPaginate(true);
  const hookMetainfo = usePredioMetainfo();

  useEffect(() => {
    if (searchTerm) {
      hookPaginate.clear();
      hookPaginate.handle();
    }
  }, [searchTerm]);

  return (
    <div className="PlaceSearchResults">
      <MapboxSimple
        isLoading={hookMetainfo.isLoading}
        group={hookMetainfo.groupCoords}
      />
      <FilterContainer>
        <FilterHeader
          isLoading={hookPaginate.isLoading}
          counter={predioPaginate?.meta?.totalItems || 0}
        />
        <FilterList
          isLoading={hookPaginate.isLoading}
          isFetching={hookPaginate.isFetching}
          counter={predioPaginate?.meta?.totalItems || 0}
          onInfinityScroll={hookPaginate.nextData}
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
      <FilterAdvance isLoading={hookPaginate.isLoading} />
    </div>
  );
}
