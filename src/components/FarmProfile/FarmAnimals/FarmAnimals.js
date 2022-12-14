import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import { getIconByAnimalGender, getIconByAnimalSpecies } from '../../../helpers/animals'
import { formatDate } from '../../../helpers/places'
import { useFarmAnimalsQuery } from '../../../redux/services/farm'
import ErrorMessage from '../../ErrorMessage'
import Loader from '../../Loader'
import './FarmAnimals.css'

const FarmAnimals = () => {

  const { id } = useParams()
  const { data, isLoading, isError } = useFarmAnimalsQuery({ id })
  const navigate = useNavigate()

  if (isLoading) {
    return <Loader query="Obteniendo información de animales..." />
  }

  if (isError) {
    return <ErrorMessage />
  }

  return (
    <div className="FarmAnimals">
      <div className="FarmAnimals__row">
        <div>Código arete</div>
        <div>Especie</div>
        <div>Sexo</div>
        <div>Estado</div>
        <div>Edad</div>
        <div>Última modificación</div>
      </div>
      {data.length === 0
        ? <div className="FarmAnimals__no_animals">No se encontraron animales para este predio</div>
        : data.map((animal, i) => (
            <div
              key={`animal-${i}`}
              className="FarmAnimals__row"
              onClick={() => animal.id && navigate(`/animal/${animal.id}`)}
              title="Ver ficha del animal"
            >
              <div>{animal.cod_arete}</div>
              <div><Icon style={{ fontSize: '1.75rem' }} icon={getIconByAnimalSpecies(animal.animal_specie)} /></div>
              <div><Icon style={{ fontSize: '1.75rem' }} icon={getIconByAnimalGender(animal.gender)} /></div>
              <div>{animal.high_low}</div>
              <div>{animal.age}</div>
              <div>{formatDate(animal.fech_modi)}</div>
            </div>
          ))}
    </div>
  )
}

export default FarmAnimals