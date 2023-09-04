import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterAdvance } from "../../../shared/filters/components/filter-advance";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import FilterHeader from "../../../shared/filters/components/filter-header";
import FilterItem from "../../../shared/filters/components/filter-item";
import FilterList from "../../../shared/filters/components/filter-list";
import { MapboxSimple } from "../../../shared/mapbox/components/mapbox-simple";
import useAlimentoMetainfo from "../hooks/use-alimento-metainfo";

export default function AlimentoSearchResult({
  onClickItem,
  isLoading,
  isFetching,
}) {
  const { alimentoPaginate } = useSelector((state) => state.alimento);
  const hookMetainfo = useAlimentoMetainfo();

  return (
    <div className="PlaceSearchResults">
      <MapboxSimple isLoading={isLoading} group={hookMetainfo.groupCoords} />
      <FilterContainer>
        <FilterHeader
          isLoading={isLoading}
          counter={alimentoPaginate?.meta?.totalItems || 0}
        />
        <FilterList
          isLoading={isLoading}
          counter={alimentoPaginate?.meta?.totalItems || 0}
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
          {isFetching ? <Loader query="Obteniendo más información" /> : null}
        </FilterList>
      </FilterContainer>
      <FilterAdvance isLoading={isLoading} />
    </div>
  );
}
