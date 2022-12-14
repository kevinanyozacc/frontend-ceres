import { useParams } from 'react-router-dom'
import { useExportCertificateQuery } from '../../../redux/services/place'
import Loader from '../../Loader'
import './FarmExportCertificates.css'
import FarmExportCertificatesRow from './FarmExportCertificatesRow/FarmExportCertificatesRow'

const FarmExportCertificates = () => {

  const { id } = useParams()
  const { data, error, isLoading, isError } = useExportCertificateQuery({ id, spanishType: 'predio'})

  if (isLoading) {
    return <Loader />
  }
  
  const noCSTIFound = data?.length === 0 || error?.originalStatus === 404

  if (isError && !noCSTIFound) {
    return 'Error cargando certificados'
  }

  return (
    <div className="FarmExportCertificates">
      {noCSTIFound
        ? <div className="FarmExportCertificates__empty_list_message">
            Este establecimiento no cuenta con certificados de exportación que lo relacionen
          </div>
        : <div>
          <div
            className="FarmExportCertificates__authorization_row"
          >
            {data[0].properties.map((v, i) => <div key={`header-authorization-${i}`}>{v.property}</div>)}
          </div>
          {data.map((authorization, i) => (
            <FarmExportCertificatesRow
              key={`authorization-${i}`}
              authorization={authorization}
            />
          ))}
        </div>
      }
    </div>
  )
}

export default FarmExportCertificates