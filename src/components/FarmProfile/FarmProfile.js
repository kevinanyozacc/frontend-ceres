import CenteredContainer from '../CenteredContainer'
import { useParams } from 'react-router-dom'
import './FarmProfile.css'
import Loader from '../Loader'
import { InlineIcon } from '@iconify/react'
import placeImage2 from '../../assets/images/unsplash/places/michael-bourgault-YvvHEQNgMcU-unsplash.jpg'
import placeImage1 from '../../assets/images/unsplash/places/timothy-eberly-XemjjFd_4qE-unsplash.jpg'
import placeImage3 from '../../assets/images/unsplash/places/federico-respini-sYffw0LNr7s-unsplash.jpg'
import cowsImage1 from '../../assets/images/unsplash/cows/annie-spratt-JMjNnQ2xFoY-unsplash.jpg'
import cropsImage1 from '../../assets/images/unsplash/plants/arnaldo-aldana-HfH5yd70ox8-unsplash.jpg'
import chicksImage1 from '../../assets/images/unsplash/poultry/karim-manjra-hQV3s7J6eM4-unsplash.jpg'
import { useFarmAnimalsQuery, useFarmQuery } from '../../redux/services/farm'
import ErrorMessage from '../ErrorMessage'
import FarmAnimals from './FarmAnimals'
import FarmExportCertificates from './FarmExportCertificates'
import FarmOriginProductionCertificates from './FarmOriginProductionCertificates'

const FarmProfile = () => {

  const { id } = useParams()
  const { data, isLoading, isError } = useFarmQuery({ id })
  const { data: animalsData, isLoading: loadingAnimals } = useFarmAnimalsQuery({ id })

  if (isLoading) {
    return <Loader query="Obteniendo información de predio..." />
  }

  if (isError) {
    return <ErrorMessage />
  }

  if (!data) {
    return <ErrorMessage message="Predio no encontrado" />
  }

  const getMainImage = () => {
    switch (data.type) {
      case 'agricultural-supplies': return cowsImage1
      case 'primary-processing'   : return cropsImage1
      case 'slaughterhouse'       : return cowsImage1
      case 'pig-farm'             : return cowsImage1
      case 'poultry-farm'         : return chicksImage1
      case 'livestock-supplies'   : return cowsImage1
      default:
        return placeImage3
    }
  }

  return (
    <CenteredContainer className="FarmProfile__container">
      <div className="FarmProfile__header">
        <div className="FarmProfile__avatar">
          <InlineIcon icon="mdi:barn" /> 
        </div>
        <h1 className="FarmProfile__name">{data.name}</h1>
        <div className="FarmProfile__photos_container">
          <img src={placeImage1} alt="Imagen establecimiento" />
          <img src={placeImage2} alt="Imagen establecimiento" />
          <img src={getMainImage()} alt="Imagen establecimiento" />
        </div>
        <h2 className="FarmProfile__subtitle">{data.displayType} en <span className='FarmProfile__location'>{data.nameDepartamento}, {data.nameProvincia}, {data.nameDistrito}</span></h2>
        <h2 className="FarmProfile__subtitle">Sede: {data.hq}</h2>
      </div>
      <div className="FarmProfile__body">
        <div className="FarmProfile__place_data">
          <div className="FarmProfile__extra_data">
            <h3 className="FarmProfile__section_title">Datos del establecimiento</h3>
            <ul className="FarmProfile__extra_data_list">
              <li>
                <h4>Tipo de producción</h4>
                <p>
                 {data.farm_bpp === "1" && data.farm_bpa === "1" && 'Producción pecuaria - Producción agrícola'}
                 {data.farm_bpp === "1" && data.farm_bpa !== "1" && 'Producción pecuaria'}
                 {data.farm_bpp !== "1" && data.farm_bpa === "1" && 'Producción agrícola'}
                 {data.farm_bpp !== "1" && data.farm_bpa !== "1" && 'Sin información'}
                </p>
              </li>
              <li>
                <h4>Dirección</h4>
                <p>{data.address}</p>
              </li>
              <li>
                <h4>Sede de registro</h4>
                <p>{data.hq}</p>
              </li>
              {data.extraData && Object.keys(data.extraData).map((k, i) => (
                <li key={`extra-data-li-${i}`}>
                  <h4>{k}</h4>
                  <p>{data.extraData[k]}</p>
                </li>
              ))}
            </ul>
          </div>
          {data.contactData && (
            <div className="FarmProfile__contact_data">
              <h3 className="FarmProfile__section_title">Información de contacto</h3>
              <ul className="FarmProfile__extra_data_list">
                {Object.keys(data.contactData).map(k => (
                  <li>
                    <h4>{k}</h4>
                    <p>{data.contactData[k]}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {loadingAnimals 
          ? <Loader />
          : animalsData.length > 0 
          ? (
              <div className="FarmProfile__processes">
                <h3 className="FarmProfile__section_title">Animales</h3>
                <FarmAnimals />
              </div>
            )
          : (
            <div className="FarmProfile__processes">
              <h3 className="FarmProfile__section_title">Certificados de lugar de producción</h3>
              <FarmOriginProductionCertificates />
            </div>
          )
        } 
        <div className="FarmProfile__links">
          <h3 className="FarmProfile__section_title">Certificados de exportación relacionados</h3>
          <FarmExportCertificates />
        </div>
      </div>
    </CenteredContainer>
  )
}

export default FarmProfile