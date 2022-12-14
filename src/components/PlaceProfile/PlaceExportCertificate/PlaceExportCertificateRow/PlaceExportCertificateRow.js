import { Icon } from '@iconify/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './PlaceExportCertificateRow.css'

const PlaceExportCertificateRow = ({ authorization }) => {

  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <div
        className="PlaceExportCertificate__authorization_row PlaceExportCertificate__authorization_row--data"
        onClick={() => setExpanded(!expanded)}
      >
        {authorization.properties.map((v, j) => (
          <div key={`authorization-${j}`}>
            {v.property === 'Planta'
              ? <Link
                  to={`/establecimiento/planta-exportacion/${authorization.link_plant}`}
                  className="PlaceExportCertificate__plant_link"
                >
                  <Icon icon="mdi:link" /> {v.value}
                </Link>
              : v.value
            }
          </div>
        ))}
      </div>
      {expanded && authorization.products.map((p, i) => (
        <div
          className="PlaceExportCertificateRow__product"
          key={`product-${i}`}
        >
          <div>Producto {i + 1}: </div>
          <div>{p.name}</div>
          <div className="PlaceExportCertificateRow__scientific_name">{p.scientific_name}</div>
          <div>
            <Link
              className="PlaceExportCertificateRow__farm_link"
              to={`/predio/${p.farm_id}`}
            >
              <Icon icon="mdi:link" /> Predio {p.farm_id}
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}

export default PlaceExportCertificateRow