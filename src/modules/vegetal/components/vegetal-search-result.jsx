/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterAdvance } from "../../../shared/filters/components/filter-advance";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import FilterHeader from "../../../shared/filters/components/filter-header";
import FilterItem from "../../../shared/filters/components/filter-item";
import FilterList from "../../../shared/filters/components/filter-list";
import { MapboxSimple } from "../../../shared/mapbox/components/mapbox-simple";
import useVegetalMetainfo from "../hooks/use-vegetal-metainfo";
import useVegetalPaginate from "../hooks/use-vegetal-paginate";

export default function VegetalSearchResult({ onClickItem }) {
  const { vegetalPaginate } = useSelector((state) => state.vegetal);
  const { searchTerm } = useSelector((state) => state.search);

  const hookPaginate = useVegetalPaginate(true);
  const hookMetainfo = useVegetalMetainfo();

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
          counter={vegetalPaginate?.meta?.totalItems || 0}
        />
        <FilterList
          isLoading={hookPaginate.isLoading}
          isFetching={hookPaginate.isFetching}
          counter={vegetalPaginate?.meta?.totalItems || 0}
          onInfinityScroll={hookPaginate.nextData}
        >
          {vegetalPaginate?.data?.map((item, index) => (
            <FilterItem
              onClick={() => onClickItem && onClickItem(item)}
              icon="ph:plant-fill"
              key={`item-${index}`}
              name={item?.ESTABLECIMIENTO_PRODUCTOR}
              listInfo={[
                { icon: "icomoon-free:location2", text: item?.UBICATION },
                { icon: "icon-park:id-card", text: item?.REGISTRO_MONITOREO },
              ]}
            />
          ))}
        </FilterList>
      </FilterContainer>
      <FilterAdvance isLoading={hookMetainfo.isLoading} />
    </div>
  );
}
