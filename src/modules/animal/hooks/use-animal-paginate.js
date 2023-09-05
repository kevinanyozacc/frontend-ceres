/* eslint-disable react-hooks/exhaustive-deps */

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchAnimalQuery } from "../features/animal.rtk";
import { animalActions } from "../features/animal.slice";

export default function useAlnimalPaginate(autoload = false) {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { data, isLoading, isFetching }] = useLazySearchAnimalQuery();

  const currentPage = useMemo(() => {
    return data?.meta?.currentPage || 1;
  }, [data]);

  const lastPage = useMemo(() => {
    return data?.meta?.totalPages || 1;
  }, [data]);

  const clear = () => {
    dispatch(animalActions.setAnimalPaginate({ data: [] }));
  };

  const handle = (page = 1) => {
    fetch({ q: searchTerm, limit: 100, page })
      .unwrap()
      .then((data) => {
        if (!autoload) {
          dispatch(animalActions.setAnimalPaginate(data));
        } else {
          dispatch(animalActions.setAnimalPaginateAppend(data));
        }
      });
  };

  const nextData = () => {
    const nexPage = currentPage + 1;
    if (nexPage <= lastPage) handle(nexPage);
  };

  return {
    isLoading,
    isFetching,
    clear,
    handle,
    nextData,
    page: currentPage,
    lastPage,
  };
}
