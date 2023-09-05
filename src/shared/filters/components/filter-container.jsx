import "../styles/filter-container.css";

export function FilterContainer({ children }) {
  return (
    <div className="PlaceSearchResultsList" id="test">
      {children}
    </div>
  );
}
