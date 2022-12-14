import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceFilter } from '../../../../redux/ducks/search'
import { useSearchForProviderQuery } from '../../../../redux/services/search'
import './PlaceSearchResultsMap.css'

const PlaceSearchResultsMap = () => {

  const { searchTerm } = useSelector(state => state.search)
  const { data, error, isLoading, isFetching } = useSearchForProviderQuery(searchTerm)
  const dispatch = useDispatch()

  if (isLoading || isFetching) return <div />
  if (error) return <div>Error</div>

  return (
    <div className="PlaceSearchResultsMap">
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
          {data.departamentos.map((departamento, i) => {
            return (
              <MarkerClusterGroup
                spiderfyOnMaxZoom={false}
                zoomToBoundsOnClick={false}
                onClick={() => dispatch(setPlaceFilter(departamento.name))}
                key={`marker-cluster-${i}`}
              >
                {[...Array(departamento.count)].map((_, j) => (
                  <Marker
                    key={`marker-${i}-${j}`}
                    position={departamento.position}
                    eventHandlers={{click: () => dispatch(setPlaceFilter(departamento.name))}}
                  />
                ))}
              </MarkerClusterGroup>
            )
          })}
      </MapContainer>
    </div>
  )
}

export default PlaceSearchResultsMap