/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyListCertificadoExportacionRelacionadoQuery } from "../features/cultivo.rtk";

export function useCultivoExportacionRelacionado() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListCertificadoExportacionRelacionadoQuery();
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
