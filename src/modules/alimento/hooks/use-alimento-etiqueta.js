/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyListEtiquetaByEstablecimientoQuery } from "../features/alimento.rtk";

export function useAlimentoEtiqueta() {
  const { establecimientoSelected } = useSelector(
    (state) => state.establecimiento
  );
  const [fetch, { isLoading, isFetching, data }] =
    useLazyListEtiquetaByEstablecimientoQuery();

  const handle = () => {
    fetch(establecimientoSelected.id);
  };

  useEffect(() => {
    console.log(establecimientoSelected);
    if (establecimientoSelected?.id) handle();
  }, [establecimientoSelected]);

  return {
    isLoading: isLoading || isFetching,
    handle,
    data,
  };
}
