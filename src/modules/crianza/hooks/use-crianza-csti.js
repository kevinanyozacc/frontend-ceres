/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyListCstiToCrianzaQuery } from "../features/crianza.rtk";

export function useCrianzaCsti() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListCstiToCrianzaQuery();
  const { crianzaSelected } = useSelector((state) => state.crianza);

  const handle = () => {
    fetch(crianzaSelected.NUME_DOCU_PRO);
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
