import { Icon } from "@iconify/react";
import { Fragment } from "react";
import AnimalVigilanciaList from "../../animal/components/animal-vigilancia-list";

export function EstablecimientoAnimalResult() {
  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="mdi:cow" /> <b>Animal</b>
      </h4>
      <AnimalVigilanciaList />
    </Fragment>
  );
}
