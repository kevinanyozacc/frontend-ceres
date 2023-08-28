import Loader from "../../../components/Loader";
import "../styles/filter-list.css";

export default function FilterList({ isLoading = false, counter, children }) {
  if (isLoading) return <Loader query="Buscando" />;

  return (
    <div className="PlaceSearchResultsList__cards_container">
      {/* listar datos */}
      {children || null}
      {/* mostrar mensaje cuando no hay registros */}
      {!counter ? (
        <div className="PlaceSearchResultsListEmpty">
          No hay registros disponibles
        </div>
      ) : null}
    </div>
  );
}
