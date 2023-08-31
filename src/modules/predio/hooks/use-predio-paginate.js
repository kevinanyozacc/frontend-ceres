/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchPredioQuery } from "../features/predio.rtk";
import { predioActions } from "../features/predio.slice";

export default function usePredioPaginate(autoload = false) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { isLoading, isFetching, data }] = useLazySearchPredioQuery();

  const handle = (page = 1) => {
    fetch({ q: searchTerm, limit: 100, page });
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(predioActions.setPredioPaginate({ data: [] }));
      setPage(0);
      handle(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (data && !autoload) dispatch(predioActions.setPredioPaginate(data));
    setLastPage(data?.meta?.totalPages || 0);
  }, [data, autoload]);

  useEffect(() => {
    if (data && autoload) {
      dispatch(predioActions.setPredioPaginateAppend(data));
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
