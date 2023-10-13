import { DateTime } from "luxon";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";
import { Fragment, useState } from "react";

export function EstablecimientoMonitoreoItem({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <TableSimpleRow onClick={() => setIsOpen((prev) => !prev)}>
        <TableSimpleCell align="center">{data.TIPO_ALIMENTO}</TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.REGISTRO_ID}
        </TableSimpleCell>
        <TableSimpleCell nowrap align="left">
          {data.NOMB_CORT_PER}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.FECHA_REGISTRO
            ? DateTime.fromISO(data.FECHA_REGISTRO).toFormat("dd/MM/yyyy")
            : ""}
        </TableSimpleCell>
        <TableSimpleCell align="center">{data.DESC_PROY_PRY}</TableSimpleCell>
        <TableSimpleCell>{data.DESC_PROD_PRD}</TableSimpleCell>
        <TableSimpleCell>{data.DESC_META_MET}</TableSimpleCell>
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
