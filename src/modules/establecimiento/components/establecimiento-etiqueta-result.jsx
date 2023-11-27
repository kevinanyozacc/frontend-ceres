import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { useEstablecimientoEtiqueta } from "../hooks/use-establecimiento-etiqueta";
import { EstablecimientoEtiquetaItem } from "./establecimiento-etiqueta-item";

export function EstablecimientoEtiquetaResult() {
  const etiqueta = useEstablecimientoEtiqueta();
  const { establecimientoSelected } = useSelector(
    (state) => state.establecimiento
  );

  const count = useMemo(() => {
    return etiqueta.data?.length || 0;
  }, [etiqueta.data]);

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="icomoon-free:price-tags" /> Etiquetas
      </h4>

      {establecimientoSelected ? (
        etiqueta.isPending ? (
          <Loader />
        ) : count ? (
          <TableSimple
            responsive
            contentStyle={{ height: "100%" }}
            contentClassName="bg-light">
            <TableSimpleHead
              data={[
                { title: "REGISTRO" },
                { title: "NOMBRE COMERCIAL" },
                { title: "EMPRESA" },
                { title: "RAZON SOCIAL" },
                { title: "TIPO PRODUCTO" },
                { title: "TIPO" },
                { title: "REGISTRO SOLICITUD" },
                { title: "FECHA VENCIMIENTO" },
                { title: "AÑO REGISTRO" },
                { title: "NUMERO REGISTRO" },
                { title: "CANTIDAD ETIQUETA" },
                { title: "VIDA UTIL" },
                { title: "RUTA QR" },
                { title: "ARCHIVOS" },
              ]}
            />
            {etiqueta?.data?.map((item, index) => (
              <EstablecimientoEtiquetaItem
                key={`item-etiqueta-${index}`}
                data={item}
              />
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de etiquetas del establecimiento" />
        )
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
