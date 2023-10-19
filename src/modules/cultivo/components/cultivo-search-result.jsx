/* eslint-disable react-hooks/exhaustive-deps */

import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import { FilterHeader } from "../../../shared/filters/components/filter-header";
import FilterList from "../../../shared/filters/components/filter-list";
import { useCultivoPaginate } from "../hooks/use-cultivo-paginate";
import "../styles/cultivo-search-result.css";
import { CultivoItem } from "./cultivo-item";
import { CultivoSelected } from "./cultivo-selected";
import { cultivoActions } from "../features/cultivo.slice";
import { CultivoPredioResult } from "./cultivo-predio-result";
import { CultivoExportacionResult } from "./cultivo-exportacion-result";
import { CultivoEcasResult } from "./cultivo-ecas-result";
import { CultivoZoosanitarioResult } from "./cultivo-zoosanitario-result";
import { CultivoRIIVSResult } from "./cultivo-riivs-result";

export function CultivoSearchResult() {
  const dispatch = useDispatch();
  const { cultivoPaginate, cultivoSelected } = useSelector(
    (state) => state.cultivo
  );
  const { searchTerm } = useSelector((state) => state.search);

  const hookPaginate = useCultivoPaginate(true);

  const selected = (item) => {
    dispatch(cultivoActions.setCultivoSelected(item));
    dispatch(cultivoActions.setCultivoPredioSelected(undefined));
  };

  useEffect(() => {
    if (searchTerm) {
      hookPaginate.clear();
      hookPaginate.handle();
      dispatch(cultivoActions.setCultivoSelected(undefined));
      dispatch(cultivoActions.setCultivoPredioSelected(undefined));
    }
  }, [searchTerm]);

  return (
    <div>
      <div style={{ paddingLeft: "1em", paddingRight: "4em" }}>
        <FilterHeader
          isLoading={hookPaginate.isLoading}
          counter={cultivoPaginate?.meta?.totalItems || 0}
        />
      </div>
      <div className="PlaceSearchResults CultivoSearchResults">
        <FilterContainer>
          <h4 className="card-title">
            <Icon icon="mdi:farm" /> <b>Lista de Productores</b>
          </h4>
          {/* mostrar info del productor selecionado */}
          <CultivoSelected />
          {/* listar productores */}
          <FilterList
            isLoading={hookPaginate.isLoading}
            isFetching={hookPaginate.isFetching}
            counter={cultivoPaginate?.meta?.totalItems || 0}
            isLoadingCounter={hookPaginate.isPending}
            onInfinityScroll={hookPaginate.nextData}>
            {cultivoPaginate?.data
              ?.filter((item) => item.ID !== cultivoSelected?.ID)
              .map((item, index) => (
                <CultivoItem
                  key={`item-cultivo-${index}`}
                  data={item}
                  onClick={() => selected(item)}
                />
              ))}
          </FilterList>
        </FilterContainer>
        <FilterContainer>
          <CultivoPredioResult />
        </FilterContainer>
        <FilterContainer>
          <CultivoExportacionResult />
        </FilterContainer>
      </div>
      <div className="PlaceSearchResults CultivoVigilanciaContainer">
        <FilterContainer>
          <CultivoRIIVSResult />
        </FilterContainer>
        <FilterContainer>
          <CultivoEcasResult />
          <CultivoZoosanitarioResult />
        </FilterContainer>
      </div>
    </div>
  );
}
