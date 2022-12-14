import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAnimalQuery } from '../../../redux/services/animal'
import Loader from '../../Loader'
import './AnimalHistory.css'

const AnimalHistory = () => {
  
  const { id } = useParams()
  const { data, isLoading, isFetching } = useAnimalQuery({ id })
  const navigate = useNavigate()
  
  if (isLoading || isFetching) {
    return <Loader query="Cargando historial..." />
  }

  return (
    <div className="AnimalHistory">
      {data.events.map((event, i) => (
        <div
          key={`animal-history-${i}`}
          className="AnimalHistory__row"
          onClick={() => event.link && navigate(event.link)}
          title={event.link ? 'Ver ficha de establecimiento' : ''}
        >
          <div className="AnimalHistory__event_id">E{data.events.length - i}</div>
          <div className="AnimalHistory__event_label">{event.type === 'code' && <Icon icon="mdi:barcode" />} {event.label}</div>
          <div className="AnimalHistory__event_date">{format(parseISO(event.dateISO), 'dd/MM/yy \'a las\' HH:mm', { locale: es })}</div>
        </div>
      ))}
    </div>
  )
}
export default AnimalHistory