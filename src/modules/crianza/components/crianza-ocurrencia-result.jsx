import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { useCrianzaOcurrencia } from "../hooks/use-crianza-ocurrencia";
import { CrianzaOcurrenciaItem } from "./crianza-ocurrencia-item";

export function CrianzaOcurrenciaResult() {
  const predio = useCrianzaOcurrencia();
  const { crianzaSelected } = useSelector((state) => state.crianza);
  const isPending = useMemo(() => {
    return predio.isLoading || predio.isFetching;
  }, [predio.isLoading, predio.isFetching]);

  const count = useMemo(() => {
    return predio.data?.length || 0;
  }, [predio.data]);

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="fluent-mdl2:remove-occurrence" /> Ocurrencias
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
                { title: "AÑO", align: "left" },
                { title: "MES" },
                { title: "NUMERO REGISTRO" },
                { title: "SEDE" },
                { title: "FECHA NOTIFICACION" },
                { title: "FECHA VERIFICACION" },
                { title: "CODIGO PREDIO" },
                { title: "COGIDO PRODUCTOR" },
                { title: "DESCRIPCION" },
                { title: "ESTADO EVALUACION" },
                { title: "RAZON SOCIAL" },
                { title: "NOMBRE PREDIO" },
                { title: "DEPARTAMENTO" },
                { title: "PROVINCIA" },
                { title: "DISTRITO" },
                { title: "COMENTARIO" },
                { title: "IDENTIFICACION" },
                { title: "CULTIVO" },
                { title: "SOLICITUD LABORATORIO" },
                { title: "CODIGO ENSAYO" },
                { title: "REGISTRO" },
              ]}
            />
            {predio.data?.map((item, index) => (
              <CrianzaOcurrenciaItem
                key={`item-ocurrencia-${index}`}
                item={item}
              />
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de ocurrencias del productor" />
        )
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
