/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyListRIIVSToCultivoQuery } from "../features/cultivo.rtk";

export function useCultivoRIIVS() {
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListRIIVSToCultivoQuery();
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
