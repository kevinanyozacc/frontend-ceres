import { Icon } from "@iconify/react";
import { Fragment, useState } from "react";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";
import { DateTime } from "luxon";

export function CultivoOcurrenciaItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <TableSimpleRow
        className="cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}>
        <TableSimpleCell noWrap>{item?.ANNO}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.MES}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.NUME_REGI_DEN}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.DESC_SEDE_SED}</TableSimpleCell>
        <TableSimpleCell noWrap>
          {item?.FECH_NOTI_DEN
            ? DateTime.fromISO(item?.FECH_NOTI_DEN).toFormat("dd/MM/yyyy")
            : ""}
        </TableSimpleCell>
        <TableSimpleCell noWrap>
          {item?.FECH_VERI_DEN
            ? DateTime.fromISO(item?.FECH_VERI_DEN).toFormat("dd/MM/yyyy")
            : ""}
        </TableSimpleCell>
        <TableSimpleCell noWrap>{item?.CODI_PRED_PRE}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.CODI_PROD_PRO}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.DESC_ESTA_EST}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.ESTA_MENS_EVA}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.RAZO_SOCI_PRO}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.NOMB_PRED_PRE}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.NOMB_DPTO_DPT}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.NOMB_PROV_TPR}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.NOMB_DIST_TDI}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.COME_NOTI_DEN}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.IDEN_CAMP_DEN}</TableSimpleCell>
        <TableSimpleCell noWrap colSpan={2}>
          {item?.NOMBRE_CULTIVO}
        </TableSimpleCell>
        <TableSimpleCell noWrap colSpan={2}>
          {item?.SOLICITUD_LABORATORIO}
        </TableSimpleCell>
        <TableSimpleCell noWrap>{item?.INFORME_ENSAYO}</TableSimpleCell>
        <TableSimpleCell noWrap>{item?.NUME_REGI_SOL}</TableSimpleCell>
      </TableSimpleRow>
      {/* body */}
      {isOpen
        ? item?.body?.map((det, index) => (
            <TableSimpleRow key={`item-detalle-${det.NUME_REGI_SOL}-${index}`}>
              <TableSimpleCell></TableSimpleCell>
              <TableSimpleCell colSpan={2}>
                <Icon icon="ph:eyedropper-sample-thin" /> {det?.NUME_REGI_SOL}
              </TableSimpleCell>
              <TableSimpleCell colSpan={2}>
                <Icon icon="jam:id-card" /> {det?.CODI_PRUE_TPD}
              </TableSimpleCell>
              <TableSimpleCell colSpan={2}>
                {det?.NOMB_AREA_LAB}
              </TableSimpleCell>
              <TableSimpleCell>{det?.CODIGO_MUESTRA}</TableSimpleCell>
              <TableSimpleCell colSpan={2}>
                {det?.MOTIVO_RESULTADO}
              </TableSimpleCell>
              <TableSimpleCell colSpan={2}>
                {det?.REPORTE_RESULTADO}
              </TableSimpleCell>
              <TableSimpleCell noWrap>{det?.TIPO_MUESTRA}</TableSimpleCell>
              <TableSimpleCell noWrap>
                {det?.IDENTIFICADO || ""}
              </TableSimpleCell>
              <TableSimpleCell colSpan={2}>
                {det?.NOMB_CIEN_PLA || ""}
              </TableSimpleCell>
              <TableSimpleCell colSpan={2}>
                {det?.CATEGORIA_PLAGA || ""}
              </TableSimpleCell>
              <TableSimpleCell noWrap>{det?.METODO || ""}</TableSimpleCell>
            </TableSimpleRow>
          ))
        : null}
    </Fragment>
  );
}
