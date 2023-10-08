import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleCell } from "../../../shared/table/components/table-simple-cell";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { TableSimpleRow } from "../../../shared/table/components/table-simple-row";
import { useCrianzaAretado } from "../hooks/use-crianza-aretado";

export function CrianzaAretadoResult() {
  const aretado = useCrianzaAretado();
  const { crianzaSelected } = useSelector((state) => state.crianza);

  const isPending = useMemo(() => {
    return aretado.isLoading || aretado.isFetching;
  }, [aretado.isLoading, aretado.isFetching]);

  const count = useMemo(() => {
    return aretado.data?.length || 0;
  }, [aretado.data]);

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="mdi:cow" /> Lista de Aretado
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
                { title: "Código del arete (DIO)" },
                { title: "Sexo" },
                { title: "Edad Mes" },
                { title: "Alta/Baja" },
                { title: "Especie" },
              ]}
            />
            {aretado.data?.map((item, index) => (
              <TableSimpleRow key={`item-aretado-${index}`}>
                <TableSimpleCell noWrap>{item.COD_ARETE}</TableSimpleCell>
                <TableSimpleCell nowrap align="center">
                  {item.SEXO === "M" ? "Macho" : "Hembra"}
                </TableSimpleCell>
                <TableSimpleCell noWrap align="center">
                  {item.EDAD}
                </TableSimpleCell>
                <TableSimpleCell noWrap align="center">
                  {item.ALTA_BAJA === "A" ? "Alta" : "Baja"}
                </TableSimpleCell>
                <TableSimpleCell noWrap align="center">
                  {item.ESP_ANI}
                </TableSimpleCell>
              </TableSimpleRow>
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de CSTI" />
        )
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
