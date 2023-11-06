import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { useCultivoExportacion } from "../hooks/use-cultivo-exportacion";
import { CultivoExportacionItem } from "./cultivo-exportacion-item";

export function CultivoExportacionResult() {
  const exportacion = useCultivoExportacion();
  const { cultivoPredioSelected } = useSelector((state) => state.cultivo);

  const isPending = useMemo(() => {
    return exportacion.isLoading || exportacion.isFetching;
  }, [exportacion.isLoading, exportacion.isFetching]);

  const count = useMemo(() => {
    return exportacion.data?.data?.length || 0;
  }, [exportacion.data]);

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="humbleicons:certificate" />
        Certificados de Lugar de Producción
      </h4>

      {cultivoPredioSelected ? (
        isPending ? (
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
                { title: "Cód. solicitud" },
                { title: "Campaña" },
                { title: "Fecha de cosecha" },
                { title: "Area" },
              ]}
            />
            {exportacion.data.data?.map((item, index) => (
              <CultivoExportacionItem
                key={`item-exportacion-${index}`}
                data={item}
              />
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de certificado de exportación" />
        )
      ) : (
        <FilterEmpty title="Seleccionar cultivo" />
      )}
    </Fragment>
  );
}
