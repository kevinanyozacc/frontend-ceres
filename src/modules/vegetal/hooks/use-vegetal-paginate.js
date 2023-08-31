/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchVegetalQuery } from "../features/vegetal.rtk";
import { vegetalActions } from "../features/vegetal.slice";

export default function useVegetalPaginate(autoload = false) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { isLoading, isFetching, data }] = useLazySearchVegetalQuery();

  const handle = (page = 1) => {
    fetch({ q: searchTerm, limit: 100, page });
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(vegetalActions.setVegetalPaginate({ data: [] }));
      setPage(0);
      handle(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (data && !autoload) {
      dispatch(vegetalActions.setVegetalPaginate(data));
      setLastPage(data?.meta?.totalPages || 0);
    }
  }, [data, autoload]);

  useEffect(() => {
    if (data && autoload) {
      dispatch(vegetalActions.setVegetalPaginateAppend(data));
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
