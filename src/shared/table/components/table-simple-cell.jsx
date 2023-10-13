const defaultProps = {
  children: null,
  noWrap: false,
  align: "left",
  colSpan: 1,
  simple: false,
  className: undefined,
  onClick: () => null,
};

export function TableSimpleCell(props = defaultProps) {
  return (
    <td
      onClick={props.onClick}
      colSpan={props.colSpan || 1}
      className={`
        cell 
        ${props.noWrap ? "nowrap" : ""} 
        ${props.simple ? "simple" : ""} 
        ${props.align || ""}
        ${props.className || ""}`}>
      {props.children || null}
    </td>
  );
}
