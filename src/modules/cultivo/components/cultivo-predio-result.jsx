import { Icon } from "@iconify/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import FilterList from "../../../shared/filters/components/filter-list";
import { cultivoActions } from "../features/cultivo.slice";
import { useCultivoPredios } from "../hooks/use-cultivo-predios";
import { CultivoPredioItem } from "./cultivo-predio-item";
import { CultivoPredioSelected } from "./cultivo-predio-selected";

export function CultivoPredioResult() {
  const dispatch = useDispatch();
  const predio = useCultivoPredios();
  const { cultivoSelected, cultivoPredioSelected } = useSelector(
    (state) => state.cultivo
  );

  const selected = (item) => {
    dispatch(cultivoActions.setCultivoPredioSelected(item));
  };

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="fluent:plant-grass-28-filled" /> <b>Lista de Cultivos</b>
      </h4>
      {/* mostrar predio selecionado */}
      <CultivoPredioSelected />
      {/* listar predios */}
      {cultivoSelected ? (
        <FilterList
          isLoading={predio.isLoading || predio.isFetching}
          isFetching={predio.isFetching}
          counter={predio.data?.length || 0}
        >
          {predio?.data
            ?.filter((item) => cultivoPredioSelected?.ID !== item.ID)
            ?.map((item, index) => (
              <CultivoPredioItem
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
