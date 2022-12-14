import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BarcodeScannerComponent from 'react-webcam-barcode-scanner'
import './CodeScanner.css'

const CodeScanner = () => {

  const [error, setError] = useState()
  const [lectura, setLectura] = useState('')
  const navigate = useNavigate()

  return (
    <div className="CodeScanner">
      <p className="CodeScanner__instruction">
        Enfoque el código de<br />barras en arete
      </p>
      <div className="CodeScanner__reader_container">
        <BarcodeScannerComponent
          width={'100%'}
          height={300}
          onUpdate={(err, result) => {
            if (result?.getText()) {
              const code = result.getText()
              navigate(`confirmacion/${code}`)
            }
          }}
        />
      </div>
      {error && <p>{error}</p>}
      <p>{lectura}</p>
    </div>
  )
}

export default CodeScanner