import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { useEstablecimientoExportacion } from "../hooks/use-establecimiento-exportacion";
import { EstablecimientoExportacionItem } from "./establecimiento-exportacion-item";

export function EstablecimientoExportacionResult() {
  const exportacion = useEstablecimientoExportacion();
  const { establecimientoSelected } = useSelector(
    (state) => state.establecimiento
  );

  const count = useMemo(() => {
    return exportacion.data?.data?.length || 0;
  }, [exportacion.data]);

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="humbleicons:certificate" />
        Certificados de exportación
      </h4>

      {establecimientoSelected ? (
        exportacion.isPending ? (
          <Loader />
        ) : count ? (
          <TableSimple
            responsive
            contentStyle={{ height: "100%" }}
            contentClassName="bg-light"
          >
            <TableSimpleHead
              data={[
                { title: "Cód. certificado" },
                { title: "Estado" },
                { title: "Fecha inspección" },
                { title: "Planta" },
                { title: "Punto de inspección" },
                { title: "Fecha exportación" },
                { title: "Punto de salida" },
                { title: "Modo de envío" },
                { title: "Cod. país destino" },
                { title: "Importador" },
              ]}
            />
            {exportacion.data?.data?.map((item, index) => (
              <EstablecimientoExportacionItem
                key={`item-exportacion-${index}`}
                data={item}
              />
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de certificado de exportación" />
        )
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
