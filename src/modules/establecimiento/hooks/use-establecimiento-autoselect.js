/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { establecimientoActions } from "../features/establecimiento.slice";

export function useEstablecimientoAutoselect(productorId, type, data = []) {
  const dispatch = useDispatch();

  const selected = () => {
    const current = data?.find((prod) => {
      if (prod.ruc?.trim() === productorId?.trim() && prod?.type === type) {
        return true;
      } else if (
        prod.dni?.trim() === productorId?.trim() &&
        prod.type === type
      ) {
        return true;
      } else if (
        prod.id?.trim() === productorId?.trim() &&
        prod.type === type
      ) {
        return true;
      } else {
        return false;
      }
    });

    dispatch(establecimientoActions.setEstablecimientoSelected(current));
  };

  const isChange = useMemo(() => {
    return new Date().toISOString();
  }, [productorId, type, data]);

  return {
    isChange,
    selected,
  };
}
