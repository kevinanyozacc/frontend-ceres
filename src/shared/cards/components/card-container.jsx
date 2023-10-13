export function CardContainer({ title, children }) {
  return (
    <div className="h-100 -flex flex-column">
      <h3 className="text-subtitle">{title}</h3>
      {children || null}
    </div>
  );
}
