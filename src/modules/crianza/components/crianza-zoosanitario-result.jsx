import { Icon } from "@iconify/react";
import { DateTime } from "luxon";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";
import { useCrianzaZoosanitario } from "../hooks/use-crianza-zoosanitario";

export function CrianzaZoosanitarioResult() {
  const zoosanitario = useCrianzaZoosanitario();
  const { crianzaSelected } = useSelector((state) => state.crianza);

  const isPending = useMemo(() => {
    return zoosanitario.isLoading || zoosanitario.isFetching;
  }, [zoosanitario.isLoading, zoosanitario.isFetching]);

  const count = useMemo(() => {
    return zoosanitario.data?.length || 0;
  }, [zoosanitario.data]);

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="tabler:zoom-check-filled" /> Lista de Zoosanitario
      </h4>

      {crianzaSelected ? (
        isPending ? (
          <Loader />
        ) : count ? (
          <TableSimple
            responsive
            contentStyle={{ height: "100%" }}
            contentClassName="bg-light">
            <TableSimpleHead
              data={[
                { title: "CODIGO_IIV", align: "left" },
                { title: "ESTADO" },
                { title: "FECHA_REGISTRO" },
                { title: "CODIGO_EXPEDIENTE", align: "left" },
                { title: "DESCRIPCION_SERVICIO" },
              ]}
            />
            {zoosanitario.data?.map((item, index) => (
              <TableSimpleRow key={`item-vacuna-${index}`}>
                <TableSimpleCell noWrap>{item.CODIGO_IIV}</TableSimpleCell>
                <TableSimpleCell noWrap>{item.ESTADO}</TableSimpleCell>
                <TableSimpleCell>
                  {DateTime.fromISO(item.FECHA_REGISTRO).toFormat("dd/MM/yyyy")}
                </TableSimpleCell>
                <TableSimpleCell noWrap>
                  {item.CODIGO_EXPEDIENTE}
                </TableSimpleCell>
                <TableSimpleCell noWrap>
                  {item.DESCRIPCION_SERVICIO}
                </TableSimpleCell>
              </TableSimpleRow>
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de zoosanitario" />
        )
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
