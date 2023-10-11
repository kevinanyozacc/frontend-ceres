/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchCrianzaMetaQuery } from "../features/crianza.rtk";
import { crianzaActions } from "../features/crianza.slice";
import { useMemo } from "react";

export function useCrianzaMeta() {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { isLoading, isFetching }] = useLazySearchCrianzaMetaQuery();

  const isPending = useMemo(() => {
    return isLoading || isFetching;
  }, [isLoading, isFetching]);

  const clear = () => {
    dispatch(crianzaActions.setCrianzaMeta({}));
  };

  const handle = () => {
    fetch({ q: searchTerm, limit: 100 })
      .unwrap()
      .then((data) => dispatch(crianzaActions.setCrianzaMeta(data)))
      .catch(() => dispatch(crianzaActions.setCrianzaMeta({})));
  };

  return {
    isLoading,
    isFetching,
    isPending,
    clear,
    handle,
  };
}
