/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyListOcurrenciaByDniQuery } from "../features/cultivo.rtk";

export function useCultivoOcurrencia() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListOcurrenciaByDniQuery();
  const { cultivoSelected } = useSelector((state) => state.cultivo);

  const handle = () => {
    fetch(cultivoSelected.DNI);
  };

  useEffect(() => {
    if (cultivoSelected) handle();
  }, [cultivoSelected]);

  return {
    isLoading,
    isFetching,
    handle,
    data,
  };
}
