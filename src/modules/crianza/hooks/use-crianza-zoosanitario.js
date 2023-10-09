/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyListZoosanitarioToCrianzaQuery } from "../features/crianza.rtk";

export function useCrianzaZoosanitario() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListZoosanitarioToCrianzaQuery();
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
