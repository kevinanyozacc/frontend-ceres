/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyFindAnimalQuery } from "../features/animal.rtk";
import { animalActions } from "../features/animal.slice";

export default function useAnimalFind(id) {
  const dispatch = useDispatch();
  const [fetch, { isLoading, isFetching, data }] = useLazyFindAnimalQuery();

  const handle = (id) => {
    fetch(id);
  };

  useEffect(() => {
    if (id) handle(id);
  }, [id]);

  useEffect(() => {
    if (data) {
      dispatch(animalActions.setAnimalSelected(data?.data[0] || undefined));
    }
  }, [data]);

  return {
    handle,
    isLoading: isLoading || isFetching,
    data,
  };
}
