/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { cultivoActions } from "../features/cultivo.slice";

export function useCultivoAutoselect(productorId, data = []) {
  const dispatch = useDispatch();

  const selected = () => {
    const current = data?.find((prod) => {
      if (prod.IDEN_PROD_MOS?.trim() === productorId.trim()) return true;
      else if (prod.RUC_PROD_MOS?.trim() === productorId.trim()) return true;
      return false;
    });

    dispatch(cultivoActions.setCultivoSelected(current));
  };

  const isChange = useMemo(() => {
    return new Date().toISOString();
  }, [productorId, data]);

  return {
    isChange,
    selected,
  };
}
