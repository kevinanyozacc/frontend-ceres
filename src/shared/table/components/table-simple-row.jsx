export function TableSimpleRow({ children, simple, onClick, className }) {
  return (
    <tr
      className={`row ${simple ? "simple" : ""} ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}
