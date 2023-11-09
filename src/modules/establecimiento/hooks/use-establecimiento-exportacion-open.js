import { useState } from "react";

export function useEstablecimientoExportacionOpen(predioId, data = []) {
  const [index, setIndex] = useState();
  const handle = () => {
    const currentIndex = data?.findIndex((exportacion) => {
      const isPredio = exportacion?.products?.find(
        (prod) => prod?.farm_id === predioId
      );
      return !!isPredio;
    });

    setIndex(currentIndex);
  };

  return {
    handle,
    index,
    setIndex,
  };
}
