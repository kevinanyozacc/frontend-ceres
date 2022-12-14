import { Icon, InlineIcon } from '@iconify/react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { getIconByAnimalGender, getIconByAnimalSpecies } from '../../../../../helpers/animals'
import './AnimalSearchResultCard.css'

const AnimalSearchResultCard = ({ data }) => {

  const navigate = useNavigate()

  return (
    <div
      className="AnimalSearchResultCard"
      onClick={() => navigate(`/animal/${data.id}`)}
      title={data.code}
    >
      <Icon
        className="AnimalSearchResultCard__icon"
        icon={getIconByAnimalSpecies(data.species)}
      />
      <Icon
        className={classNames({
          "AnimalSearchResultCard__gender_icon": true,
          "AnimalSearchResultCard__gender_icon--male": data.gender === 'M',
          "AnimalSearchResultCard__gender_icon--female": data.gender === 'H'
        })}
        icon={getIconByAnimalGender(data.gender)}
      />
      <h4 className="AnimalSearchResultCard__title"><InlineIcon icon="mdi:barcode" /> {data.code}</h4>
      <p className="AnimalSearchResultCard__location"><InlineIcon icon="mdi:farm" /> Origen: {data.nameDepartamento}, {data.nameProvincia}, {data.nameDistrito}</p>
      <p className="AnimalSearchResultCard__subtitle">Estado: {data.highLow ?? 'Sin especificar'} • Cód. Origen: {data.originCode ?? 'Sin especificar'}</p>
    </div>
  )
}

export default AnimalSearchResultCard