import "../styles/table-simple.css";

export function TableSimple({
  children = null,
  contentStyle,
  contentClassName,
  responsive = false,
}) {
  return (
    <div
      className={`table__simple__content ${responsive ? "responsive" : ""} ${
        contentClassName || ""
      }`}
      style={contentStyle}
    >
      <table className="greyGridTable">{children}</table>
    </div>
  );
}
