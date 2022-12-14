import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAddEventMutation } from '../../../redux/services/animal'
import './NewEventModal.css'

const NewEventModal = ({ hide, code, refetchAnimal }) => {

  const [geoPosition, setGeoPosition] = useState()
  const [mutate, { isLoading: addingEvent }] = useAddEventMutation()
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setGeoPosition(pos)
    })
  }, [])

  const submit = async data => {
    const allData = {
      ...data,
      earring_id: code,
      lat: geoPosition?.coords.latitude,
      long: geoPosition?.coords.longitude,
      cod_company: '1',
      type_company: '2',
      hq: '3',
      user_id: '',
      user_name: ''
    }
    mutate(allData)
      .then(() => {
        refetchAnimal()
        hide()
      })
  }

  return (
    <div
      className="NewEventModal"
      onClick={hide}
    >
      <form
        className="NewEventModal__content"
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit(submit)}
      >
        <h2 className="NewEventModal__title">Confirme datos para nuevo evento</h2>
        <div className="NewEventModal__field">
          Posición: <br />
          <div><Icon icon="mdi:place" /> <span>{geoPosition?.coords.latitude}</span>, <span>{geoPosition?.coords.longitude}</span></div>
        </div>
        <div className="NewEventModal__field">
          <label>Comentario</label>
          <input
            {...register('comment')}
            className="NewEventModal__input"
          />
        </div>
        <button
          className="NewEventModal__send_button"
          disabled={!geoPosition || addingEvent}
        >
          Agregar evento
        </button>
      </form>
    </div>
  )
}

export default NewEventModal