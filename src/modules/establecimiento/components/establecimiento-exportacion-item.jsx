import { DateTime } from "luxon";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";
import { Fragment, useState } from "react";
import { Icon } from "@iconify/react";
import { useEstablecimientoToPredio } from "../hooks/use-establecimiento-to-predio";
import { LoadingGlobal } from "../../../shared/loading/components/loading-global";
import { useEstablecimientoToPlanta } from "../hooks/use-establecimiento-to-planta";
import { useSelector } from "react-redux";

export function EstablecimientoExportacionItem({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const { establecimientoSelected } = useSelector(
    (state) => state.establecimiento
  );

  const toPredio = useEstablecimientoToPredio();
  const toPlanta = useEstablecimientoToPlanta();

  if (toPredio.isLoading) {
    return <LoadingGlobal title="Redirigiendo al predio..." />;
  }

  if (toPlanta.isLoading) {
    return <LoadingGlobal title="Redirigiendo a la planta..." />;
  }

  return (
    <Fragment>
      <TableSimpleRow onClick={() => setIsOpen((prev) => !prev)}>
        <TableSimpleCell noWrap align="center">
          {data.plant_id}
        </TableSimpleCell>
        <TableSimpleCell nowrap align="center">
          {data.exporter_id}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.inspection_date
            ? DateTime.fromISO(data.inspection_date).toFormat("dd/MM/yyyy")
            : ""}
        </TableSimpleCell>
        <TableSimpleCell
          noWrap
          align="center"
          onClick={() =>
            data.plant_id === establecimientoSelected.id
              ? undefined
              : toPlanta.relationLink(data.plant_id)
          }
        >
          <span className="link cursor-pointer">
            <Icon icon="material-symbols:link" />
            <span> {data.code_plant}</span>
          </span>
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.inspection_place || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.export_date
            ? DateTime.fromISO(data.export_date).toFormat("dd/MM/yyyy")
            : ""}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.checkpoint || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.transportation_mode || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.destination || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.importer || "-"}
        </TableSimpleCell>
      </TableSimpleRow>
      {/* productos */}
      {isOpen &&
        data?.products?.map((item, index) => (
          <TableSimpleRow key={`item-exportacion-${item.farm_id}-${index}`}>
            <TableSimpleCell className="text-primary" align="right">
              Producto {index + 1}:
            </TableSimpleCell>
            <TableSimpleCell
              colSpan={2}
              className="text-primary"
              nowrap
              align="center"
            >
              {item.name}
            </TableSimpleCell>
            <TableSimpleCell
              colSpan={2}
              className="text-primary"
              noWrap
              align="center"
            >
              <span className="text-italic">{item.scientific_name || "-"}</span>
            </TableSimpleCell>
            <TableSimpleCell
              colSpan={2}
              className="text-primary link cursor-pointer"
              align="center"
              noWrap
              onClick={() => toPredio.relationLink(item.farm_id)}
            >
              <span>
                <Icon icon="material-symbols:link" />
                <span> Predio {item.farm_id || "-"}</span>
              </span>
            </TableSimpleCell>
          </TableSimpleRow>
        ))}
    </Fragment>
  );
}
