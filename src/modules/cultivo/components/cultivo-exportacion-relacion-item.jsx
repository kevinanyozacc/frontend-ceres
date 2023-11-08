import { DateTime } from "luxon";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";
import { Fragment, useState } from "react";
import { Icon } from "@iconify/react";

export function CultivoExportacionRelacionItem({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <TableSimpleRow onClick={() => setIsOpen((prev) => !prev)}>
        <TableSimpleCell noWrap>
          <span className="link cursor-pointer">
            <Icon icon="material-symbols:link" /> {data.plant_id}
          </span>
        </TableSimpleCell>
        <TableSimpleCell nowrap align="center">
          {data.exporter_id}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.inspection_date
            ? DateTime.fromISO(data.inspection_date).toFormat("dd/MM/yyyy")
            : ""}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
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
