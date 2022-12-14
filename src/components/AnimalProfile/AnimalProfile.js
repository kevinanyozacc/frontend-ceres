import CenteredContainer from '../CenteredContainer'
import { Link, useParams } from 'react-router-dom'
import './AnimalProfile.css'
import Loader from '../Loader'
import { InlineIcon } from '@iconify/react'
import placeImage2 from '../../assets/images/unsplash/places/michael-bourgault-YvvHEQNgMcU-unsplash.jpg'
import placeImage1 from '../../assets/images/unsplash/places/timothy-eberly-XemjjFd_4qE-unsplash.jpg'
import placeImage3 from '../../assets/images/unsplash/places/federico-respini-sYffw0LNr7s-unsplash.jpg'
import cowsImage1 from '../../assets/images/unsplash/cows/annie-spratt-JMjNnQ2xFoY-unsplash.jpg'
import cropsImage1 from '../../assets/images/unsplash/plants/arnaldo-aldana-HfH5yd70ox8-unsplash.jpg'
import chicksImage1 from '../../assets/images/unsplash/poultry/karim-manjra-hQV3s7J6eM4-unsplash.jpg'
import { useAnimalQuery } from '../../redux/services/animal'
import { getAnimalGender, getIconByAnimalSpecies } from '../../helpers/animals'
import AnimalMap from './AnimalMap'
import AnimalHistory from './AnimalHistory'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { hideNewScanForm } from '../../redux/ducks/codes'
import NewEventModal from './NewEventModal'

const AnimalProfile = () => {

  const { id } = useParams()
  const [newEventActive, setNewEventActive] = useState(false)
  const { data, isLoading, refetch } = useAnimalQuery({ id })
  const { scanFormAvailable } = useSelector(state => state.codes)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => dispatch(hideNewScanForm())
  }, [dispatch])

  if (isLoading) {
    return <Loader query="Obteniendo información de animal..." />
  }

  if (!data) {
    return (
      <div className="AnimalProfile__error_animal_not_found">
        Animal no encontrado
        <div className="AnimalProfile__error_animal_not_found__subtitle">
            El código de animal búscado no se encuentra en los registros. Puede buscar nuevamente o reportar el problema en la oficina más cercana. 
        </div>
        <Link
          to='/leer-codigo'
          className="AnimalProfile__read_again_link"
        >
          <InlineIcon icon="mdi:barcode-scan" />
          Leer otro código
        </Link>
      </div>
    )
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
    <>
      {newEventActive && (
        <NewEventModal
          hide={() => setNewEventActive(false)}
          code={data.code}
          refetchAnimal={refetch}
        />
      )}
      <CenteredContainer className="AnimalProfile__container">
        <div className="AnimalProfile__header">
          <div className="AnimalProfile__avatar">
            <InlineIcon icon={getIconByAnimalSpecies(data.species)} /> 
          </div>
          <h1 className="AnimalProfile__name"><InlineIcon icon="mdi:barcode" /> {data.code}</h1>
          <div className="AnimalProfile__photos_container">
            <img src={placeImage1} alt="Imagen establecimiento" />
            <img src={placeImage2} alt="Imagen establecimiento" />
            <img src={getMainImage()} alt="Imagen establecimiento" />
          </div>
          <h2 className="AnimalProfile__subtitle">Origen: <span className='AnimalProfile__location'>{data.nameDepartamento}, {data.nameProvincia}, {data.nameDistrito}</span></h2>
          <h2 className="AnimalProfile__subtitle">{getAnimalGender(data.gender)} • Estado: {data.highLow ?? 'Sin especificar'} • Edad aproximada: {data.age} meses</h2>
        </div>
        <div className="AnimalProfile__body">
          <div className="AnimalProfile__place_data AnimalProfile__place_data--2">
            <div className="AnimalProfile__extra_data">
              <h3 className="AnimalProfile__section_title">Datos del animal</h3>
              <ul className="AnimalProfile__extra_data_list">
                <li>
                  <h4>Especie</h4>
                  <p>{data.species}</p>
                </li>
                <li>
                  <h4>Sexo</h4>
                  <p>{data.gender}</p>
                </li>
                <li>
                  <h4>Edad aproximada</h4>
                  <p>{data.age}</p>
                </li>
                <li>
                  <h4>Estado</h4>
                  <p>{data.highLow}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="AnimalProfile__place_data">
            <h3 className="AnimalProfile__section_title">Historial del animal</h3>
            <AnimalHistory />
            {scanFormAvailable && (
              <button
                className="AnimalProfile__event_button"
                onClick={() => setNewEventActive(true)}
              >
                <InlineIcon icon="mdi:place-outline" /> Agregar evento en ubicación actual
              </button>
            )}
          </div>
          <div className="AnimalProfile__map_container">
            <h3 className="AnimalProfile__section_title">Mapa de trazabilidad</h3>
            <AnimalMap />
            {/* <div className="AnimalProfile__empty_list_message">
              No hay información de trazabilidad para este animal
            </div> */}
          </div>
        </div>
      </CenteredContainer>
    </>
  )
}

export default AnimalProfile