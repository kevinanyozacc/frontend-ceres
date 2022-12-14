import { Icon } from '@iconify/react'
import './ErrorMessage.css'

const ErrorMessage = ({ message }) => {
  return (
    <div className="ErrorMessage">
      <span className="ErrorMessage__icon">
        <Icon icon="mdi:alert-circle" />
      </span>
      {message
        ? message
        : 'Ocurrió un error completando esta solicitud'
      }
    </div>
  )
}

export default ErrorMessage