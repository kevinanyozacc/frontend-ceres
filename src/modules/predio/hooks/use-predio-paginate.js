/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchPredioQuery } from "../features/predio.rtk";
import { predioActions } from "../features/predio.slice";

export default function usePredioPaginate(autoload = false) {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { data, isLoading, isFetching }] = useLazySearchPredioQuery();

  const currentPage = useMemo(() => {
    return data?.meta?.currentPage || 1;
  }, [data]);

  const lastPage = useMemo(() => {
    return data?.meta?.totalPages || 1;
  }, [data]);

  const clear = () => {
    dispatch(predioActions.setPredioPaginate({ data: [] }));
  };

  const handle = (page = 1) => {
    fetch({ q: searchTerm, limit: 100, page })
      .unwrap()
      .then((data) => {
        if (!autoload) {
          dispatch(predioActions.setPredioPaginate(data));
        } else {
          dispatch(predioActions.setPredioPaginateAppend(data));
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
