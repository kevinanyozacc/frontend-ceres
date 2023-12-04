import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import ImageProcessamiento from "../../assets/images/PROCESAMIENTO_PRIMARIO_2.jpg";
import ImageProduccion from "../../assets/images/PRODUCCION_PRIMARIA_2.jpg";
import ImageTransporte from "../../assets/images/TRANSPORTE_2.jpg";
import ImageComercio from "../../assets/images/COMERCIO_2.jpg";
import { useStatsQuery } from "../../redux/services/stats";
import LandingContainer from "../CenteredContainer";
import "./Landing.css";
import LandingBigNumber from "./LandingBigNumber";
import LandingSelection from "./LandingSelection";
import Modal from "../Modal/Modal";
import { useState } from 'react'

const Landing = () => {
  const navigate = useNavigate();
  const { data } = useStatsQuery(null);
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
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
           <LandingSelection
            onClick={() => setIsOpen(true)}
            image={ImageTransporte}
            title="Transporte"
          />
          <LandingSelection
            onClick={() => setIsOpen(true)}
            image={ImageComercio}
            title="Comercio"
          />
        </div>
      </LandingContainer>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      <LandingContainer>
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
      </LandingContainer>
    </div>
  );
};

export default Landing;
