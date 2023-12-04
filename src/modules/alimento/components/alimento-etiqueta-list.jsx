import { Fragment } from "react";
import Loader from "../../../components/Loader";
import CardBody from "../../../shared/cards/components/card-body";
import CardSimple from "../../../shared/cards/components/card-simple";
import CardTitle from "../../../shared/cards/components/card-title";
import FilterItem from "../../../shared/filters/components/filter-item";
import { useAlimentoEtiqueta } from "../hooks/use-alimento-etiqueta";
import { DateTime } from "luxon";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";

export default function AlimentoEtiquetaList() {
  const { isLoading, data } = useAlimentoEtiqueta();

  if (isLoading) return <Loader />;

  return (
    <CardSimple>
      <Fragment>
        <CardTitle title="Etiquetas" />
        <CardBody>
          {data?.map((item, index) => (
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
                  text: `REGISTRO: ${
                    item?.FECHA_REGISTRO
                      ? DateTime.fromISO(item?.FECHA_REGISTRO).toFormat(
                          "dd/mm/yyyy HH:mm:ss"
                        )
                      : null
                  }`,
                },
                {
                  icon: "wi:time-3",
                  text: `EVALUACIÓN TD: ${
                    item?.FECHA_EVALUACION_DT
                      ? DateTime.fromISO(item?.FECHA_EVALUACION_DT).toFormat(
                          "dd/mm/yyyy HH:mm:ss"
                        )
                      : null
                  }`,
                },
                {
                  icon: "wi:time-3",
                  text: `RECEPCIÓN MUESTRA: ${
                    item?.FECHA_RECEPCION_MUESTRA
                      ? DateTime.fromISO(
                          item?.FECHA_RECEPCION_MUESTRA
                        ).toFormat("dd/mm/yyyy HH:mm:ss")
                      : null
                  }`,
                },
                {
                  icon: "mingcute:question-line",
                  text: `INCERTIDUMBRE: ${item?.INCERTIDUMBRE}`,
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
          {/* not data */}
          <FilterEmpty title="No hay registros de etiquetas del establecimiento" />
        </CardBody>
      </Fragment>
    </CardSimple>
  );
}
