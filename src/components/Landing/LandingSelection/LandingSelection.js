/* eslint-disable jsx-a11y/alt-text */
import "./LandingSelection.css";

export default function LandingSelection({ image, title, onClick }) {
  return (
    <div className="LandingSelection__item" onClick={onClick}>
      <div
        className="LandingSelection__item__Image"
        style={{ background: `url(${image})` }}
      ></div>
      <div className="LandingSelection__item__title active">{title}</div>
    </div>
  );
}
