/* eslint-disable react-hooks/exhaustive-deps */

import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import { FilterHeader } from "../../../shared/filters/components/filter-header";
import FilterList from "../../../shared/filters/components/filter-list";
import { crianzaActions } from "../features/crianza.slice";
import { useCrianzaPaginate } from "../hooks/use-crianza-paginate";
import "../styles/crianza-search-result.css";
import { CrianzaCstiResult } from "./crianza-csti-result";
import { CrianzaItem } from "./crianza-item";
import { CrianzaPredioResult } from "./crianza-predio-result";
import { CrianzaSelected } from "./crianza-selected";
import { CrianzaVacunaResult } from "./crianza-vacuna-result";

export function CrianzaSearchResult() {
  const dispatch = useDispatch();
  const { crianzaPaginate, crianzaSelected } = useSelector(
    (state) => state.crianza
  );
  const { searchTerm } = useSelector((state) => state.search);

  const hookPaginate = useCrianzaPaginate(true);

  const selected = (item) => {
    dispatch(crianzaActions.setCrianzaSelected(item));
    dispatch(crianzaActions.setCrianzaPredioSelected(undefined));
  };

  useEffect(() => {
    if (searchTerm) {
      hookPaginate.clear();
      hookPaginate.handle();
      dispatch(crianzaActions.setCrianzaSelected(undefined));
      dispatch(crianzaActions.setCrianzaPredioSelected(undefined));
    }
  }, [searchTerm]);

  return (
    <div>
      <div style={{ paddingLeft: "1em", paddingRight: "4em" }}>
        <FilterHeader
          isLoading={hookPaginate.isLoading}
          counter={crianzaPaginate?.meta?.totalItems || 0}
        />
      </div>
      <div className="PlaceSearchResults CrianzaSearchResults">
        <FilterContainer>
          <h4 className="card-title">
            <Icon icon="mdi:farm" /> <b>Lista de Productores</b>
          </h4>
          {/* mostrar info del productor selecionado */}
          <CrianzaSelected />
          {/* listar productores */}
          <FilterList
            isLoading={hookPaginate.isLoading}
            isFetching={hookPaginate.isFetching}
            counter={crianzaPaginate?.meta?.totalItems || 0}
            onInfinityScroll={hookPaginate.nextData}
          >
            {crianzaPaginate?.data
              ?.filter(
                (item) => item.CODI_PROD_PRO !== crianzaSelected?.CODI_PROD_PRO
              )
              .map((item, index) => (
                <CrianzaItem
                  key={`item-crianza-${index}`}
                  data={item}
                  onClick={() => selected(item)}
                />
              ))}
          </FilterList>
        </FilterContainer>
        <FilterContainer>
          <CrianzaPredioResult />
        </FilterContainer>
        <FilterContainer>
          <CrianzaVacunaResult />
          <CrianzaCstiResult />
        </FilterContainer>
      </div>
    </div>
  );
}
