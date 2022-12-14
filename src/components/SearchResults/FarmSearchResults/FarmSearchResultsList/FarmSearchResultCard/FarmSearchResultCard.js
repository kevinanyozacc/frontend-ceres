import { Icon, InlineIcon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { getIconByPlaceType } from '../../../../../helpers/places'
import './FarmSearchResultCard.css'

const FarmSearchResultCard = ({ data }) => {

  const navigate = useNavigate()

  return (
    <div
      className="FarmSearchResultCard"
      onClick={() => navigate(`/predio/${data.id}`)}
      title={data.spanishType}
    >
      <Icon
        className="FarmSearchResultCard__icon"
        icon={getIconByPlaceType(data.type)}
      />
      <h4 className="FarmSearchResultCard__title">{data.name?.toLowerCase()}</h4>
      <p className="FarmSearchResultCard__location"><InlineIcon icon="mdi:place" /> {data.nameDistrito}, {data.nameProvincia}, {data.nameDepartamento}</p>
      <p className="FarmSearchResultCard__subtitle">Responsable: {data.farmerName} • DNI: {data.farmerDNI}</p>
    </div>
  )
}

export default FarmSearchResultCard