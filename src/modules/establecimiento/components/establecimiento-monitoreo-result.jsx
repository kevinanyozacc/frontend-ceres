import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { useEstablecimientoMonitoreo } from "../hooks/use-establecimiento-monitoreo";
import { EstablecimientoMonitoreoItem } from "./establecimiento-monitoreo-item";
import { EstablecimientoResultadoModal } from "./establecimiento-resultado-modal";

export function EstablecimientoMonitoreoResult() {
  const monitoreo = useEstablecimientoMonitoreo();
  const { establecimientoSelected } = useSelector(
    (state) => state.establecimiento
  );

  const count = useMemo(() => {
    return monitoreo.data?.length || 0;
  }, [monitoreo.data]);

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="humbleicons:certificate" /> Monitoreos
      </h4>

      {establecimientoSelected ? (
        monitoreo.isPending ? (
          <Loader />
        ) : count ? (
          <TableSimple
            responsive
            contentStyle={{ height: "100%" }}
            contentClassName="bg-light">
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
              <EstablecimientoMonitoreoItem
                key={`item-monitoreo-${index}`}
                data={item}
              />
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de monitoreos del establecimiento" />
        )
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
      {/* monitoreo result */}
      <EstablecimientoResultadoModal />
    </Fragment>
  );
}
