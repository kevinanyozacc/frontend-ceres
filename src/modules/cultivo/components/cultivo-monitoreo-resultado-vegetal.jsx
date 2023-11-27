import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";

export function CultivoMonitoreoResultadoVegetal({ data = [] }) {
  return (
    <TableSimple>
      <TableSimpleHead
        data={[
          { title: "CODIGO PRUEBA" },
          { title: "NOMBRE AREA" },
          { title: "CODIGO MUESTRA" },
          { title: "MOTIVO RESULTADO" },
          { title: "REPORTE RESULTADO" },
          { title: "TIPO MUESTRA" },
          { title: "IDENTIFICADO" },
          { title: "NOMB CIENTIFICO" },
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
