/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dataDepartaments from "../../../data/departamentos.json";
import { filterActions } from "../../../shared/filters/features/filter-slice";
import { useLazyMetainfoVegetalQuery } from "../features/vegetal.rtk";

export default function useVegetalMetainfo(autoload = false) {
  const dispatch = useDispatch();
  const [groupCoords, setGroupCoords] = useState([]);
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { isLoading, isFetching, data }] =
    useLazyMetainfoVegetalQuery();

  const handle = () => {
    fetch({ q: searchTerm });
  };

  const formatDepartaments = () => {
    const dataFormat = [];
    data?.departaments?.forEach((item) => {
      dataFormat.push({
        value: item.name,
        label: `${item.name} (${item.counter})`,
      });
    });
    // save
    dispatch(filterActions.setDepartaments(dataFormat));
    // draw map
    const tmpGroup = [];
    dataFormat.forEach((item) => {
      console.log(item);
      const coord = dataDepartaments.find(
        (dto) =>
          dto.name.toUpperCase().trim() === item.value?.toUpperCase()?.trim()
      );

      if (!coord) return;

      tmpGroup.push({
        title: item.name,
        items: [[coord.lat, coord.lng]],
      });
    });
    // set coords
    setGroupCoords(tmpGroup);
  };

  const formatting = () => {
    formatDepartaments();
  };

  useEffect(() => {
    if (searchTerm) {
      handle(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (data) formatting();
  }, [data]);

  return {
    isLoading: isLoading || isFetching,
    handle,
    groupCoords,
  };
}
