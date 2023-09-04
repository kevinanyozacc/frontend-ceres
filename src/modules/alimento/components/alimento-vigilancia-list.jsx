import { Fragment } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import FilterItem from "../../../shared/filters/components/filter-item";
import useAlimentoVigilancia from "../hooks/use-alimento-vigilancia";

export default function AlimentoVigilanciaList() {
  const { alimentoVigilancia } = useSelector((state) => state.alimento);
  const { isLoading } = useAlimentoVigilancia();

  if (isLoading) return <Loader />;

  return (
    <CardContainer title="Vigilancia">
      <CardSimple>
        <Fragment>
          <CardTitle title="Monitoreo > Enfermedades > Inf. Ensayo" />
          <CardBody>
            {alimentoVigilancia?.data?.map((item, index) => (
              <FilterItem
                icon="ic:baseline-monitor-heart"
                key={`item-${index}`}
                name={`${item?.MUESTRA_ID || ""}`}
                listInfo={[
                  {
                    icon: "material-symbols:info-outline",
                    text: item?.DESCRIPCION_ALIMENTO,
                  },
                  {
                    icon: "ic:sharp-food-bank",
                    text: item?.MOTIVO_ANALISIS,
                  },
                  {
                    icon: "mdi:location",
                    text: item?.DESC_SEDE_SED,
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
