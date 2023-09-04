/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyPaginateVigilanciaQuery } from "../features/alimento.rtk";
import { alimentolActions } from "../features/alimento.slice";

export default function useAnimalVigilancia() {
  const dispatch = useDispatch();
  const { alimentoSelected } = useSelector((state) => state.alimento);
  const [fetch, { isLoading, isFetching, data }] =
    useLazyPaginateVigilanciaQuery();

  const handle = () => {
    fetch(alimentoSelected.REGISTRO_ID);
  };

  useEffect(() => {
    if (alimentoSelected?.REGISTRO_ID) handle();
  }, [alimentoSelected]);

  useEffect(() => {
    if (data) dispatch(alimentolActions.setAlimentoVigilancia(data));
  }, [data]);

  return {
    isLoading: isLoading || isFetching,
    handle,
  };
}
