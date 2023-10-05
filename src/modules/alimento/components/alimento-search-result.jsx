/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterAdvance } from "../../../shared/filters/components/filter-advance";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import { FilterHeader } from "../../../shared/filters/components/filter-header";
import FilterItem from "../../../shared/filters/components/filter-item";
import FilterList from "../../../shared/filters/components/filter-list";
import { MapboxSimple } from "../../../shared/mapbox/components/mapbox-simple";
import useAlimentoMetainfo from "../hooks/use-alimento-metainfo";
import useAlimentoPaginate from "../hooks/use-alimento-paginate";

export default function AlimentoSearchResult({ onClickItem }) {
  const { alimentoPaginate } = useSelector((state) => state.alimento);
  const { searchTerm } = useSelector((state) => state.search);

  const hookPaginate = useAlimentoPaginate(true);
  const hookMetainfo = useAlimentoMetainfo();

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
          counter={alimentoPaginate?.meta?.totalItems || 0}
        />
        <FilterList
          isLoading={hookPaginate.isLoading}
          isFetching={hookPaginate.isFetching}
          counter={alimentoPaginate?.meta?.totalItems || 0}
          onInfinityScroll={hookPaginate.nextData}
        >
          {alimentoPaginate?.data?.map((item, index) => (
            <FilterItem
              icon="dashicons:food"
              onClick={() => onClickItem && onClickItem(item)}
              key={`item-${index}`}
              name={item?.FABRICANTE_FORMULADOR}
              listInfo={[
                { icon: "teenyicons:id-solid", text: item?.REGISTRO_ID },
                { icon: "icomoon-free:location2", text: item?.DESC_SEDE_SED },
              ]}
            />
          ))}
        </FilterList>
      </FilterContainer>
      <FilterAdvance isLoading={hookMetainfo.isLoading} />
    </div>
  );
}
