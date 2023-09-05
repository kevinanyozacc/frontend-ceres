import Loader from "../../../components/Loader";
import "../styles/filter-list.css";

export default function FilterList({
  isLoading = false,
  isFetching = false,
  counter,
  children,
  onInfinityScroll,
}) {
  const onScroll = (evt) => {
    const scrollHeight = evt.currentTarget.scrollHeight;
    const scrollTop = evt.currentTarget.scrollTop;
    const clientHeight = evt.currentTarget.clientHeight;
    const currentScroll = scrollTop + clientHeight + 10;
    if (!isFetching && currentScroll >= scrollHeight) {
      onInfinityScroll && onInfinityScroll();
    }
  };

  if (isLoading) return <Loader query="Buscando" />;

  return (
    <div
      className="PlaceSearchResultsList__cards_container"
      onScroll={onScroll}
    >
      {/* listar datos */}
      {children || null}
      {/* mostrar mensaje cuando no hay registros */}
      {!counter ? (
        <div className="PlaceSearchResultsListEmpty">
          No hay registros disponibles
        </div>
      ) : null}
      {/* loading */}
      {isFetching ? <Loader query="Obtener más información" /> : null}
    </div>
  );
}
