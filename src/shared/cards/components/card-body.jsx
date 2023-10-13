import "../styles/card-body.css";

export default function CardBody({ children }) {
  return (
    <div className="AnimalProfile__extra_data_list AnimalProfile__extra_data_list_Card">
      {children || null}
    </div>
  );
}
