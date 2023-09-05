/* eslint-disable react-hooks/exhaustive-deps */

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchVegetalQuery } from "../features/vegetal.rtk";
import { vegetalActions } from "../features/vegetal.slice";

export default function useVegetalPaginate(autoload = false) {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { data, isLoading, isFetching }] = useLazySearchVegetalQuery();

  const currentPage = useMemo(() => {
    return data?.meta?.currentPage || 1;
  }, [data]);

  const lastPage = useMemo(() => {
    return data?.meta?.totalPages || 1;
  }, [data]);

  const clear = () => {
    dispatch(vegetalActions.setVegetalPaginate({ data: [] }));
  };

  const handle = (page = 1) => {
    fetch({ q: searchTerm, limit: 100, page })
      .unwrap()
      .then((data) => {
        if (!autoload) {
          dispatch(vegetalActions.setVegetalPaginate(data));
        } else {
          dispatch(vegetalActions.setVegetalPaginateAppend(data));
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
