/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchEstablecimientoQuery } from "../features/establecimiento.rtk";
import { establecimientoActions } from "../features/establecimiento.slice";

export function useEstablecimientoPaginate(autoload = false) {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { data, isLoading, isFetching }] =
    useLazySearchEstablecimientoQuery();

  const currentPage = useMemo(() => {
    return data?.meta?.currentPage || 1;
  }, [data]);

  const lastPage = useMemo(() => {
    return data?.meta?.totalPages || 1;
  }, [data]);

  const isPending = useMemo(() => {
    return isLoading || isFetching;
  }, [isLoading, isFetching]);

  const clear = () => {
    dispatch(establecimientoActions.setEstablecimientoPaginate({ data: [] }));
  };

  const handle = (page = 1) => {
    fetch({ q: searchTerm, limit: 100, page })
      .unwrap()
      .then((data) => {
        if (!autoload) {
          dispatch(establecimientoActions.setEstablecimientoPaginate(data));
        } else {
          dispatch(
            establecimientoActions.setEstablecimientoPaginateAppend(data)
          );
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
    isPending,
    clear,
    handle,
    nextData,
    page: currentPage,
    lastPage,
  };
}
