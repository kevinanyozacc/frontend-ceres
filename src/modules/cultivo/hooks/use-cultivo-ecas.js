/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLazyListEcasToCultivoQuery } from "../features/cultivo.rtk";
import { Collection } from "collect.js";

export function useCultivoEcas() {
  const [fetch, { isLoading, isFetching }] = useLazyListEcasToCultivoQuery();
  const [data, setData] = useState([]);
  const { cultivoSelected } = useSelector((state) => state.cultivo);

  const handle = () => {
    fetch(cultivoSelected.DNI)
      .unwrap()
      .then((data) => {
        const collections = new Collection(data);
        const tmpData = [];
        collections
          .groupBy("ANNO_REGISTRO")
          .keys()
          .each((title) => {
            const body = collections.where("ANNO_REGISTRO", title).toArray();
            tmpData.push({ title, body });
          });

        setData(tmpData);
      })
      .catch(() => setData([]));
  };

  useEffect(() => {
    if (cultivoSelected) handle();
  }, [cultivoSelected]);

  return {
    isLoading,
    isFetching,
    handle,
    data,
  };
}
