import { DateTime } from "luxon";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";
import { Fragment, useState } from "react";
import { Icon } from "@iconify/react";
import { useCultivoToProcesamiento } from "../hooks/use-cultivo-to-procesamiento";
import { LoadingGlobal } from "../../../shared/loading/components/loading-global";
import { useCultivoToPlanta } from "../hooks/use-cultivo-to-planta";

export function CultivoExportacionRelacionItem({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const toPlanta = useCultivoToPlanta();
  const toEstablecimiento = useCultivoToProcesamiento();

  if (toEstablecimiento.isLoading) {
    return <LoadingGlobal title="Redirigiendo al establecimiento..." />;
  }

  if (toPlanta.isLoading) {
    return <LoadingGlobal title="Redirigiendo a la planta..." />;
  }

  return (
    <Fragment>
      <TableSimpleRow onClick={() => setIsOpen((prev) => !prev)}>
        <TableSimpleCell
          align="center"
          noWrap
          onClick={() => toEstablecimiento.relationLink(data.exporter_id)}
        >
          <span className="link cursor-pointer">
            <Icon icon="material-symbols:link" /> {data.plant_id}
          </span>
        </TableSimpleCell>
        <TableSimpleCell nowrap align="center">
          {data.certificate_state}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.inspection_date
            ? DateTime.fromISO(data.inspection_date).toFormat("dd/MM/yyyy")
            : ""}
        </TableSimpleCell>
        <TableSimpleCell
          noWrap
          align="center"
          onClick={() => toPlanta.relationLink(data.plant_id)}
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
          <TableSimpleRow>
            <TableSimpleCell></TableSimpleCell>
            <TableSimpleCell className="text-primary">
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
          </TableSimpleRow>
        ))}
    </Fragment>
  );
}
