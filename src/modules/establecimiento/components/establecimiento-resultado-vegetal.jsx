import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";

export function EstablecimientoResultadoVegetal({ data = [] }) {
  return (
    <TableSimple>
      <TableSimpleHead
        data={[
          { title: "CODI_PRUE_TPD" },
          { title: "NOMB_AREA_LAB" },
          { title: "CODIGO_MUESTRA" },
          { title: "MOTIVO_RESULTADO" },
          { title: "REPORTE_RESULTADO" },
          { title: "TIPO_MUESTRA" },
          { title: "IDENTIFICADO" },
          { title: "NOMB_CIEN_PLA" },
          { title: "METODO" },
        ]}
      />
      {data?.map((item, index) => (
        <TableSimpleRow key={`item-resultado-vegetal-${index}`}>
          <TableSimpleCell>{item?.CODI_PRUE_TPD}</TableSimpleCell>
          <TableSimpleCell>{item?.NOMB_AREA_LAB}</TableSimpleCell>
          <TableSimpleCell>{item?.CODIGO_MUESTRA}</TableSimpleCell>
          <TableSimpleCell>{item?.MOTIVO_RESULTADO}</TableSimpleCell>
          <TableSimpleCell>{item?.REPORTE_RESULTADO}</TableSimpleCell>
          <TableSimpleCell>{item?.TIPO_MUESTRA}</TableSimpleCell>
          <TableSimpleCell>{item?.IDENTIFICADO}</TableSimpleCell>
          <TableSimpleCell>{item?.NOMB_CIEN_PLA}</TableSimpleCell>
          <TableSimpleCell>{item?.METODO}</TableSimpleCell>
        </TableSimpleRow>
      ))}
    </TableSimple>
  );
}
