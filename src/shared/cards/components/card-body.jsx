export default function CardBody({ children }) {
  return (
    <div className="AnimalProfile__extra_data_list" style={{ height: "100%" }}>
      {children || null}
    </div>
  );
}
