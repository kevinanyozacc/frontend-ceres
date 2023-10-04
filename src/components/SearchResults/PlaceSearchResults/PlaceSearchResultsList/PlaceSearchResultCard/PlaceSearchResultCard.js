import { Icon, InlineIcon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { getIconByPlaceType } from "../../../../../helpers/places";
import "./PlaceSearchResultCard.css";

const PlaceSearchResultCard = ({ data }) => {
  const navigate = useNavigate();

  const link = () => {
    const alloweds = ["crops"];
    const type = `${data.type}`.trim().toLowerCase();
    if (alloweds.includes(type)) {
      navigate(`/${data.spanishType}/${data.padron}`);
    } else {
      navigate(`/establecimiento/${data.spanishType}/${data.padron}`);
    }
  };

  return (
    <div
      className="PlaceSearchResultCard"
      onClick={link}
      title={data.spanishType}
    >
      <Icon
        className="PlaceSearchResultCard__icon"
        icon={getIconByPlaceType(data.type)}
      />
      <h4 className="PlaceSearchResultCard__title">
        {data.name.toLowerCase()}
      </h4>
      <p className="PlaceSearchResultCard__location">
        <InlineIcon icon="mdi:place" /> {data.nameDistrito},{" "}
        {data.nameProvincia}, {data.nameDepartamento}
      </p>
      <p className="PlaceSearchResultCard__subtitle">
        RUC: {data.ruc} • Padrón: {data.padron} • Modificado: {data.year}
      </p>
    </div>
  );
};

export default PlaceSearchResultCard;
