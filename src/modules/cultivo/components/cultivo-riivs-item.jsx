import { DateTime } from "luxon";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";
import { Fragment } from "react";
import { useFileUcm } from "../../../shared/files/hooks/use-file-ucm";

export function CultivoRIIVSItem({ data }) {
  const fileUcm = useFileUcm();

  return (
    <Fragment>
      <TableSimpleRow>
        <TableSimpleCell noWrap>{data.CODIGO_IIV}</TableSimpleCell>
        <TableSimpleCell nowrap align="center">
          {data.ESTADO}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.FECHA_REGISTRO
            ? DateTime.fromISO(data.FECHA_REGISTRO).toFormat("dd/MM/yyyy")
            : ""}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.CODIGO_EXPEDIENTE}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.DESCRIPCION_SERVICIO}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.body?.map((b) => (
            <li
              key={`item-riivs-${b.CODIGO_EXPEDIENTE}`}
              onClick={() => fileUcm.linkFile(b.UCM_ID)}>
              {b.UCM_ID}
            </li>
          ))}
        </TableSimpleCell>
      </TableSimpleRow>
    </Fragment>
  );
}
