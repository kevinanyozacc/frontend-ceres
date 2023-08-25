import { InlineIcon } from "@iconify/react";
import defaultImage3 from "../../../assets/images/unsplash/places/federico-respini-sYffw0LNr7s-unsplash.jpg";
import defaultImage2 from "../../../assets/images/unsplash/places/michael-bourgault-YvvHEQNgMcU-unsplash.jpg";
import defaultImage1 from "../../../assets/images/unsplash/places/timothy-eberly-XemjjFd_4qE-unsplash.jpg";

export default function HeaderSimple({
  icon,
  title,
  displayType,
  locationName,
  ruc,
  padron,
}) {
  return (
    <div className="PlaceProfile__header">
      <div className="PlaceProfile__avatar">
        <InlineIcon icon={icon} />
      </div>
      <h1 className="PlaceProfile__name">{title}</h1>
      <div className="PlaceProfile__photos_container">
        <img src={defaultImage1} alt="Imagen establecimiento" />
        <img src={defaultImage2} alt="Imagen establecimiento" />
        <img src={defaultImage3} alt="Imagen establecimiento" />
      </div>
      <h2 className="PlaceProfile__subtitle">
        {displayType} en{" "}
        <span className="PlaceProfile__location">{locationName}</span>
      </h2>
      <h2 className="PlaceProfile__subtitle">
        RUC: {ruc} • Padrón: {padron}
      </h2>
    </div>
  );
}
