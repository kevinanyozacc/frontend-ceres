import { useParams } from 'react-router-dom'
import { useAuthorizationsQuery } from '../../../redux/services/place'
import Loader from '../../Loader'
import './PlaceAuthorizations.css'

const PlaceAuthorizations = () => {

  const { type, id } = useParams()
  const { data, error, isLoading, isError } = useAuthorizationsQuery({ id, spanishType: type })

  if (isLoading) {
    return <Loader />
  }

  const noCSTIFound = data?.length === 0 || error?.originalStatus === 404

  if (isError && !noCSTIFound) {
    return 'Error cargando autorizaciones'
  }

  return (
    <div className="PlaceAuthorizations">
      {noCSTIFound
        ? <div className="PlaceAuthorizations__empty_list_message">
            Este establecimiento no cuenta con autorización
          </div>
        : <div>
          <div
            className="PlaceAuthorizations__authorization_row"
          >
            {data[0].map((v, i) => <div key={`header-authorization-${i}`}>{v.property}</div>)}
          </div>
          {data.map((authorization, i) => (
            <div
              key={`authorization-${i}`}
              className="PlaceAuthorizations__authorization_row"
            >
              {authorization.map((v, j) => <div key={`authorization-${i}-${j}`}>{v.value}</div>)}
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default PlaceAuthorizations