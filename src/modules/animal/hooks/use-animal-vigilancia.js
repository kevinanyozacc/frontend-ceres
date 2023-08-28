/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyPaginateVigilanciaQuery } from "../features/animal.rtk";
import { animalActions } from "../features/animal.slice";

export default function useAnimalVigilancia() {
  const dispatch = useDispatch();
  const { animalSelected } = useSelector((state) => state.animal);
  const [fetch, { isLoading, isFetching, data }] =
    useLazyPaginateVigilanciaQuery();

  const handle = () => {
    fetch(animalSelected.REGISTRO_MONITOREO);
  };

  useEffect(() => {
    if (animalSelected?.REGISTRO_MONITOREO) handle();
  }, [animalSelected]);

  useEffect(() => {
    if (data) dispatch(animalActions.setAnimalVigilancia(data));
  }, [data]);

  return {
    isLoading: isLoading || isFetching,
    handle,
  };
}
