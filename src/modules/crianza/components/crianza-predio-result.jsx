import { Icon } from "@iconify/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import FilterItem from "../../../shared/filters/components/filter-item";
import FilterList from "../../../shared/filters/components/filter-list";
import { crianzaActions } from "../features/crianza.slice";
import { useCrianzaPredios } from "../hooks/use-crianza-predios";

export function CrianzaPredioResult() {
  const dispatch = useDispatch();
  const predio = useCrianzaPredios();
  const { crianzaSelected } = useSelector((state) => state.crianza);

  const selected = (item) => {
    dispatch(crianzaActions.setCrianzaPredioSelected(item));
  };

  return (
    <Fragment>
      <h4>
        <Icon icon="ic:baseline-info" /> <b>Lista de Predios</b>
      </h4>

      {crianzaSelected ? (
        <FilterList
          isLoading={predio.isLoading || predio.isFetching}
          isFetching={predio.isFetching}
          counter={predio.data?.length || 0}
        >
          {predio?.data?.map((item, index) => (
            <FilterItem
              key={`item-predio-${index}`}
              name={item.NOMB_PRED_PRE || ""}
              icon="fluent:plant-grass-28-filled"
              onClick={() => selected(item)}
              listInfo={[
                { icon: "teenyicons:id-solid", text: item?.CODI_PRED_PRE },
              ]}
            />
          ))}
        </FilterList>
      ) : (
        <FilterEmpty title="Selecionar productor" />
      )}
    </Fragment>
  );
}
