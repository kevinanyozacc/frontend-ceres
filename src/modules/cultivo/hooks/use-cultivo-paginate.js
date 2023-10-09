/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchCultivoQuery } from "../features/cultivo.rtk";
import { cultivoActions } from "../features/cultivo.slice";

export function useCultivoPaginate(autoload = false) {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { data, isLoading, isFetching }] = useLazySearchCultivoQuery();

  const currentPage = useMemo(() => {
    return data?.meta?.currentPage || 1;
  }, [data]);

  const lastPage = useMemo(() => {
    return data?.meta?.totalPages || 1;
  }, [data]);

  const clear = () => {
    dispatch(cultivoActions.setCultivoPaginate({ data: [] }));
  };

  const handle = (page = 1) => {
    fetch({ q: searchTerm, limit: 100, page })
      .unwrap()
      .then((data) => {
        if (!autoload) {
          dispatch(cultivoActions.setCultivoPaginate(data));
        } else {
          dispatch(cultivoActions.setCultivoPaginateAppend(data));
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
