import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { createElementHook, createPathHook, createContainerComponent } from '@react-leaflet/core'
import { useParams } from 'react-router-dom'
import { useAnimalQuery } from '../../../redux/services/animal'
import L from 'leaflet'
import './AnimalMap.css'
import { format, parseISO } from 'date-fns'
import { antPath } from 'leaflet-ant-path'

function createAntPath(props, context) {
  const instance = antPath(props.positions, props.options)
  return { instance, context: { ...context, overlayContainer: instance } }
}

function updateAntPath(instance, props, prevProps) {
  if (props.positions !== prevProps.positions || props.options !== prevProps.options) {
      instance.setLatLngs(props.positions)
  }
}

const useAntPathElement = createElementHook(createAntPath, updateAntPath)
const useAntPath = createPathHook(useAntPathElement)
const AntPath = createContainerComponent(useAntPath)

const AnimalMap = () => {

  const { id } = useParams()
  const { data } = useAnimalQuery({ id })
  
  return (
    <div className="AnimalMap">
      <MapContainer
        center={[data.originLat, data.originLng]}
        zoom={10}
        style={{ height: '100%', width: 'auto' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AntPath positions={data.events.map(({ lat, lng }) => ({ lat, lng })).reverse()} />
        {[...data.events].reverse().map((event, i) => (
          <Marker
            position={[event.lat, event.lng]}
            icon={new L.divIcon({
              className: "AnimalMap__marker",
              html: `<div><span class='AnimalMap__marker_event_index'>E${i + 1}</span>${format(parseISO(event.dateISO), 'dd/MM/yy')}</div>`,
            })}
            key={`marker-event-${i}`}
          >
            <Popup>
              {event.label}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default AnimalMap