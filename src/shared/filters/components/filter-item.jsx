import { Icon, InlineIcon } from "@iconify/react";
import "../styles/filter-item.css";

export default function FilterItem({
  name,
  icon,
  onClick,
  listInfo = [],
  moreInfo = [],
}) {
  return (
    <div className="PlaceSearchResultCard" onClick={onClick} title={name || ""}>
      <Icon className="PlaceSearchResultCard__icon" icon={icon || "mdi:farm"} />
      <h4 className="PlaceSearchResultCard__title">
        {name?.toLowerCase() || ""}
      </h4>
      <div>
        {listInfo?.map((info, index) => (
          <p
            key={`info-option-${index}`}
            className="PlaceSearchResultCard__location mb-1"
          >
            <InlineIcon icon={info.icon} /> {info.text || ""}
          </p>
        ))}
      </div>
      <p className="PlaceSearchResultCard__subtitle">{moreInfo.join(" • ")}</p>
    </div>
  );
}
