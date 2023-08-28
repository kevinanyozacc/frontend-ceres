/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyFindVegetalQuery } from "../features/vegetal.rtk";
import { vegetalActions } from "../features/vegetal.slice";

export default function useVegetalFind(id) {
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
      dispatch(vegetalActions.setVegetalSelected(data?.data[0] || undefined));
    }
  }, [data]);

  return {
    handle,
    isLoading: isLoading || isFetching,
    data,
  };
}
