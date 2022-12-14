import './Landing.css'
import heroFigure from '../../assets/images/hero_figure_new.svg'
import LandingSearchBox from './LandingSearchBox'
import LandingContainer from '../CenteredContainer'
import LandingBigNumber from './LandingBigNumber'
import { Icon } from '@iconify/react'
import { useStatsQuery } from '../../redux/services/stats'

const Landing = () => {

  const { data, isLoading, error } = useStatsQuery(null)

  return (
    <div className="Landing">
      <LandingContainer className="Landing__hero">
        <LandingSearchBox />
        <img
          className="Landing__figure"
          src={heroFigure}
          alt="hero figure"
        />
      </LandingContainer>
      <LandingContainer>
        <div className="Landing__big_numbers">
          <LandingBigNumber
            number={isLoading || error
              ? (361364).toLocaleString('de-DE')
              : data.producersCount.toLocaleString('de-DE')
            }
            unit="Productores registrados integrados."
            iconComponent={<Icon icon="mdi:account-search" />}
          />
          <LandingBigNumber
            number={isLoading || error
              ? (241054).toLocaleString('de-DE')
              : data.animalsCount.toLocaleString('de-DE')
            }
            unit="Animales identificados integrados."
            iconComponent={<Icon icon="mdi:cow" />}
          />
          <LandingBigNumber
            number={isLoading || error
              ? (26078).toLocaleString('de-DE')
              : data.companiesCount.toLocaleString('de-DE')
            }
            unit="Establecimientos agropecuarios del Perú integrados."
            iconComponent={<Icon icon="mdi:earth" />}
          />
        </div>
      </LandingContainer>
    </div>
  )
}

export default Landing