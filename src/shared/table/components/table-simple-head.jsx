const headDefault = [{ title: "head", align: "center", colSpan: 1 }];

export function TableSimpleHead({ data = headDefault }) {
  return (
    <thead>
      <tr>
        {data.map((item, index) => (
          <th
            colSpan={item.colSpan || 1}
            key={`item-head-${index}`}
            className={`text-${item.align || "center"}`}>
            {item.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
