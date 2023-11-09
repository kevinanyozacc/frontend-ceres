/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { cultivoActions } from "../features/cultivo.slice";

export function useCultivoPredioAutoselect(predioId, data = []) {
  const dispatch = useDispatch();

  const selected = () => {
    const current = data?.find((pred) => pred.ID.trim() === predioId.trim());
    dispatch(cultivoActions.setCultivoPredioSelected(current));
  };

  const isChange = useMemo(() => {
    return new Date().toISOString();
  }, [predioId, data]);

  return {
    isChange,
    selected,
  };
}
