import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import ImageProduccion from "../../assets/images/step-left.png";
import ImageProcessamiento from "../../assets/images/step-right.png";
import { useStatsQuery } from "../../redux/services/stats";
import LandingContainer from "../CenteredContainer";
import "./Landing.css";
import LandingBigNumber from "./LandingBigNumber";
import LandingSelection from "./LandingSelection";

const Landing = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useStatsQuery(null);

  return (
    <div className="Landing">
      <LandingContainer className="Landing__hero">
        <div className="Landing__Section">
          <LandingSelection
            onClick={() => navigate("/produccion-primaria")}
            image={ImageProduccion}
            title="Producción Primaria"
          />
          <LandingSelection
            onClick={() => navigate("/procesamiento-primario")}
            image={ImageProcessamiento}
            title="Procesamiento Primario"
          />
        </div>
      </LandingContainer>
      <LandingContainer>
        {!isLoading ? (
          <div className="Landing__big_numbers">
            <LandingBigNumber
              number={data?.producersCount || 361364}
              unit="Productores registrados integrados."
              iconComponent={<Icon icon="mdi:account-search" />}
            />
            <LandingBigNumber
              number={data?.animalsCount || 241054}
              unit="Animales identificados integrados."
              iconComponent={<Icon icon="mdi:cow" />}
            />
            <LandingBigNumber
              number={data?.companiesCount || 26078}
              unit="Establecimientos agropecuarios del Perú integrados."
              iconComponent={<Icon icon="mdi:earth" />}
            />
          </div>
        ) : null}
      </LandingContainer>
    </div>
  );
};

export default Landing;
