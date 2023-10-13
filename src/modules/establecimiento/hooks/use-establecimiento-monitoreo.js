/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLazyListMonitoreoByEstablecimientoQuery } from "../features/establecimiento.rtk";

export function useEstablecimientoMonitoreo() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListMonitoreoByEstablecimientoQuery();
  const { establecimientoSelected } = useSelector(
    (state) => state.establecimiento
  );

  const isPending = useMemo(() => {
    return isLoading || isFetching;
  }, [isLoading, isFetching]);

  const handle = () => {
    fetch(establecimientoSelected.ruc);
  };

  useEffect(() => {
    if (establecimientoSelected) handle();
  }, [establecimientoSelected]);

  return {
    isLoading,
    isFetching,
    isPending,
    handle,
    data,
  };
}
