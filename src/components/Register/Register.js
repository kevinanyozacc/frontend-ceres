import { Icon } from '@iconify/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/services/auth'
import useFocusInput from '../../hooks/useFocusInput'
import CenteredContainer from '../CenteredContainer'
import './Register.css'
import { setCredentials } from '../../redux/ducks/auth'

const Register = () => {

  const [login, { isLoading, isError }] = useLoginMutation()
  const userInputRef = useFocusInput()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { ref, ...rest } = register('username', { required: true })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async ({ username, password }) => {
    try {
      const token = await login({ email: username, password }).unwrap()
      dispatch(setCredentials({ username, token }))
      navigate('/')
    }
    catch (err) {}
  }

  return (
    <CenteredContainer className="Register__background">
      <div className="Register">
        <div className="Register__container">
          <h2 className="Register__title">Solicitud de registro en la plataforma</h2>
          {isError && (
            <div className="Register__credentials_error_container">
              <Icon className="Register__credentials_error_icon" icon="mdi:alert-octagram" />
              <h3 className="Register__credentials_error_title">Usuario o contraseña incorrectos</h3>
              <p>
                El e-mail o la contraseña que ingresaste son incorrectos.
                Por favor vuelve a intentarlo.
              </p>
            </div>
          )}
          <form
            className="Register__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="Register__form_part">
              <div className="Register__field_container">
                <label
                  htmlFor="Register__id_name"
                  className="Register__field_label"
                >
                  Nombre
                </label>
                <input
                  {...rest}
                  type="text"
                  name="name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  id="Register__id_name"
                  className="Register__input"
                />
                {errors.name && errors.name.type === 'required' && (
                  <span role="alert"><Icon className="Register__icono_error" icon="mdi:alert-octagram" /> El nombre es requerido</span>
                )}
              </div>
              <div className="Register__field_container">
                <label
                  htmlFor="Register__id_surname"
                  className="Register__field_label"
                >
                  Apellido
                </label>
                <input
                  {...rest}
                  type="text"
                  name="surname"
                  aria-invalid={errors.surname ? 'true' : 'false'}
                  id="Register__id_surname"
                  className="Register__input"
                />
                {errors.surname && errors.surname.type === 'required' && (
                  <span role="alert"><Icon className="Register__icono_error" icon="mdi:alert-octagram" /> El apellido es requerido</span>
                )}
              </div>
              <div className="Register__field_container">
                <label
                  htmlFor="Register__id_dni"
                  className="Register__field_label"
                >
                  DNI
                </label>
                <input
                  {...rest}
                  type="text"
                  name="dni"
                  aria-invalid={errors.dni ? 'true' : 'false'}
                  id="Register__id_dni"
                  className="Register__input"
                  ref={e => {
                    ref(e)
                    userInputRef.current = e
                  }}
                />
                {errors.dni && errors.dni.type === 'required' && (
                  <span role="alert"><Icon className="Register__icono_error" icon="mdi:alert-octagram" /> El nombre es requerido</span>
                )}
              </div>
              <div className="Register__field_container">
                <label
                  htmlFor="Register__id_username"
                  className="Register__field_label"
                >
                  Dirección de e-mail
                </label>
                <input
                  {...rest}
                  type="email"
                  name="username"
                  aria-invalid={errors.username ? 'true' : 'false'}
                  id="Register__id_username"
                  className="Register__input"
                />
                {errors.username && errors.username.type === 'required' && (
                  <span role="alert"><Icon className="Register__icono_error" icon="mdi:alert-octagram" /> El e-mail es requerido</span>
                )}
              </div>
            </div>
            <div className="Register__form_part">
              <div className="Register__field_container">
                <label
                  htmlFor="Register__id_password"
                  className="Register__field_label"
                >
                  Contraseña
                </label>
                <input
                  {...register('password', { required: true })}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  type="password"
                  id="Register__id_password"
                  className="Register__input"
                />
                {errors.password && errors.password.type === 'required' && (
                  <span role="alert"><Icon className="Register__icono_error" icon="mdi:alert-octagram" /> La contraseña es requerida</span>
                )}
              </div>
              <div className="Register__field_container">
                <label
                  htmlFor="Register__id_password"
                  className="Register__field_label"
                >
                  Confirma tu contraseña
                </label>
                <input
                  {...register('passwordConfirmation', { required: true })}
                  aria-invalid={errors.passwordConfirmation ? 'true' : 'false'}
                  type="password"
                  id="Register__id_password_confirmation"
                  className="Register__input"
                />
                {errors.password && errors.password.type === 'required' && (
                  <span role="alert"><Icon className="Register__icono_error" icon="mdi:alert-octagram" /> La contraseña es requerida</span>
                )}
              </div>
              <button
                type="submit"
                className="Register__button"
                disabled={isLoading}
              >
                Enviar solicitud
              </button>
            </div>
            {isLoading && <p className="Register__logging_in_message">Enviando solicitud...</p>}
          </form>
        </div>
      </div>
    </CenteredContainer>
  )
}

export default Register