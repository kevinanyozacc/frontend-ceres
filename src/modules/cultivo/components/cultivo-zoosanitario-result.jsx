import { Icon } from "@iconify/react";
import { DateTime } from "luxon";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";
import { useFilterScrollInfinity } from "../../../shared/filters/hooks/use-filter-scroll-infinity";
import { useFileBlob } from "../../../shared/files/hooks/use-file-blob";
import { useCultivoZoosanitario } from "../hooks/use-cultivo-zoosanitario";

export function CultivoZoosanitarioResult() {
  const zoosanitario = useCultivoZoosanitario(true);
  const fileBlob = useFileBlob();
  const scroll = useFilterScrollInfinity(zoosanitario.isFetching);
  const { cultivoSelected, cultivoZoosanitario } = useSelector(
    (state) => state.cultivo
  );

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="tabler:zoom-check-filled" /> Lista de Zoosanitario
      </h4>

      {cultivoSelected ? (
        <TableSimple
          onScroll={(evt) => scroll.onScroll(evt, zoosanitario.nextData)}
          responsive
          contentStyle={{ height: "100%" }}
          contentClassName="bg-light">
          <TableSimpleHead
            data={[
              { title: "CODIGO IIV", align: "left" },
              { title: "ESTADO" },
              { title: "FECHA_REGISTRO" },
              { title: "CODIGO_EXPEDIENTE", align: "left" },
              { title: "DESCRIPCION_SERVICIO" },
              { title: "ARCHIVOS" },
            ]}
          />
          {cultivoZoosanitario.data?.map((item, index) => (
            <TableSimpleRow key={`item-vacuna-${index}`}>
              <TableSimpleCell noWrap>{item.CODIGO_IIV}</TableSimpleCell>
              <TableSimpleCell noWrap>{item.ESTADO}</TableSimpleCell>
              <TableSimpleCell>
                {DateTime.fromISO(item.FECHA_REGISTRO).toFormat("dd/MM/yyyy")}
              </TableSimpleCell>
              <TableSimpleCell noWrap>{item.CODIGO_EXPEDIENTE}</TableSimpleCell>
              <TableSimpleCell noWrap>
                {item.DESCRIPCION_SERVICIO}
              </TableSimpleCell>
              <TableSimpleCell noWrap>
                <ul>
                  {item.documents?.map((doc) => (
                    <li
                      onClick={() =>
                        fileBlob.linkFile(doc.BLOB_ID, { type: "adjunto" })
                      }
                      className="cursor-pointer">
                      <Icon icon="ph:file-fill" /> <span>{doc.NOMBRE}</span>
                    </li>
                  ))}
                </ul>
              </TableSimpleCell>
            </TableSimpleRow>
          ))}
          {/* loading */}
          {zoosanitario.isPending ? (
            <TableSimpleRow>
              <TableSimpleCell colSpan={6}>
                <Loader />
              </TableSimpleCell>
            </TableSimpleRow>
          ) : null}
          {/* no record */}
          {!zoosanitario.isPending && !cultivoZoosanitario?.meta?.totalItems ? (
            <TableSimpleRow>
              <TableSimpleCell colSpan={6}>
                <FilterEmpty title="No hay registros disponibles" />
              </TableSimpleCell>
            </TableSimpleRow>
          ) : null}
        </TableSimple>
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
