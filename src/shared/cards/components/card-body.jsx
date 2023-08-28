import "../styles/card-body.css";

export default function CardBody({ children }) {
  return (
    <div
      className="AnimalProfile__extra_data_list AnimalProfile__extra_data_list_Card"
      style={{ height: "100%" }}
    >
      {children || null}
    </div>
  );
}
