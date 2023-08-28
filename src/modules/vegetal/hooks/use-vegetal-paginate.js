/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchVegetalQuery } from "../features/vegetal.rtk";
import { vegetalActions } from "../features/vegetal.slice";

export default function useVegetalPaginate() {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { isLoading, isFetching, data }] = useLazySearchVegetalQuery();

  const handle = () => {
    fetch({ q: searchTerm, limit: 30 });
  };

  useEffect(() => {
    if (searchTerm) handle();
  }, [searchTerm]);

  useEffect(() => {
    if (data) dispatch(vegetalActions.setVegetalPaginate(data));
  }, [data]);

  return {
    isLoading: isLoading || isFetching,
    handle,
  };
}
