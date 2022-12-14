import { Icon } from '@iconify/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/services/auth'
import useFocusInput from '../../hooks/useFocusInput'
import CenteredContainer from '../CenteredContainer'
import './Login.css'
import { setCredentials } from '../../redux/ducks/auth'

const Login = () => {

  const [login, { isLoading, isError }] = useLoginMutation()
  const userInputRef = useFocusInput()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { ref, ...rest } = register('username', { required: true })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async ({ username, password }) => {
    try {
      const token = await login({ user: username, password }).unwrap()
      dispatch(setCredentials({ username, token }))
      navigate('/')
    }
    catch (err) {}
  }

  return (
    <CenteredContainer className="Login__background">
      <div className="Login">
        <div className="Login__container">
          <h2 className="Login__title">Inicio de sesión en la plataforma</h2>
          {isError && (
            <div className="Login__credentials_error_container">
              <Icon className="Login__credentials_error_icon" icon="mdi:alert-octagram" />
              <h3 className="Login__credentials_error_title">Usuario o contraseña incorrectos</h3>
              <p>
                El e-mail o la contraseña que ingresaste son incorrectos.
                Por favor vuelve a intentarlo.
              </p>
            </div>
          )}
          <form
            className="Login__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="Login__field_container">
              <label
                htmlFor="Login__id_username"
                className="Login__field_label"
              >
                Nombre de usuario
              </label>
              <input
                {...rest}
                type="text"
                name="username"
                aria-invalid={errors.username ? 'true' : 'false'}
                id="Login__id_username"
                className="Login__input"
                ref={e => {
                  ref(e)
                  userInputRef.current = e
                }}
              />
              {errors.username && errors.username.type === 'required' && (
                <span role="alert"><Icon className="Login__icono_error" icon="mdi:alert-octagram" /> El e-mail es requerido</span>
              )}
            </div>
            <div className="Login__field_container">
              <label
                htmlFor="Login__id_password"
                className="Login__field_label"
              >
                Contraseña
              </label>
              <input
                {...register('password', { required: true })}
                aria-invalid={errors.password ? 'true' : 'false'}
                type="password"
                id="Login__id_password"
                className="Login__input"
                autoComplete="current-password"
              />
              {errors.password && errors.password.type === 'required' && (
                <span role="alert"><Icon className="Login__icono_error" icon="mdi:alert-octagram" /> La contraseña es requerida</span>
              )}
            </div>
            <button
              type="submit"
              className="Login__button"
              disabled={isLoading}
            >
              Iniciar sesión
            </button>
            {isLoading && <p className="Login__logging_in_message">Iniciando sesión...</p>}
          </form>
          <p className="Login__register_text">
            ¿Aún no tienes cuenta?
          </p>
          <button
            className="Login__button"
            onClick={() => navigate('/registro')}
          >
            Solicitud de registro
          </button>
        </div>
      </div>
    </CenteredContainer>
  )
}

export default Login