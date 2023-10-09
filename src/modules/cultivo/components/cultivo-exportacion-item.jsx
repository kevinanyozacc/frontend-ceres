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
            <TableSimpleCell>Producto {index + 1}:</TableSimpleCell>
            <TableSimpleCell colSpan={2} nowrap align="center">
              {item.name}
            </TableSimpleCell>
            <TableSimpleCell noWrap align="center">
              {data.scientific_name || "-"}
            </TableSimpleCell>
          </TableSimpleRow>
        ))}
    </Fragment>
  );
}
