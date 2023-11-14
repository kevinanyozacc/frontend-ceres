/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyListAretadoToCrianzaQuery } from "../features/crianza.rtk";

export function useCrianzaAretado() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListAretadoToCrianzaQuery();
  const { crianzaSelected } = useSelector((state) => state.crianza);

  const handle = () => {
    fetch(crianzaSelected?.RUC_PROD_PRO || crianzaSelected?.NUME_DOCU_PRO);
  };

  useEffect(() => {
    if (crianzaSelected) handle();
  }, [crianzaSelected]);

  return {
    isLoading,
    isFetching,
    handle,
    data,
  };
}
