import "../styles/table-simple.css";

export function TableSimple({
  children = null,
  contentStyle,
  contentClassName,
  responsive = false,
  onScroll,
}) {
  return (
    <div
      onScroll={onScroll}
      className={`table__simple__content ${responsive ? "responsive" : ""} ${
        contentClassName || ""
      }`}
      style={contentStyle}>
      <table className="greyGridTable">{children}</table>
    </div>
  );
}
