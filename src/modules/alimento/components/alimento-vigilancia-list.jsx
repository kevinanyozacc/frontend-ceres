import { Fragment } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import CardBody from "../../../shared/cards/components/card-body";
import { CardContainer } from "../../../shared/cards/components/card-container";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import FilterItem from "../../../shared/filters/components/filter-item";
import useAlimentoVigilancia from "../hooks/use-alimento-vigilancia";
import { DateTime} from "luxon";

export default function AlimentoVigilanciaList() {
  const { alimentoVigilancia } = useSelector((state) => state.alimento);
  const { isLoading } = useAlimentoVigilancia();

  if (isLoading) return <Loader />;

  return (
    <CardContainer title="Vigilancia">
      <CardSimple>
        <Fragment>
          <CardTitle title="Monitoreo > Contaminantes > Inf. Ensayo" />
          <CardBody>
            {alimentoVigilancia?.data?.map((item, index) => (
              <FilterItem
                icon="ic:baseline-monitor-heart"
                key={`item-${index}`}
                name={`${item?.REGISTRO_MONITOREO || ""}`}
                listInfo={[
                  {
                    icon: "material-symbols:info-outline",
                    text: item?.DESCRIPCION_ALIMENTO || "",
                  },
                  {
                    icon: "wi:time-3",
                    text: `REGISTRO: ${item?.FECHA_REGISTRO ? 
                      DateTime.fromISO(item?.FECHA_REGISTRO).toFormat('dd/mm/yyyy HH:mm:ss') 
                      : null}`
                  },
                  {
                    icon: "wi:time-3",
                    text: `EVALUACIÓN TD: ${item?.FECHA_EVALUACION_DT ? 
                      DateTime.fromISO(item?.FECHA_EVALUACION_DT).toFormat('dd/mm/yyyy HH:mm:ss') 
                      : null}`
                  },
                  {
                    icon: "wi:time-3",
                    text: `RECEPCIÓN MUESTRA: ${item?.FECHA_RECEPCION_MUESTRA ? 
                      DateTime.fromISO(item?.FECHA_RECEPCION_MUESTRA).toFormat('dd/mm/yyyy HH:mm:ss') 
                      : null}`
                  },
                  {
                    icon: "mingcute:question-line",
                    text: `INCERTIDUMBRE: ${item?.INCERTIDUMBRE}`
                  },
                  {
                    icon: "ic:sharp-food-bank",
                    text: `E: ${item?.ENSAYO || ""}`,
                  },
                  {
                    icon: "octicon:trash-16",
                    text: `S: ${item?.RESIDUOS || ""}`,
                  },
                  {
                    icon: "ep:list",
                    text: `R: ${item?.RESULTADO || ""}`,
                  },
                  {
                    icon: "mdi:location",
                    text: `${item?.NOMB_DPTO_DPT} / ${item?.NOMB_PROV_TPR} / ${item?.NOMB_DIST_TDI}`,
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
