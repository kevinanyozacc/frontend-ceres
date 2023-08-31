/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function useRequestPaginateToList(
  page = 1,
  lastPage,
  callback = () => {}
) {
  useEffect(() => {
    if (page + 1 <= lastPage) {
      setTimeout(() => {
        callback();
      }, 1000);
    }
  }, [page, lastPage]);
}
