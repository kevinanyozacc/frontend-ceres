import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";
import { Fragment } from "react";
import { useFileBlob } from "../../../shared/files/hooks/use-file-blob.js";

export function EstablecimientoEtiquetaItem({ data }) {
  const fileBlob = useFileBlob();

  return (
    <Fragment>
      <TableSimpleRow>
        <TableSimpleCell nowrap align="center">
          {data?.NUME_REGI_PRO}
        </TableSimpleCell>
        <TableSimpleCell align="left">
          {data?.NOMB_COME_PRO || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="left">
          {data?.RUC_EMPR_VET || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data?.RAZO_SOCI_VET || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data?.TIPO_PRODUCTO || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data?.TIPO_PROD_PRO || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data?.REGI_SOLI_PRO || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data?.FECH_VENC_PRO || "-"}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data?.ANNO_REGI_PRO}
        </TableSimpleCell>
        <TableSimpleCell noWrap align="center">
          {data?.NUME_REGI_ARC}
        </TableSimpleCell>
        <TableSimpleCell align="center">{data?.CANT_ETIQUETA}</TableSimpleCell>
        <TableSimpleCell align="center">{data?.VIDA_UTIL}</TableSimpleCell>
        <TableSimpleCell align="center">
          <a href={data?.RUTA_QR} className="link">
            RUTA QR
          </a>
        </TableSimpleCell>
        <TableSimpleCell noWrap align="left">
          <ul>
            {data?.files?.map((file, indexF) => (
              <li
                key={`file-tag-${file?.ID}-${indexF}`}
                className="link cursor-pointer"
                onClick={() => fileBlob.linkFile(file?.ID)}>
                {file?.FILENAME || "-"}
              </li>
            ))}
          </ul>
        </TableSimpleCell>
      </TableSimpleRow>
    </Fragment>
  );
}
