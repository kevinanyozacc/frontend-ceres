import { Icon } from '@iconify/react'
import { useState } from 'react'
import './FarmOriginProductionCertificatesRow.css'

const FarmOriginProductionCertificatesRow = ({ authorization }) => {

  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <div
        className="FarmOriginProductionCertificatesRow FarmOriginProductionCertificatesRow--data"
        onClick={() => setExpanded(!expanded)}
      >
        {authorization.properties.map((v, j) => (
          <div key={`plant_link-${j}`}>
            { v.value }
          </div>
        ))}
      </div>
      {expanded && authorization.products.map((p, i) => (
        <div
          className="FarmOriginProductionCertificatesRow__product"
          key={`product-${i}`}
        >
          <div>Producto {i + 1}: </div>
          <div>{p.name}</div>
          <div className="FarmOriginProductionCertificatesRow__scientific_name">{p.scientific_name}</div>
        </div>
      ))}
    </>
  )
}

export default FarmOriginProductionCertificatesRow