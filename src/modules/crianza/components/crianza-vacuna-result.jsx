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
import { useCrianzaVacunas } from "../hooks/use-crianza-vacunas";

export function CrianzaVacunaResult() {
  const predio = useCrianzaVacunas();
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
        <Icon icon="tabler:vaccine" /> Lista de Vacunas
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
                { title: "NOMBRE", align: "left" },
                { title: "N° FICHA" },
                { title: "FECHA" },
                { title: "UBICACION", align: "left" },
                { title: "BOBINO" },
                { title: "EQUINO" },
                { title: "CAPRINO" },
                { title: "OVINO" },
                { title: "PORCINO" },
                { title: "CASU" },
                { title: "AVES" },
                { title: "OTRO PRG" },
                { title: "BIOLOGICO" },
                { title: "NOMBRE COMERCIAL" },
                { title: "LOTE" },
                { title: "FECHA VENCIMIENTO" },
              ]}
            />
            {predio.data?.map((item, index) => (
              <TableSimpleRow key={`item-vacuna-${index}`}>
                <TableSimpleCell noWrap>{item.NOMB_ACTI_ACT}</TableSimpleCell>
                <TableSimpleCell noWrap>{item.NUME_FICH_VAC}</TableSimpleCell>
                <TableSimpleCell>
                  {DateTime.fromISO(item.FECH_VACU_PRG).toFormat("dd/MM/yyyy")}
                </TableSimpleCell>
                <TableSimpleCell noWrap>{item.UBICACION}</TableSimpleCell>
                <TableSimpleCell>{item.CANT_BOVI_PRG}</TableSimpleCell>
                <TableSimpleCell>{item.CANT_EQUI_PRG}</TableSimpleCell>
                <TableSimpleCell>{item.CANT_CAPR_PRG}</TableSimpleCell>
                <TableSimpleCell>{item.CANT_OVIN_PRG}</TableSimpleCell>
                <TableSimpleCell>{item.CANT_PORC_PRG}</TableSimpleCell>
                <TableSimpleCell>{item.CANT_CASU_PRG}</TableSimpleCell>
                <TableSimpleCell>{item.CANT_AVES_PRG}</TableSimpleCell>
                <TableSimpleCell>{item.CANT_OTRO_PRG}</TableSimpleCell>
                <TableSimpleCell>{item.PROP_BIOL_PRG}</TableSimpleCell>
                <TableSimpleCell>{item.NOMB_COME_PRO}</TableSimpleCell>
                <TableSimpleCell>{item.NUME_LOTE_BIO}</TableSimpleCell>
                <TableSimpleCell>
                  {item.FECH_VCMT_BIO
                    ? DateTime.fromISO(item.FECH_VCMT_BIO).toFormat(
                        "dd/MM/yyyy"
                      )
                    : ""}
                </TableSimpleCell>
              </TableSimpleRow>
            ))}
          </TableSimple>
        ) : (
          <FilterEmpty title="No hay registros de vacunas" />
        )
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
