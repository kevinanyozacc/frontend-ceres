import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import { TableSimple } from "../../../shared/table/components/table-simple";
import { TableSimpleHead } from "../../../shared/table/components/table-simple-head";
import { useCrianzaVigilanciaPasivo } from "../hooks/use-crianza-vigilancia-pasivo";
import { CrianzaVigilanciaItem } from "./crianza-vigilancia-item";

export function CrianzaVigilanciaPasiva() {
  const predio = useCrianzaVigilanciaPasivo();
  const { crianzaPredioSelected } = useSelector((state) => state.crianza);
  const isPending = useMemo(() => {
    return predio.isLoading || predio.isFetching;
  }, [predio.isLoading, predio.isFetching]);

  const count = useMemo(() => {
    return predio.data?.length || 0;
  }, [predio.data]);

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="jam:eye-close-f" /> Vigilancia Pasiva
      </h4>

      {crianzaPredioSelected ? (
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
                { title: "CODIGO PREDIO", align: "left" },
                { title: "N° SOLICITUD" },
                { title: "FECHA GENERACION" },
                { title: "FECHA RECEPCION" },
                { title: "N° FICHA" },
                { title: "NOMBRE PREDIO" },
                { title: "FICHA VIGILANCIA" },
                { title: "AVES" },
                { title: "BOVINO" },
                { title: "CAME" },
                { title: "ALP" },
                { title: "LLA" },
                { title: "CAPRINO" },
                { title: "EQUINO" },
                { title: "OTROS" },
                { title: "OVINO" },
                { title: "PORCINA" },
              ]}
            />
            {predio.data?.map((item, index) => (
              <CrianzaVigilanciaItem key={`item-vacuna-${index}`} item={item} />
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de vigilancia pasiva del predio" />
        )
      ) : (
        <FilterEmpty title="Seleccionar predio" />
      )}
    </Fragment>
  );
}
