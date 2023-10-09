/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyListPrediosToCultivoQuery } from "../features/cultivo.rtk";

export function useCultivoPredios() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListPrediosToCultivoQuery();
  const { cultivoSelected } = useSelector((state) => state.cultivo);

  const handle = () => {
    fetch(cultivoSelected.ID);
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
