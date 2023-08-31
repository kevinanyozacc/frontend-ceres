/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchAnimalQuery } from "../features/animal.rtk";
import { animalActions } from "../features/animal.slice";

export default function useAnimalPaginate(autoload = false) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { isLoading, isFetching, data }] = useLazySearchAnimalQuery();

  const handle = (page = 1) => {
    fetch({ q: searchTerm, limit: 100, page });
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(animalActions.setAnimalPaginate({ data: [] }));
      setPage(0);
      handle(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (data && !autoload) {
      dispatch(animalActions.setAnimalPaginate(data));
      setLastPage(data?.meta?.totalPages || 0);
    }
  }, [data, autoload]);

  useEffect(() => {
    if (data && autoload) {
      dispatch(animalActions.setAnimalPaginateAppend(data));
      setLastPage(data?.meta?.totalPages || 0);
    }
  }, [data, autoload, page]);

  return {
    isLoading,
    isFetching,
    handle,
    page,
    lastPage,
  };
}
