import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterAdvance } from "../../../shared/filters/components/filter-advance";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import FilterHeader from "../../../shared/filters/components/filter-header";
import FilterItem from "../../../shared/filters/components/filter-item";
import FilterList from "../../../shared/filters/components/filter-list";
import { MapboxSimple } from "../../../shared/mapbox/components/mapbox-simple";
import useVegetalMetainfo from "../hooks/use-vegetal-metainfo";

export default function VegetalSearchResult({
  onClickItem,
  isLoading,
  isFetching,
}) {
  const { vegetalPaginate } = useSelector((state) => state.vegetal);
  const hookMetainfo = useVegetalMetainfo();

  return (
    <div className="PlaceSearchResults">
      <MapboxSimple
        isLoading={hookMetainfo.isLoading}
        group={hookMetainfo.groupCoords}
      />
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
                { icon: "icon-park:id-card", text: item?.REGISTRO_MONITOREO },
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
