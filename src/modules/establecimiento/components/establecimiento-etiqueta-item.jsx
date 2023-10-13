import { DateTime } from "luxon";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";
import { Fragment } from "react";
import { Icon } from "leaflet";
import { useFileBlob } from "../../../shared/files/hooks/use-file-blob.js";

export function EstablecimientoEtiquetaItem({ data }) {
  const fileBlob = useFileBlob();

  return (
    <Fragment>
      <TableSimpleRow>
        <TableSimpleCell noWrap>{data.certificate_id}</TableSimpleCell>
        <TableSimpleCell nowrap align="center">
          {data.NOMB_COME_PRO}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.RAZO_SOCI_VET || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.NUME_REGI_PRO || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.NOMB_TIPO_BIO || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.NOMB_ORGA_BIO || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.REGI_SOLI_PRO || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.FECH_VENC_PRO
            ? DateTime.fromISO(data.FECH_VENC_PRO).toFormat("dd/MM/yyyy")
            : ""}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data.ANNO_REGI_PRO}
        </TableSimpleCell>
        <TableSimpleCell align="center">{data.VIDA_UTIL}</TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          <ul>
            {data?.files?.map((file) => (
              <li
                key={`item-file-${file.UCM_ID}`}
                className="link"
                onClick={() => fileBlob.linkFile(file.ID)}>
                <Icon icon="bx:file" /> {file.FILENAME || ""}
              </li>
            ))}
          </ul>
        </TableSimpleCell>
      </TableSimpleRow>
    </Fragment>
  );
}
