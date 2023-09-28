const defaultProps = {
  children: null,
  noWrap: false,
  align: "left",
  colSpan: 1,
  simple: false,
  onclick: () => null,
};

export function TableSimpleCell(props = defaultProps) {
  return (
    <td
      onClick={props.onclick}
      colSpan={props.colSpan || 1}
      className={`
        cell 
        ${props.noWrap ? "nowrap" : ""} 
        ${props.simple ? "simple" : ""} 
        ${props.align}`}
    >
      {props.children || null}
    </td>
  );
}
