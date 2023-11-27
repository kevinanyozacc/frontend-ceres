/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLazyListMonitoreoResultadoByCultivoQuery } from "../features/cultivo.rtk";

export function useCultivoMonitoreoResultado() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListMonitoreoResultadoByCultivoQuery();

  const { monitoreoSelected } = useSelector((state) => state.establecimiento);

  const codeId = useMemo(() => {
    if (monitoreoSelected?.FLAG_VEGETAL === "1") {
      return monitoreoSelected.NUME_REGI_SOL;
    } else if (monitoreoSelected?.FLAG_ANIMAL === "1") {
      return monitoreoSelected.SOLICITUD_LAB_SA;
    } else {
      return undefined;
    }
  }, [monitoreoSelected]);

  const type = useMemo(() => {
    if (monitoreoSelected?.FLAG_VEGETAL === "1") {
      return "vegetal";
    } else if (monitoreoSelected?.FLAG_ANIMAL === "1") {
      return "animal";
    } else {
      return undefined;
    }
  }, [monitoreoSelected]);

  const isPending = useMemo(() => {
    return isLoading || isFetching;
  }, [isLoading, isFetching]);

  const handle = () => {
    fetch({ numeroRegistro: codeId, type });
  };

  useEffect(() => {
    if (codeId && type) handle();
  }, [codeId, type]);

  return {
    isLoading,
    isFetching,
    isPending,
    handle,
    data,
    codeId,
    type,
  };
}
