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
import { useCrianzaCsti } from "../hooks/use-crianza-csti";

export function CrianzaCstiResult() {
  const predio = useCrianzaCsti();
  const { crianzaSelected } = useSelector((state) => state.crianza);

  const isPending = useMemo(() => {
    return predio.isLoading || predio.isFetching;
  }, [predio.isLoading, predio.isFetching]);

  const count = useMemo(() => {
    return predio.data?.length || 0;
  }, [predio.data]);

  return (
    <Fragment>
      <h4>
        <Icon icon="dashicons:schedule" /> <b>Lista de CSTI</b>
      </h4>

      {crianzaSelected ? (
        isPending ? (
          <Loader />
        ) : count ? (
          <TableSimple
            responsive
            contentStyle={{ height: "100%" }}
            contentClassName="bg-light"
          >
            <TableSimpleHead
              data={[
                { title: "N° CSTI" },
                { title: "Fec. CSTI" },
                { title: "Ubi. Procedencia", align: "left" },
                { title: "Ubi. Destino", align: "left" },
                { title: "Destino", align: "left" },
                { title: "N° Exp." },
              ]}
            />
            {predio.data?.map((item, index) => (
              <TableSimpleRow key={`item-csti-${index}`}>
                <TableSimpleCell noWrap>{item.NUME_CSTI_TRA}</TableSimpleCell>
                <TableSimpleCell nowrap>
                  {DateTime.fromISO(item.FECH_CSTI_TRA).toFormat("dd/MM/yyyy")}
                </TableSimpleCell>
                <TableSimpleCell noWrap>
                  {item.NOMB_DPTO_DPT} / {item.NOMB_PROV_TPR} /{" "}
                  {item.NOMB_DIST_TDI}
                </TableSimpleCell>
                <TableSimpleCell noWrap>
                  {item.NOMB_DPTO_DPT_1} / {item.NOMB_PROV_TPR_1} /{" "}
                  {item.NOMB_DIST_TDI_1}
                </TableSimpleCell>
                <TableSimpleCell noWrap>{item.DESTINO}</TableSimpleCell>
                <TableSimpleCell noWrap>{item.CCODEXP}</TableSimpleCell>
              </TableSimpleRow>
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de CSTI" />
        )
      ) : (
        <FilterEmpty title="Selecionar productor" />
      )}
    </Fragment>
  );
}
