/* eslint-disable react-hooks/exhaustive-deps */

import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import { FilterHeader } from "../../../shared/filters/components/filter-header";
import FilterItem from "../../../shared/filters/components/filter-item";
import FilterList from "../../../shared/filters/components/filter-list";
import { crianzaActions } from "../features/crianza.slice";
import { useCrianzaPaginate } from "../hooks/use-crianza-paginate";
import "../styles/crianza-search-result.css";
import { CrianzaCstiResult } from "./crianza-csti-result";
import { CrianzaPredioResult } from "./crianza-predio-result";
import { CrianzaVacunaResult } from "./crianza-vacuna-result";

export function CrianzaSearchResult({ onClickItem }) {
  const dispatch = useDispatch();
  const { crianzaPaginate, crianzaSelected } = useSelector(
    (state) => state.crianza
  );
  const { searchTerm } = useSelector((state) => state.search);

  const hookPaginate = useCrianzaPaginate(true);

  const selected = (item) => {
    dispatch(crianzaActions.setCrianzaSelected(item));
  };

  useEffect(() => {
    if (searchTerm) {
      hookPaginate.clear();
      hookPaginate.handle();
      dispatch(crianzaActions.setCrianzaSelected(undefined));
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
          <h4>
            <Icon icon="ic:baseline-info" /> <b>Lista de Productores</b>
          </h4>
          <FilterList
            isLoading={hookPaginate.isLoading}
            isFetching={hookPaginate.isFetching}
            counter={crianzaPaginate?.meta?.totalItems || 0}
            onInfinityScroll={hookPaginate.nextData}
          >
            {crianzaPaginate?.data?.map((item, index) => (
              <FilterItem
                onClick={() => selected(item)}
                key={`item-${index}`}
                name={item?.RAZO_SOCI_PRO}
                active={item.CODI_PROD_PRO === crianzaSelected?.CODI_PROD_PRO}
                listInfo={[
                  {
                    icon: "icon-park:id-card",
                    text: item?.RUC_PROD_PRO || item?.NUME_DOCU_PRO,
                  },
                  { icon: "gridicons:location", text: item?.LOCACION },
                ]}
              />
            ))}
          </FilterList>
        </FilterContainer>
        <FilterContainer>
          <CrianzaVacunaResult />
          <CrianzaCstiResult />
        </FilterContainer>
        <FilterContainer>
          <CrianzaPredioResult />
        </FilterContainer>
      </div>
    </div>
  );
}
