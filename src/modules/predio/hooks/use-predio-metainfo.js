/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../../../shared/filters/features/filter-slice";
import mapboxGenerateCoords from "../../../shared/mapbox/utils/mapbox-generate-coords";
import { useLazyMetainfoPredioQuery } from "../features/predio.rtk";

export default function usePredioMetainfo() {
  const dispatch = useDispatch();
  const [groupCoords, setGroupCoords] = useState([]);
  const { searchTerm } = useSelector((state) => state.search);
  const [fetch, { isLoading, isFetching, data }] = useLazyMetainfoPredioQuery();

  const handle = () => {
    fetch({ q: searchTerm });
  };

  const formatDepartaments = () => {
    const dataFormat = [];
    const tmpGroup = [];

    data?.departaments?.forEach((item) => {
      dataFormat.push({
        value: item.name,
        label: `${item.name} (${item.counter})`,
        obj: item,
      });

      // draw
      tmpGroup.push({
        title: item.name,
        items: mapboxGenerateCoords([item.lat, item.lng], item.counter),
      });
    });
    // save
    dispatch(filterActions.setDepartaments(dataFormat));
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
