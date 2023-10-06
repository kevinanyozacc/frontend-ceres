/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyListVigilanciaActivaToPredioQuery } from "../features/crianza.rtk";

export function useCrianzaVigilanciaActiva() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListVigilanciaActivaToPredioQuery();
  const { crianzaPredioSelected } = useSelector((state) => state.crianza);

  const handle = () => {
    fetch(crianzaPredioSelected.CODI_PRED_PRE);
  };

  useEffect(() => {
    if (crianzaPredioSelected) handle();
  }, [crianzaPredioSelected]);

  return {
    isLoading,
    isFetching,
    handle,
    data,
  };
}
