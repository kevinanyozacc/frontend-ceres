/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyListOcurrenciaByDniQuery } from "../features/crianza.rtk";

export function useCrianzaOcurrencia() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListOcurrenciaByDniQuery();
  const { crianzaSelected } = useSelector((state) => state.crianza);

  const handle = () => {
    fetch(crianzaSelected.CODI_PROD_PRO);
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
