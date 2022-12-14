import { useMemo } from 'react'
import { useSearchForProviderQuery } from '../../../../redux/services/search'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceFilter, addTypeFilter, clearTypesFilter, removeTypeFilter, setYearFilter, setHQFilter } from '../../../../redux/ducks/search'
import Select from 'react-select'
import './PlaceSearchResultsFilters.css'
import { isEmpty } from 'lodash'
import { formatPlaceType, getIconByPlaceType } from '../../../../helpers/places'
import { InlineIcon } from '@iconify/react'

const PlaceSearchResultsFilters = () => {

  const { searchTerm, placeFilter, hqFilter, yearFilter, typesFilters } = useSelector(state => state.search)
  const { data, error, isLoading, isFetching } = useSearchForProviderQuery(searchTerm)
  const dispatch = useDispatch()

  const departamentosOptions = useMemo(() => (
    data
      ? [
          { label: `Todos (${data.departamentos.reduce((acc, d) => acc + d.count, 0)})` },
          ...data.departamentos.map(d => ({ value: d.name, label: `${d.name.toUpperCase()} (${d.count})` }))
        ]
      : []
  ), [data, searchTerm])

  const hqsOptions = useMemo(() => (
    data
      ? [
          { label: `Todos (${data.hqs.reduce((acc, d) => acc + d.count, 0)})` },
          ...data.hqs.map(d => ({ value: d.name, label: `${d.name} (${d.count})` }))
        ]
      : []
  ), [data, searchTerm])

  const yearsOptions = useMemo(() => (
    data
      ? [
          { label: `Todos (${data.years.reduce((acc, d) => acc + d.count, 0)})` },
          ...data.years.map(d => ({ value: d.name, label: `${d.name} (${d.count})` }))
        ]
      : []
  ), [data, searchTerm])

  const typesCheckBoxesData = useMemo(() => (
    data
      ? [
          { value: 'all', label: `Todos (${data.types.reduce((acc, d) => acc + d.count, 0)})` },
          ...data.types.map(t => ({ value: t.name, label: `${formatPlaceType(t.name)} (${t.count})` }))
        ]
      : []
  ), [data, searchTerm])

  if (isLoading || isFetching) return <div />
  if (error) return <div>Error</div>

  return (
    <div className="PlaceSearchResultsFilters">
      <div className="PlaceSearchResultsFilters__filters_container">
        <h3 className="PlaceSearchResultsFilters__title">Filtros avanzados</h3>
        <div className="PlaceSearchResultsFilters__field_container">
          <label htmlFor="advanced-filters-place-select">Sede</label>
          <Select
            id="advanced-filters-hq-select"
            value={hqsOptions.find(v => v.value === hqFilter)}
            onChange={v => dispatch(setHQFilter(v.value))}
            options={hqsOptions}
            placeholder={hqsOptions[0].label}
          />
        </div>
        <div className="PlaceSearchResultsFilters__field_container">
          <label htmlFor="advanced-filters-place-select">Departamento</label>
          <Select
            id="advanced-filters-place-select"
            value={departamentosOptions.find(v => v.value === placeFilter)}
            onChange={v => dispatch(setPlaceFilter(v.value))}
            options={departamentosOptions}
            placeholder={departamentosOptions[0].label}
          />
        </div>
        <div className="PlaceSearchResultsFilters__field_container">
          <label htmlFor="advanced-filters-place-select">Año</label>
          <Select
            id="advanced-filters-year-select"
            value={yearsOptions.find(v => v.value === yearFilter)}
            onChange={v => dispatch(setYearFilter(v.value))}
            options={yearsOptions}
            placeholder={yearsOptions[0].label}
          />
        </div>
        <div className="PlaceSearchResultsFilters__field_container">
          <label>Tipo de establecimiento</label>
          {typesCheckBoxesData.map(t => (
            <label
              key={`type-checkbox-container-${t.value}`}
              className="PlaceSearchResultsFilters__checkbox_container"
            >
              <input
                type="checkbox"
                checked={typesFilters.includes(t.value) || (isEmpty(typesFilters) && t.value === 'all')}
                onChange={() => {
                  if (t.value === 'all') {
                    dispatch(clearTypesFilter())
                  }
                  else {
                    if (!typesFilters.includes(t.value)) {
                      dispatch(addTypeFilter(t.value))
                    }
                    else {
                      dispatch(removeTypeFilter(t.value))
                    }
                  }
                }}
              /> {!t.label.startsWith('Todos') && <InlineIcon className="PlaceSearchResultsFilters__checkbox_icon" icon={getIconByPlaceType(t.value)} />} {t.label}
            </label>
          ))}
        </div>
        {/* {data.departamentos.map((departamento, i) => (
          <button
            key={`place-filter-${i}`}
            className="PlaceSearchResultsFilters__place_filter"
            onClick={() => dispatch(addPlaceFilter(departamento.name))}
          >
            <span className="PlaceSearchResultsFilters__place_filter_name">{departamento.name}</span>
            <span className="PlaceSearchResultsFilters__place_filter_results">({departamento.count})</span>
            <Icon className="PlaceSearchResultsFilters__place_filter_icon" icon="mdi:chevron-right" />
          </button>
        ))} */}
      </div>
    </div>
  )
}

export default PlaceSearchResultsFilters