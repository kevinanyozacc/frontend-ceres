/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchPredioQuery } from "../features/predio.rtk";
import { predioActions } from "../features/predio.slice";

export default function usePredioPaginate() {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { isLoading, isFetching, data }] = useLazySearchPredioQuery();

  const handle = () => {
    fetch({ q: searchTerm, limit: 30 });
  };

  useEffect(() => {
    if (searchTerm) handle();
  }, [searchTerm]);

  useEffect(() => {
    if (data) dispatch(predioActions.setPredioPaginate(data));
  }, [data]);

  return {
    isLoading: isLoading || isFetching,
    handle,
  };
}
