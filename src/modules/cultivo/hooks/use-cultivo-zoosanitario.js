/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyListZoosanitarioToCultivoQuery } from "../features/cultivo.rtk";

export function useCultivoZoosanitario() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListZoosanitarioToCultivoQuery();
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
