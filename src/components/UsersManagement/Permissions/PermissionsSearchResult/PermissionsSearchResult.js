import { InlineIcon } from '@iconify/react'
import { useMakeUserAdminMutation, useSearchUserQuery } from '../../../../redux/services/auth'
import Loader from '../../../Loader'
import './PermissionsSearchResult.css'

const PermissionsSearchResult = ({ searchTerm, cancel }) => {

  const { data, isLoading, isError } = useSearchUserQuery(searchTerm)
  const [mutate, { isLoading: makingAdmin }] = useMakeUserAdminMutation()

  if (isLoading || makingAdmin) {
    return <Loader />
  }

  if (isError) {
    return 'Usuario no encontrado'
  }

  const submit = () => {
    mutate({ ...data, username: searchTerm })
      .then(cancel)
  }

  return (
    <div className="PermissionsSearchResult">
      <p>Usuario encontrado: {data.name}</p>
      <button onClick={submit}>
        <InlineIcon icon="mdi:check" /> Hacer administrador
      </button>
      <button onClick={cancel}>
        <InlineIcon icon="mdi:cancel" /> Cancelar
      </button>
    </div>
  )
}

export default PermissionsSearchResult