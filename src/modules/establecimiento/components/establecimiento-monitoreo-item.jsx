import { DateTime } from "luxon";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";
import { Fragment, useState } from "react";
import { EstablecimientoMonitoreoAction } from "./establecimiento-monitoreo-action";

export function EstablecimientoMonitoreoItem({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <Fragment>
      <TableSimpleRow>
        <TableSimpleCell
          align="center"
          onClick={toggle}
          className="cursor-pointer">
          {data.TIPO_ALIMENTO}
        </TableSimpleCell>
        <TableSimpleCell
          noWrap
          align="center"
          onClick={toggle}
          className="cursor-pointer">
          {data.REGISTRO_ID}
        </TableSimpleCell>
        <TableSimpleCell
          nowrap
          colSpan={2}
          align="left"
          onClick={toggle}
          className="cursor-pointer">
          {data.NOMB_CORT_PER}
        </TableSimpleCell>
        <TableSimpleCell
          noWrap
          align="center"
          onClick={toggle}
          className="cursor-pointer">
          {data.FECHA_REGISTRO
            ? DateTime.fromISO(data.FECHA_REGISTRO).toFormat("dd/MM/yyyy")
            : ""}
        </TableSimpleCell>
        <TableSimpleCell
          align="center"
          onClick={toggle}
          className="cursor-pointer">
          {data.DESC_PROY_PRY}
        </TableSimpleCell>
        <TableSimpleCell onClick={toggle} className="cursor-pointer">
          {data.DESC_PROD_PRD}
        </TableSimpleCell>
        <TableSimpleCell onClick={toggle} className="cursor-pointer">
          {data.DESC_META_MET}
        </TableSimpleCell>
        <TableSimpleCell>
          <EstablecimientoMonitoreoAction data={data} />
        </TableSimpleCell>
      </TableSimpleRow>
      {/* body */}
      {isOpen &&
        data?.body?.map((item) => (
          <TableSimpleRow>
            <TableSimpleCell></TableSimpleCell>
            <TableSimpleCell colSpan={2} nowrap>
              {item.IDENTIFICACION_MUESTRA}
            </TableSimpleCell>
            <TableSimpleCell noWrap align="center">
              {item.NUMERO_LOTE || "-"}
            </TableSimpleCell>
            <TableSimpleCell noWrap align="center">
              {item.CONDICION_SEGURIDAD || "-"}
            </TableSimpleCell>
            <TableSimpleCell noWrap align="center">
              {item.ESPECIFICACION || "-"}
            </TableSimpleCell>
            <TableSimpleCell>
              {item.FECHA_MUESTREO
                ? DateTime.fromISO(item.FECHA_MUESTREO).toFormat("dd/MM/yyyy")
                : ""}
            </TableSimpleCell>
            <TableSimpleCell>
              {item.HORA_MUESTREO
                ? DateTime.fromISO(item.HORA_MUESTREO).toFormat("HH:mm a")
                : ""}
            </TableSimpleCell>
            <TableSimpleCell>{item.DESCRIPCION_LUGAR || ""}</TableSimpleCell>
          </TableSimpleRow>
        ))}
    </Fragment>
  );
}
