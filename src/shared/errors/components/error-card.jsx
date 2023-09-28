import "../styles/error-card.css";

const defaultProps = {
  title: "",
};

export default function ErrorCard(props = defaultProps) {
  return <div className="error__card__content">{props.title || ""}</div>;
}
