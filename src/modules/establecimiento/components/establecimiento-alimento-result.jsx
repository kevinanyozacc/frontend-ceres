import { Icon } from "@iconify/react";
import { Fragment } from "react";
import AlimentoEtiquetaList from "../../alimento/components/alimento-etiqueta-list";
import { useSelector } from "react-redux";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";

export function EstablecimientoAlimentoResult() {
  const { establecimientoSelected } = useSelector(
    (state) => state.establecimiento
  );

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="material-symbols:monitor-heart" /> <b>Monitoreos</b>
      </h4>

      {establecimientoSelected ? (
        <Fragment>
          <AlimentoEtiquetaList />
        </Fragment>
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
