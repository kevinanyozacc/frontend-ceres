import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import "../styles/cultivo-ecas-result.css";
import { useEstablecimientoRIIVS } from "../hooks/use-establecimiento-riivs";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { EstablecimientoRIIVSItem } from "./establecimiento-riivs-item";

export function EstablecimientoRIIVSResult() {
  const riivs = useEstablecimientoRIIVS();
  const { establecimientoSelected } = useSelector(
    (state) => state.establecimiento
  );

  const count = useMemo(() => {
    return riivs.data?.length || 0;
  }, [riivs.data]);

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="mdi:file-export-outline" />
        RIIVS CERTIFICADO DE INSPECCION Y EXPORTACIÓN
      </h4>

      {establecimientoSelected ? (
        riivs.isPending ? (
          <Loader />
        ) : count ? (
          <TableSimple
            responsive
            contentStyle={{ height: "100%" }}
            contentClassName="bg-light">
            <TableSimpleHead
              data={[
                { title: "CODIGO IIV" },
                { title: "ESTADO" },
                { title: "FECHA REGISTRO" },
                { title: "CODIGO EXPEDIENTE" },
                { title: "DESCRIPCION SERVICIO" },
                { title: "ARCHIVOS" },
              ]}
            />
            {riivs.data?.map((item, index) => (
              <EstablecimientoRIIVSItem
                key={`item-riivs-${index}`}
                data={item}
              />
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de RIIVS del Establecimiento" />
        )
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
