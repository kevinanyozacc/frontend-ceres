/* eslint-disable react-hooks/exhaustive-deps */

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchAlimentoQuery } from "../features/alimento.rtk";
import { alimentolActions } from "../features/alimento.slice";

export default function useAlimentoPaginate(autoload = false) {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { data, isLoading, isFetching }] = useLazySearchAlimentoQuery();

  const currentPage = useMemo(() => {
    return data?.meta?.currentPage || 1;
  }, [data]);

  const lastPage = useMemo(() => {
    return data?.meta?.totalPages || 1;
  }, [data]);

  const clear = () => {
    dispatch(alimentolActions.setAlimentoPaginate({ data: [] }));
  };

  const handle = (page = 1) => {
    fetch({ q: searchTerm, limit: 100, page })
      .unwrap()
      .then((data) => {
        if (!autoload) {
          dispatch(alimentolActions.setAlimentoPaginate(data));
        } else {
          dispatch(alimentolActions.setAlimentoPaginateAppend(data));
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
