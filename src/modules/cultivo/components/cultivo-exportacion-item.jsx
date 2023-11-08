import { DateTime } from "luxon";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";
import { Fragment, useState } from "react";

export function CultivoExportacionItem({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <TableSimpleRow onClick={() => setIsOpen((prev) => !prev)}>
        <TableSimpleCell noWrap>{data.certificate_id}</TableSimpleCell>
        <TableSimpleCell nowrap align="center">
          {data.application_id}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.camp_exportacion || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.start_date
            ? DateTime.fromISO(data.start_date).toFormat("dd/MM/yyyy")
            : ""}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.area}
        </TableSimpleCell>
      </TableSimpleRow>
      {/* productos */}
      {isOpen &&
        data?.products?.map((item, index) => (
          <TableSimpleRow>
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
            <TableSimpleCell className="text-primary" noWrap align="center">
              <span className="text-italic">{item.scientific_name || "-"}</span>
            </TableSimpleCell>
          </TableSimpleRow>
        ))}
    </Fragment>
  );
}
