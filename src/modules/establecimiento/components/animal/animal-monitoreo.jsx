import { Fragment } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import FilterItem from "../../../shared/filters/components/filter-item";
import useAnimalVigilancia from "../hooks/use-animal-vigilancia";

export function AnimalMonitereo() {
  const { animalVigilancia } = useSelector((state) => state.animal);
  const { isLoading } = useAnimalVigilancia();

  if (isLoading) return <Loader />;

  return (
    <CardContainer title="Vigilancia">
      <CardSimple>
        <Fragment>
          <CardTitle title="Monitoreo > Enfermedades > Inf. Ensayo" />
          <CardBody>
            {animalVigilancia?.data?.map((item, index) => (
              <FilterItem
                icon="ic:baseline-monitor-heart"
                key={`item-${index}`}
                name={item?.COD_MUESTRA}
                listInfo={[
                  {
                    icon: "material-symbols:info-outline",
                    text: item?.TIPO_MUESTRA,
                  },
                  {
                    icon: "ic:sharp-food-bank",
                    text: item?.NOMBRE_ALIMENTO,
                  },
                  {
                    icon: "mdi:location",
                    text: item?.UBICATION,
                  },
                ]}
              />
            ))}
          </CardBody>
        </Fragment>
      </CardSimple>
    </CardContainer>
  );
}
