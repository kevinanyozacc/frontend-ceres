export function FilterEmpty({ title }) {
  return (
    <div className="PlaceSearchResultsListEmpty" style={{ height: "100%" }}>
      {title || "No hay registros disponibles"}
    </div>
  );
}
