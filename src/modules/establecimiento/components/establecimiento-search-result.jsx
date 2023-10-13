/* eslint-disable react-hooks/exhaustive-deps */

import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { establecimientoActions } from "../features/establecimiento.slice";
import { useEffect } from "react";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import { useEstablecimientoPaginate } from "../hooks/use-establecimiento-paginate";
import { FilterHeader } from "../../../shared/filters/components/filter-header";
import FilterList from "../../../shared/filters/components/filter-list";
import { EstablecimientoSelected } from "./establecimiento-selected";
import { EstablecimientoItem } from "./establecimiento-item";
import "../styles/establecimiento-search-result.css";
import { EstablecimientoMonitoreoResult } from "./establecimiento-monitoreo-result";
import { EstablecimientoRIIVSResult } from "./establecimiento-riivs-result";
import { EstablecimientoExportacionResult } from "./establecimiento-exportacion-result";
import { EstablecimientoEtiquetaResult } from "./establecimiento-etiqueta-result";

export function EstablecimientoSearchResult() {
  const dispatch = useDispatch();
  const { establecimientoPaginate } = useSelector(
    (state) => state.establecimiento
  );
  const { searchTerm } = useSelector((state) => state.search);

  const hookPaginate = useEstablecimientoPaginate(true);

  const selected = (item) => {
    dispatch(establecimientoActions.setEstablecimientoSelected(item));
  };

  useEffect(() => {
    if (searchTerm) {
      hookPaginate.clear();
      hookPaginate.handle();
      dispatch(establecimientoActions.setEstablecimientoSelected(undefined));
    }
  }, [searchTerm]);

  return (
    <div>
      <div style={{ paddingLeft: "1em", paddingRight: "4em" }}>
        <FilterHeader
          isLoading={hookPaginate.isLoading}
          counter={establecimientoPaginate?.meta?.totalItems || 0}
        />
      </div>
      <div className="PlaceSearchResults EstablecimientoSearchResults">
        <FilterContainer>
          <h4 className="card-title">
            <Icon icon="mdi:farm" /> <b>Lista de Productores</b>
          </h4>
          {/* mostrar info del productor selecionado */}
          <EstablecimientoSelected />
          {/* listar productores */}
          <FilterList
            isLoading={hookPaginate.isLoading}
            isFetching={hookPaginate.isFetching}
            isLoadingCounter={hookPaginate.isPending}
            counter={establecimientoPaginate?.meta?.totalItems || 0}
            onInfinityScroll={hookPaginate.nextData}>
            {establecimientoPaginate?.data?.map((item, index) => (
              <EstablecimientoItem
                key={`item-cultivo-${index}`}
                data={item}
                onClick={() => selected(item)}
              />
            ))}
          </FilterList>
        </FilterContainer>
        <FilterContainer>
          <EstablecimientoMonitoreoResult />
          <EstablecimientoExportacionResult />
          <EstablecimientoRIIVSResult />
          <EstablecimientoEtiquetaResult />
        </FilterContainer>
      </div>
    </div>
  );
}
