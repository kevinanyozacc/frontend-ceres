/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyListCertificadoExportacionQuery } from "../features/cultivo.rtk";

export function useCultivoExportacion() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListCertificadoExportacionQuery();
  const { cultivoPredioSelected } = useSelector((state) => state.cultivo);

  const handle = () => {
    fetch(cultivoPredioSelected.ID);
  };

  useEffect(() => {
    if (cultivoPredioSelected) handle();
  }, [cultivoPredioSelected]);

  return {
    isLoading,
    isFetching,
    handle,
    data,
  };
}
