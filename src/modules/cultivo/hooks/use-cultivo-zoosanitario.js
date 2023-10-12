/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyListZoosanitarioToCultivoQuery } from "../features/cultivo.rtk";
import { cultivoActions } from "../features/cultivo.slice";

export function useCultivoZoosanitario(autoload = false) {
  const dispatch = useDispatch();
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListZoosanitarioToCultivoQuery();
  const { cultivoSelected } = useSelector((state) => state.cultivo);

  const currentPage = useMemo(() => {
    return data?.meta?.currentPage || 1;
  }, [data]);

  const lastPage = useMemo(() => {
    return data?.meta?.totalPages || 1;
  }, [data]);

  const isPending = useMemo(() => {
    return isLoading || isFetching;
  }, [isLoading, isFetching]);

  const nextData = () => {
    const nexPage = currentPage + 1;
    if (nexPage <= lastPage) handle(nexPage);
  };

  const clear = () => {
    dispatch(cultivoActions.setCultivoZoosanitario({ data: [], meta: {} }));
  };

  const handle = (page = 1) => {
    fetch({
      cultivo: cultivoSelected.PRO_RUC,
      params: { page, limit: 100 },
    })
      .unwrap()
      .then((data) => {
        if (!autoload) {
          dispatch(cultivoActions.setCultivoZoosanitario(data));
        } else {
          dispatch(cultivoActions.setCultivoZoosanitarioAppend(data));
        }
      });
  };

  useEffect(() => {
    if (cultivoSelected) handle();
  }, [cultivoSelected]);

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
