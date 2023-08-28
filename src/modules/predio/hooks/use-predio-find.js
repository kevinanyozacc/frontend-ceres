/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyFindVegetalQuery } from "../features/predio.rtk";
import { predioActions } from "../features/predio.slice";

export default function usePredioFind(id) {
  const dispatch = useDispatch();
  const [fetch, { isLoading, isFetching, data }] = useLazyFindVegetalQuery();

  const handle = (id) => {
    fetch(id);
  };

  useEffect(() => {
    if (id) handle(id);
  }, [id]);

  useEffect(() => {
    if (data) {
      dispatch(predioActions.setPredioSelected(data?.data));
    }
  }, [data]);

  return {
    handle,
    isLoading: isLoading || isFetching,
    data,
  };
}
