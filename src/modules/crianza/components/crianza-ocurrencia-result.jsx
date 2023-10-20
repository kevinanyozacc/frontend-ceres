import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { useCrianzaOcurrencia } from "../hooks/use-crianza-ocurrencia";
import { CrianzaOcurrenciaItem } from "./crianza-ocurrencia-item";

export function CrianzaOcurrenciaResult() {
  const predio = useCrianzaOcurrencia();
  const { crianzaSelected } = useSelector((state) => state.crianza);
  const isPending = useMemo(() => {
    return predio.isLoading || predio.isFetching;
  }, [predio.isLoading, predio.isFetching]);

  const count = useMemo(() => {
    return predio.data?.length || 0;
  }, [predio.data]);

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="fluent-mdl2:remove-occurrence" /> Ocurrencias
      </h4>

      {crianzaSelected ? (
        isPending ? (
          <Loader />
        ) : count ? (
          <TableSimple
            responsive
            contentStyle={{ height: "100%" }}
            contentClassName="bg-light">
            <TableSimpleHead
              data={[
                { title: "ANNO", align: "left" },
                { title: "MES" },
                { title: "NUME_REGI_DEN" },
                { title: "DESC_SEDE_SED" },
                { title: "FECH_NOTI_DEN" },
                { title: "FECH_VERI_DEN" },
                { title: "CODI_PRED_PRE" },
                { title: "CODI_PROD_PRO" },
                { title: "DESC_ESTA_EST" },
                { title: "ESTA_MENS_EVA" },
                { title: "RAZO_SOCI_PRO" },
                { title: "NOMB_PRED_PRE" },
                { title: "NOMB_DPTO_DPT" },
                { title: "NOMB_PROV_TPR" },
                { title: "NOMB_DIST_TDI" },
                { title: "COME_NOTI_DEN" },
                { title: "IDEN_CAMP_DEN" },
                { title: "NOMBRE_CULTIVO" },
                { title: "SOLICITUD_LABORATORIO" },
                { title: "INFORME_ENSAYO" },
                { title: "NUME_REGI_SOL" },
              ]}
            />
            {predio.data?.map((item, index) => (
              <CrianzaOcurrenciaItem
                key={`item-ocurrencia-${index}`}
                item={item}
              />
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de ocurrencias" />
        )
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
