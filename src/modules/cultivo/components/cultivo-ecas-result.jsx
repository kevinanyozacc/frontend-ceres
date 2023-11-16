import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { FilterEmpty } from "../../../shared/filters/components/filter-empty";
import { useCultivoEcas } from "../hooks/use-cultivo-ecas";
import { CultivoEcasItem } from "./cultivo-ecas-item";
import "../styles/cultivo-ecas-result.css";

export function CultivoEcasResult() {
  const ecas = useCultivoEcas();
  const { cultivoSelected } = useSelector((state) => state.cultivo);

  const isPending = useMemo(() => {
    return ecas.isLoading || ecas.isFetching;
  }, [ecas.isLoading, ecas.isFetching]);

  const count = useMemo(() => {
    return ecas.data?.length || ecas?.dataEcas?.length || 0;
  }, [ecas.data, ecas.dataEcas]);

  return (
    <Fragment>
      <h4 className="card-title">
        <Icon icon="mingcute:certificate-line" />
        ECAS - Certificado de Buenas Practicas agricolas
      </h4>

      {cultivoSelected ? (
        isPending ? (
          <Loader />
        ) : count ? (
          <div className="Predio__Ecas__Infos__List">
            <div className="Cultivo__Ecas__Item">
              <h3 className="Title">ECAS</h3>
              {ecas.dataEcas?.map((item, index) => (
                <CultivoEcasItem data={item} key={`item-ruta-${index}`} />
              ))}
            </div>
            <div className="Cultivo__Ecas__Item Right">
              <h3 className="Title">Buenas Practicas Agricolas</h3>
              {ecas.data?.map((item, index) => (
                <CultivoEcasItem data={item} key={`item-ruta-${index}`} />
              ))}
            </div>
          </div>
        ) : (
          <FilterEmpty title="Este productor no cuentra con Ecas/buenas practicas agricolas" />
        )
      ) : (
        <FilterEmpty title="Seleccionar productor" />
      )}
    </Fragment>
  );
}
