const headDefault = [{ title: "head", align: "center" }];

export function TableSimpleHead({ data = headDefault }) {
  return (
    <thead>
      <tr>
        {data.map((item, index) => (
          <th
            key={`item-head-${index}`}
            className={`text-${item.align || "center"}`}
          >
            {item.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
