/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyListZoosanitarioToCrianzaQuery } from "../features/crianza.rtk";
import { crianzaActions } from "../features/crianza.slice";

export function useCrianzaZoosanitario(autoload = false) {
  const dispatch = useDispatch();
  const [fetch, { data, isLoading, isFetching }] =
    useLazyListZoosanitarioToCrianzaQuery();
  const { crianzaSelected } = useSelector((state) => state.crianza);

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
    dispatch(crianzaActions.setCrianzaZoosanitario({ data: [], meta: {} }));
  };

  const handle = (page = 1) => {
    fetch({
      predioId: crianzaSelected.NUME_DOCU_PRO,
      params: { page, limit: 100 },
    })
      .unwrap()
      .then((data) => {
        if (!autoload) {
          dispatch(crianzaActions.setCrianzaZoosanitario(data));
        } else {
          dispatch(crianzaActions.setCrianzaZoosanitarioAppend(data));
        }
      });
  };

  useEffect(() => {
    if (crianzaSelected) handle();
  }, [crianzaSelected]);

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
