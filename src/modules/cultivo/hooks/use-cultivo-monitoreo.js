/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLazyListMonitoreoByCultivoQuery } from "../features/cultivo.rtk";

export function useCultivoMonitoreo() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListMonitoreoByCultivoQuery();
  const { cultivoSelected } = useSelector((state) => state.cultivo);

  const isPending = useMemo(() => {
    return isLoading || isFetching;
  }, [isLoading, isFetching]);

  const handle = () => {
    fetch(cultivoSelected.IDEN_PROD_MOS);
  };

  useEffect(() => {
    if (cultivoSelected) handle();
  }, [cultivoSelected]);

  return {
    isLoading,
    isFetching,
    isPending,
    handle,
    data,
  };
}
