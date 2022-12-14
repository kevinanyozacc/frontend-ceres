import { Icon } from '@iconify/react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { Link, useLocation } from 'react-router-dom'
import CenteredContainer from '../CenteredContainer'
import './BreadCrumb.css'
import { usePlaceQuery } from '../../redux/services/place'
import { useSelector } from 'react-redux'
import { useAnimalQuery } from '../../redux/services/animal'
import { useFarmQuery } from '../../redux/services/farm'

const PlaceBreadcrumb = ({ match }) => {

  const { id, type } = match.params
  const { data, isLoading } = usePlaceQuery({ id, spanishType: type })

  if (isLoading) {
    return null
  }

  return (
    <CenteredContainer className="BreadCrumb__container">
      <div className="BreadCrumb">
        <Link to="/">Inicio</Link>
        <Icon icon="mdi:chevron-double-right" className="BreadCrumb__separator" />
        <Link to="/">Establecimientos</Link>
        <Icon icon="mdi:chevron-double-right" className="BreadCrumb__separator" />
        <span className="BreadCrumb__name">{data?.name || 'No encontrado'}</span>
      </div>
    </CenteredContainer>
  )
}

const AnimalBreadcrumb = ({ match }) => {

  const { id, type } = match.params
  const { data, isLoading } = useAnimalQuery({ id, spanishType: type })

  if (isLoading || !data) {
    return null
  }

  return (
    <CenteredContainer className="BreadCrumb__container">
      <div className="BreadCrumb">
        <Link to="/">Inicio</Link>
        <Icon icon="mdi:chevron-double-right" className="BreadCrumb__separator" />
        <Link to="/">Animal</Link>
        <Icon icon="mdi:chevron-double-right" className="BreadCrumb__separator" />
        <span className="BreadCrumb__name">{data?.code || 'No encontrado'}</span>
      </div>
    </CenteredContainer>
  )
}

const FarmBreadcrumb = ({ match }) => {

  const { id, type } = match.params
  const { data, isLoading } = useFarmQuery({ id, spanishType: type })

  if (isLoading) {
    return null
  }

  return (
    <CenteredContainer className="BreadCrumb__container">
      <div className="BreadCrumb">
        <Link to="/">Inicio</Link>
        <Icon icon="mdi:chevron-double-right" className="BreadCrumb__separator" />
        <Link to="/">Predio</Link>
        <Icon icon="mdi:chevron-double-right" className="BreadCrumb__separator" />
        <span className="BreadCrumb__name">{data?.name || 'No encontrado'}</span>
      </div>
    </CenteredContainer>
  )
}

const SearchBreadcrumb = ({ match }) => {

  const { searchTerm } = useSelector(state => state.search)
  const location = useLocation()

  return (
    <CenteredContainer className="BreadCrumb__container">
      <div className="BreadCrumb">
        <Link to="/">Inicio</Link>
        <Icon icon="mdi:chevron-double-right" className="BreadCrumb__separator" />
        <Link to={`${location.pathname}?q=${searchTerm}`}>Búsqueda</Link>
        {match.params.type && (
          <>
            <Icon icon="mdi:chevron-double-right" className="BreadCrumb__separator" />
            Ficha establecimiento
          </>
        )}
      </div>
    </CenteredContainer>
  )
}

const routes = [
  { path: '/busqueda', breadcrumb: SearchBreadcrumb },
  { path: '/establecimiento/:type/:id', breadcrumb: PlaceBreadcrumb },
  { path: '/animal/:id', breadcrumb: AnimalBreadcrumb },
  { path: '/predio/:id', breadcrumb: FarmBreadcrumb },
]

const BreadCrumb = () => {
  const breadcrumbs = useBreadcrumbs(routes, { disableDefaults: true })
  return breadcrumbs.map(({ breadcrumb }) => breadcrumb)
}

export default BreadCrumb