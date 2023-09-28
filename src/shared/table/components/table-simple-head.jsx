const headDefault = [{ title: "head" }];

export function TableSimpleHead({ data = headDefault }) {
  return (
    <thead>
      <tr>
        {data.map((item, index) => (
          <th key={`item-head-${index}`}>{item.title}</th>
        ))}
      </tr>
    </thead>
  );
}
