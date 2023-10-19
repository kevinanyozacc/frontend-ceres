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
                { title: "NUME_REGI_PRO" },
                { title: "NOMB_COME_PRO" },
                { title: "RUC_EMPR_VET" },
                { title: "RAZO_SOCI_VET" },
                { title: "TIPO_PRODUCTO" },
                { title: "TIPO_PROD_PRO" },
                { title: "REGI_SOLI_PRO" },
                { title: "FECH_VENC_PRO" },
                { title: "ANNO_REGI_PRO" },
                { title: "NUME_REGI_ARC" },
                { title: "CANT_ETIQUETA" },
                { title: "VIDA_UTIL" },
                { title: "RUTA_QR" },
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
          <FilterEmpty title="No hay registros de etiquetas" />
        )
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
