import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { useCultivoMonitoreo } from "../hooks/use-cultivo-monitoreo";
import { CultivoMonitoreoItem } from "./cultivo-monitoreo-item";
import { CultivoMonitoreoResultadoModal } from "./cultivo-monitoreo-resultado-modal";

export function CultivoMonitoreoResult() {
  const monitoreo = useCultivoMonitoreo();
  const { cultivoSelected } = useSelector((state) => state.cultivo);

  const count = useMemo(() => {
    return monitoreo.data?.length || 0;
  }, [monitoreo.data]);

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="humbleicons:certificate" /> Monitoreos
      </h4>

      {cultivoSelected ? (
        monitoreo.isPending ? (
          <Loader />
        ) : count ? (
          <TableSimple
            responsive
            contentStyle={{ height: "100%" }}
            contentClassName="bg-light"
          >
            <TableSimpleHead
              data={[
                { title: "Tipo" },
                { title: "N° Solicitud" },
                { title: "Resp", align: "left", colSpan: 2 },
                { title: "Fec. Regístro" },
                { title: "Componente" },
                { title: "Producto" },
                { title: "Meta" },
                { title: "Más" },
              ]}
            />
            {monitoreo.data?.map((item, index) => (
              <CultivoMonitoreoItem
                key={`item-monitoreo-result-${index}`}
                data={item}
              />
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de monitoreos" />
        )
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
      {/* monitoreo result */}
      <CultivoMonitoreoResultadoModal />
    </Fragment>
  );
}
