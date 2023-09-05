/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function useRequestPaginateToList(
  page = 1,
  lastPage,
  isLoading,
  callback = () => {}
) {
  useEffect(() => {
    if (page + 1 <= lastPage && !isLoading) {
      setTimeout(() => {
        callback();
      }, 2000);
    }
  }, [page, lastPage, isLoading]);
}
