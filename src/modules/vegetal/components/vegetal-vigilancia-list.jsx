import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import FilterItem from "../../../shared/filters/components/filter-item";
import useVegetalVigilancia from "../hooks/use-vegetal-vigilancia";

export default function VegetalVigilanciaList() {
  const { vegetalVigilancia } = useSelector((state) => state.vegetal);
  const { isLoading } = useVegetalVigilancia();

  if (isLoading) return <Loader />;

  return (
    <CardContainer title="Vigilancia">
      <CardSimple>
        <CardTitle title="Monitoreo > Enfermedades > Inf. Ensayo" />
        <CardBody>
          {vegetalVigilancia?.data?.map((item, index) => (
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
                  icon: "ep:list",
                  text: `${item?.MOTIVO} ${item?.INF_COMPLEMENTARIA}`,
                },
              ]}
            />
          ))}
        </CardBody>
      </CardSimple>
    </CardContainer>
  );
}
