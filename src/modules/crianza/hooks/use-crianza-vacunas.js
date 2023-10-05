/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyListVacunasToCrianzaQuery } from "../features/crianza.rtk";

export function useCrianzaVacunas() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListVacunasToCrianzaQuery();
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
