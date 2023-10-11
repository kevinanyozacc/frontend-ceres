/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyPaginateVigilanciaQuery } from "../features/animal.rtk";
import { animalActions } from "../features/animal.slice";

export default function useAnimalVigilancia() {
  const dispatch = useDispatch();
  const { establecimientoSelected } = useSelector(
    (state) => state.establecimiento
  );
  const [fetch, { isLoading, isFetching, data }] =
    useLazyPaginateVigilanciaQuery();

  const handle = () => {
    fetch(establecimientoSelected.id);
  };

  useEffect(() => {
    if (establecimientoSelected?.id) handle();
  }, [establecimientoSelected]);

  useEffect(() => {
    if (data) dispatch(animalActions.setAnimalVigilancia(data));
  }, [data]);

  return {
    isLoading: isLoading || isFetching,
    handle,
  };
}
