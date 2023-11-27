import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { useCultivoExportacionRelacionado } from "../hooks/use-cultivo-exportacion-relacionado";
import { CultivoExportacionRelacionItem } from "./cultivo-exportacion-relacion-item";

export function CultivoExportacionRelacionResult() {
  const exportacion = useCultivoExportacionRelacionado();
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
        <Icon icon="material-symbols:link" />
        {" Certificados de exportación relacionados"}
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
            {exportacion.data.data?.map((item, index) => (
              <CultivoExportacionRelacionItem
                key={`item-exportacion-relacionada-${index}`}
                data={item}
              />
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de certificado de exportación del predio" />
        )
      ) : (
        <FilterEmpty title="Seleccionar cultivo" />
      )}
    </Fragment>
  );
}
