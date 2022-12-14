import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceFilter } from '../../../../redux/ducks/search'
import { useSearchForFarmQuery } from '../../../../redux/services/search'
import './FarmSearchResultsMap.css'

const FarmSearchResultsMap = () => {

  const { searchTerm } = useSelector(state => state.search)
  const { data, error, isLoading, isFetching } = useSearchForFarmQuery(searchTerm)
  const dispatch = useDispatch()

  if (isLoading || isFetching) return <div />
  if (error) return <div>Error</div>

  return (
    <div className="FarmSearchResultsMap">
      <MapContainer
        center={[-9.52264, -76.96734]}
        zoom={4.5}
        style={{ height: '100%', width: 'auto' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {data.farms.map(({ lat, lng }, i) => {
            if (lat && lng) {
              return (
                <Marker
                  key={`marker-${i}`}
                  position={[lat, lng]}
                />
              )
            }
          })}
      </MapContainer>
    </div>
  )
}

export default FarmSearchResultsMap