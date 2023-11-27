import { DateTime } from "luxon";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";

export function CultivoMonitoreoResultadoAnimal({ data = [] }) {
  return (
    <TableSimple>
      <TableSimpleHead
        data={[
          { title: "CODIGO MUESTRA" },
          { title: "NOMBRE ENFERMEDAD" },
          { title: "AREA" },
          { title: "PRUEBA" },
          { title: "RESULTADO" },
          { title: "FECHA RECEPCION" },
          { title: "FECHA RESULTADO" },
          { title: "FECHA CIERRE" },
          { title: "FECHA RECHAZO" },
          { title: "INTERPRETACION" },
          { title: "IDENTIFICACION" },
          { title: "CIENTIFICO" },
        ]}
      />
      {data?.map((item, index) => (
        <TableSimpleRow key={`item-resultado-animal-${index}`}>
          <TableSimpleCell>{item?.CODI_MUES_MUE}</TableSimpleCell>
          <TableSimpleCell>{item?.NOMB_ENFE_TEA}</TableSimpleCell>
          <TableSimpleCell>{item?.AREA}</TableSimpleCell>
          <TableSimpleCell>{item?.PRUEBA}</TableSimpleCell>
          <TableSimpleCell>{item?.RESULTADO}</TableSimpleCell>
          <TableSimpleCell>
            {item?.FECHA_RECEPCION
              ? DateTime.fromISO(item?.FECHA_RECEPCION).toFormat("dd/MM/yyyy")
              : ""}
          </TableSimpleCell>
          <TableSimpleCell>
            {item?.FECHA_RESULTADO
              ? DateTime.fromISO(item?.FECHA_RESULTADO).toFormat("dd/MM/yyyy")
              : ""}
          </TableSimpleCell>
          <TableSimpleCell>
            {item?.FECHA_CIERRE
              ? DateTime.fromISO(item?.FECHA_CIERRE).toFormat("dd/MM/yyyy")
              : ""}
          </TableSimpleCell>
          <TableSimpleCell>{item?.INTERPRETACION}</TableSimpleCell>
          <TableSimpleCell>{item?.IDENTIFICACION}</TableSimpleCell>
          <TableSimpleCell>{item?.CIENTIFICO}</TableSimpleCell>
        </TableSimpleRow>
      ))}
    </TableSimple>
  );
}
