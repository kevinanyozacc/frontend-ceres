/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLazyListEcasToCultivoQuery } from "../features/cultivo.rtk";
import { Collection } from "collect.js";

export function useCultivoEcas() {
  const [fetch, { isLoading, isFetching }] = useLazyListEcasToCultivoQuery();
  const [data, setData] = useState([]);
  const [dataEcas, setDataEcas] = useState([]);
  const { cultivoSelected } = useSelector((state) => state.cultivo);

  const formatter = (tipo, data = []) => {
    const collections = new Collection(data).filter((item) => {
      return tipo === item.TIPO;
    });

    const tmpData = [];

    collections
      .groupBy("ANNO_REGISTRO")
      .keys()
      .each((title) => {
        const body = collections.where("ANNO_REGISTRO", title).toArray();
        tmpData.push({ title, body });
      });

    console.log(collections);
    return tmpData;
  };

  const handle = () => {
    fetch(cultivoSelected?.DNI || cultivoSelected?.IDEN_PROD_MOS)
      .unwrap()
      .then((data) => {
        setData(formatter("LINK", data));
        setDataEcas(formatter("ID", data));
      })
      .catch(() => {
        setData([]);
        setDataEcas([]);
      });
  };

  useEffect(() => {
    if (cultivoSelected) handle();
  }, [cultivoSelected]);

  return {
    isLoading,
    isFetching,
    handle,
    data,
    dataEcas,
  };
}
