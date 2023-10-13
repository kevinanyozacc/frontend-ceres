/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLazyListCertificadoExportacionToEstablecimientoQuery } from "../features/establecimiento.rtk";

export function useEstablecimientoExportacion() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListCertificadoExportacionToEstablecimientoQuery();
  const { establecimientoSelected } = useSelector(
    (state) => state.establecimiento
  );

  const isPending = useMemo(() => {
    return isLoading || isFetching;
  }, [isLoading, isFetching]);

  const handle = () => {
    fetch(establecimientoSelected.id);
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
