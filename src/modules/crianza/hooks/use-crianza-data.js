/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchCrianzaQuery } from "../features/crianza.rtk";
import { crianzaActions } from "../features/crianza.slice";

export function useCrianzaData(autoload = false) {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { data, isLoading, isFetching }] = useLazySearchCrianzaQuery();

  const currentPage = useMemo(() => {
    return data?.meta?.currentPage || 1;
  }, [data]);

  const lastPage = useMemo(() => {
    return data?.meta?.totalPages || 1;
  }, [data]);

  const clear = () => {
    dispatch(crianzaActions.setCrianzaData([]));
  };

  const handle = (page = 1) => {
    fetch({ q: searchTerm, limit: 100, page })
      .unwrap()
      .then((data) => {
        if (!autoload) {
          dispatch(crianzaActions.setCrianzaData(data));
        } else {
          dispatch(crianzaActions.setCrianzaDataAppend(data));
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
