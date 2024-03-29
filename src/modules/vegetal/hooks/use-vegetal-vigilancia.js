/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyPaginateVigilanciaQuery } from "../features/vegetal.rtk";
import { vegetalActions } from "../features/vegetal.slice";

export default function useVegetalVigilancia() {
  const dispatch = useDispatch();
  const { vegetalSelected } = useSelector((state) => state.vegetal);
  const [fetch, { isLoading, isFetching, data }] =
    useLazyPaginateVigilanciaQuery();

  const handle = () => {
    fetch(vegetalSelected.REGISTRO_MONITOREO);
  };

  useEffect(() => {
    if (vegetalSelected?.REGISTRO_MONITOREO) handle();
  }, [vegetalSelected]);

  useEffect(() => {
    if (data) dispatch(vegetalActions.setVegetalVigilancia(data));
  }, [data]);

  return {
    isLoading: isLoading || isFetching,
    handle,
  };
}
