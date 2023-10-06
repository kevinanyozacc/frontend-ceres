/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { FilterContainer } from "../../../shared/filters/components/filter-container";
import "../styles/crianza-search-result.css";
import { CrianzaVigilanciaActivo } from "./crianza-vigilancia-activo";
import { CrianzaVigilanciaPasiva } from "./crianza-vigilancia-pasiva";

export function CrianzaVigilanciaContainer() {
  const { crianzaPredioSelected } = useSelector((state) => state.crianza);

  if (!crianzaPredioSelected) return null;

  return (
    <div>
      <div className="PlaceSearchResults CrianzaVigilanciaContainer">
        <FilterContainer>
          <CrianzaVigilanciaActivo />
        </FilterContainer>
        <FilterContainer>
          <CrianzaVigilanciaPasiva />
        </FilterContainer>
      </div>
    </div>
  );
}
