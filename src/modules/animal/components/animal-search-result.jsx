/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterAdvance } from "../../../shared/filters/components/filter-advance";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import FilterHeader from "../../../shared/filters/components/filter-header";
import FilterItem from "../../../shared/filters/components/filter-item";
import FilterList from "../../../shared/filters/components/filter-list";
import { MapboxSimple } from "../../../shared/mapbox/components/mapbox-simple";
import useAnimalMetainfo from "../hooks/use-animal-metainfo";
import useAnimalPaginate from "../hooks/use-animal-paginate";

export default function AnimalSearchResult({ onClickItem }) {
  const { animalPaginate } = useSelector((state) => state.animal);
  const { searchTerm } = useSelector((state) => state.search);

  const hookPaginate = useAnimalPaginate(true);
  const hookMetainfo = useAnimalMetainfo();

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
          counter={animalPaginate?.meta?.totalItems || 0}
        />
        <FilterList
          isLoading={hookPaginate.isLoading}
          isFetching={hookPaginate.isFetching}
          counter={animalPaginate?.meta?.totalItems || 0}
          onInfinityScroll={hookPaginate.nextData}
        >
          {animalPaginate?.data?.map((item, index) => (
            <FilterItem
              icon="mdi:pig"
              onClick={() => onClickItem && onClickItem(item)}
              key={`item-${index}`}
              name={item?.ESTABLECIMIENTO_PRODUCTOR}
              listInfo={[
                { icon: "teenyicons:id-solid", text: item?.REGISTRO_MONITOREO },
                { icon: "icomoon-free:location2", text: item?.UBICATION },
              ]}
            />
          ))}
        </FilterList>
      </FilterContainer>
      <FilterAdvance isLoading={hookMetainfo.isLoading} />
    </div>
  );
}
