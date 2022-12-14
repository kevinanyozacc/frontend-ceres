import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { showNewScanForm } from '../../../redux/ducks/codes'
import { useEarringQuery } from '../../../redux/services/animal'
import Loader from '../../Loader'
import './CodeConfirmation.css'

const CodeConfirmation = () => {

  const { code } = useParams()
  const { data } = useEarringQuery({ code })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (data !== undefined) {
    if (data !== null) {
      dispatch(showNewScanForm())
      navigate(`/animal/${data}`)
    }
    else {
      navigate('/animal/no-encontrado')
    }
    return null
  }

  return (
    <div className="CodeConfirmation">
      <Loader query="Buscando código..." />
    </div>
  )
}

export default CodeConfirmation