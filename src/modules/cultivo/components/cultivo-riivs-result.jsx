import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import "../styles/cultivo-ecas-result.css";
import { useCultivoRIIVS } from "../hooks/use-cultivo-riivs";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { CultivoRIIVSItem } from "./cultivo-riivs-item";

export function CultivoRIIVSResult() {
  const riivs = useCultivoRIIVS();
  const { cultivoSelected } = useSelector((state) => state.cultivo);

  const isPending = useMemo(() => {
    return riivs.isLoading || riivs.isFetching;
  }, [riivs.isLoading, riivs.isFetching]);

  const count = useMemo(() => {
    return riivs.data?.length || 0;
  }, [riivs.data]);

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="mdi:file-export-outline" />
        RRIVS CERTIFICADO DE INSPECCION Y EXPORTACIÓN
      </h4>

      {cultivoSelected ? (
        isPending ? (
          <Loader />
        ) : count ? (
          <TableSimple
            responsive
            contentStyle={{ height: "100%" }}
            contentClassName="bg-light">
            <TableSimpleHead
              data={[
                { title: "CODIGO_IIV" },
                { title: "ESTADO" },
                { title: "FECHA_REGISTRO" },
                { title: "CODIGO_EXPEDIENTE" },
                { title: "DESCRIPCION_SERVICIO" },
                { title: "ARCHIVOS" },
              ]}
            />
            {riivs.data?.map((item, index) => (
              <CultivoRIIVSItem key={`item-riivs-${index}`} data={item} />
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de RIIVS" />
        )
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
