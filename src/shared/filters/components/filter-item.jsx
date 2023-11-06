import { Icon, InlineIcon } from "@iconify/react";
import "../styles/filter-item.css";
import { Show } from "../../show/components/show";

export default function FilterItem({
  name,
  icon,
  onClick,
  onClose,
  active,
  listInfo = [],
  moreInfo = [],
}) {
  return (
    <div
      className={`PlaceSearchResultCard ${active ? "active" : ""}`}
      onClick={onClick}
      title={name || ""}
    >
      <Icon className="PlaceSearchResultCard__icon" icon={icon || "mdi:farm"} />
      <Show tagIf={typeof onClose == "function"}>
        <span className="Icon__Close" onClick={onClose}>
          <Icon icon="tabler:x" />
        </span>
      </Show>
      <h4 className="PlaceSearchResultCard__title">
        {name?.toLowerCase() || ""}
      </h4>
      <div>
        {listInfo?.map((info, index) => (
          <p
            key={`info-option-${index}`}
            className={`PlaceSearchResultCard__location mb-1 ${
              info.className || ""
            }`}
          >
            <InlineIcon icon={info.icon} /> {info.text || ""}
          </p>
        ))}
      </div>
      <p className="PlaceSearchResultCard__subtitle">{moreInfo.join(" • ")}</p>
    </div>
  );
}
