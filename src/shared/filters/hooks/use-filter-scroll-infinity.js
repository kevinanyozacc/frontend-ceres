export function useFilterScrollInfinity(isFetching = false) {
  const onScroll = (evt, callback) => {
    const scrollHeight = evt.currentTarget.scrollHeight;
    const scrollTop = evt.currentTarget.scrollTop;
    const clientHeight = evt.currentTarget.clientHeight;
    const currentScroll = scrollTop + clientHeight + 10;
    if (!isFetching && currentScroll >= scrollHeight) {
      callback && callback();
    }
  };

  return { onScroll };
}
