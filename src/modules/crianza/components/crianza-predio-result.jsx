import { Icon } from "@iconify/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import FilterList from "../../../shared/filters/components/filter-list";
import { crianzaActions } from "../features/crianza.slice";
import { useCrianzaPredios } from "../hooks/use-crianza-predios";
import { CrianzaPredioItem } from "./crianza-predio-item";
import { CrianzaPredioSelected } from "./crianza-predio-selected";

export function CrianzaPredioResult() {
  const dispatch = useDispatch();
  const predio = useCrianzaPredios();
  const { crianzaSelected, crianzaPredioSelected } = useSelector(
    (state) => state.crianza
  );

  const selected = (item) => {
    dispatch(crianzaActions.setCrianzaPredioSelected(item));
  };

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="fluent:plant-grass-28-filled" /> <b>Lista de Predios</b>
      </h4>
      {/* mostrar predio selecionado */}
      <CrianzaPredioSelected />
      {/* listar predios */}
      {crianzaSelected ? (
        <FilterList
          isLoading={predio.isLoading || predio.isFetching}
          isFetching={predio.isFetching}
          counter={predio.data?.length || 0}
        >
          {predio?.data
            ?.filter(
              (item) =>
                crianzaPredioSelected?.CODI_PRED_PRE !== item.CODI_PRED_PRE
            )
            .map((item, index) => (
              <CrianzaPredioItem
                key={`item-predio-${index}`}
                data={item}
                onClick={() => selected(item)}
              />
            ))}
        </FilterList>
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
