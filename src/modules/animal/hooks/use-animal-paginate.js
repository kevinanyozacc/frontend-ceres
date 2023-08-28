/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchAnimalQuery } from "../features/animal.rtk";
import { animalActions } from "../features/animal.slice";

export default function useAnimalPaginate() {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { isLoading, isFetching, data }] = useLazySearchAnimalQuery();

  const handle = () => {
    fetch({ q: searchTerm, limit: 30 });
  };

  useEffect(() => {
    if (searchTerm) handle();
  }, [searchTerm]);

  useEffect(() => {
    if (data) dispatch(animalActions.setAnimalPaginate(data));
  }, [data]);

  return {
    isLoading: isLoading || isFetching,
    handle,
  };
}
