/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyFindAlimentoQuery } from "../features/alimento.rtk";
import { alimentolActions } from "../features/alimento.slice";

export default function useAlimentoFind(id) {
  const dispatch = useDispatch();
  const [fetch, { isLoading, isFetching, data }] = useLazyFindAlimentoQuery();

  const handle = (id) => {
    fetch(id);
  };

  useEffect(() => {
    if (id) handle(id);
  }, [id]);

  useEffect(() => {
    if (data) {
      dispatch(
        alimentolActions.setAlimentoSelected(data?.data[0] || undefined)
      );
    }
  }, [data]);

  return {
    handle,
    isLoading: isLoading || isFetching,
    data,
  };
}
