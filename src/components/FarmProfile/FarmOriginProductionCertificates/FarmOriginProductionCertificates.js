import { useParams } from 'react-router-dom'
import { useExportOriginCertificateQuery } from '../../../redux/services/place'
import Loader from '../../Loader'
import './FarmOriginProductionCertificates.css'
import FarmOriginProductionCertificatesRow from './FarmOriginProductionCertificatesRow/FarmOriginProductionCertificatesRow'

const FarmOriginProductionCertificates = () => {

  const { id } = useParams()
  const { data, error, isLoading, isError } = useExportOriginCertificateQuery({ id })

  if (isLoading) {
    return <Loader />
  }
  
  const noCSTIFound = data?.length === 0 || error?.originalStatus === 404

  if (isError && !noCSTIFound) {
    return 'Error cargando certificados'
  }

  return (
    <div className="FarmOriginProductionCertificates">
      {noCSTIFound
        ? <div className="FarmOriginProductionCertificates__empty_list_message">
            Este establecimiento no cuenta con certificados asociados
          </div>
        : <div>
          <div
            className="FarmOriginProductionCertificates__authorization_row"
          >
            {data[0].properties.map((v, i) => <div key={`header-op-authorization-${i}`}>{v.property}</div>)}
          </div>
          {data.map((authorization, i) => (
            <FarmOriginProductionCertificatesRow
              key={`authorization-${i}`}
              authorization={authorization}
            />
          ))}
        </div>
      }
    </div>
  )
}

export default FarmOriginProductionCertificates