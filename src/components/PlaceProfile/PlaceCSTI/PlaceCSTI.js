import classNames from 'classnames'
import { useNavigate, useParams } from 'react-router-dom'
import { useCstiQuery } from '../../../redux/services/place'
import Loader from '../../Loader'
import './PlaceCSTI.css'

const PlaceCSTI = () => {

  const { type, id } = useParams()
  const { data, error, isLoading, isError } = useCstiQuery({ id, spanishType: type })
  const navigate = useNavigate()

  if (isLoading) {
    return <Loader />
  }

  const noCSTIFound = data?.length === 0 || error?.originalStatus === 404

  if (isError && !noCSTIFound) {
    return 'Error cargando CSTI'
  }

  return (
    <div className="PlaceCSTI">
      {noCSTIFound
        ? <div className="PlaceCSTI__empty_list_message">
            No se encuentran procedimientos del SENASA que vinculen a este establecimiento con otros actores de la cadena pecuaria
          </div>
        : <div>
            <div
              className="PlaceCSTI__csti_row"
            >
              {data[0].properties.map((v, i) => <div key={`header-csti-${i}`}>{v.property}</div>)}
            </div>
            {data.map((csti, i) => (
              <div
                key={`csti-${i}`}
                className={classNames({
                  "PlaceCSTI__csti_row": true,
                  "PlaceCSTI__csti_row--link": csti.link
                })}
                onClick={() => csti.link && navigate(`/predio/${csti.link}`)}
              >
                {csti.properties.map((v, j) => <div key={`csti-${i}-${j}`}>{v.value}</div>)}
              </div>
            ))}
          </div>
      }
    </div>
  )
}

export default PlaceCSTI