import { useParams } from 'react-router-dom'
import { useExportCertificateQuery } from '../../../redux/services/place'
import Loader from '../../Loader'
import './PlaceExportCertificate.css'
import PlaceExportCertificateRow from './PlaceExportCertificateRow'

const PlaceExportCertificate = () => {

  const { type, id } = useParams()
  const { data, error, isLoading, isError } = useExportCertificateQuery({ id, spanishType: type })

  if (isLoading) {
    return <Loader />
  }

  const noCSTIFound = data?.length === 0 || error?.originalStatus === 404

  if (isError && !noCSTIFound) {
    return 'Error cargando autorizaciones'
  }

  return (
    <div className="PlaceExportCertificate">
      {noCSTIFound
        ? <div className="PlaceExportCertificate__empty_list_message">
            Este establecimiento no cuenta con certificados
          </div>
        : <div>
            <div
              className="PlaceExportCertificate__authorization_row"
            >
              {data[0].properties.map((v, i) => <div key={`header-authorization-${i}`}>{v.property}</div>)}
            </div>
            {data.map((authorization, i) => (
              <PlaceExportCertificateRow
                key={`authorization-${i}`}
                authorization={authorization}
              />
            ))}
          </div>
      }
    </div>
  )
}

export default PlaceExportCertificate