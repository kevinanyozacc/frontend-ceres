import { InlineIcon } from '@iconify/react'
import classNames from 'classnames'
import { isEmpty } from 'lodash'
import { useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatPlaceType } from '../../../../helpers/places'
import { clearPlaceFilter, removeTypeFilter, clearYearFilter, clearHQFilter, SearchSortCriteria } from '../../../../redux/ducks/search'
import { useSearchForProviderQuery } from '../../../../redux/services/search'
import ErrorMessage from '../../../ErrorMessage'
import Loader from '../../../Loader'
import PlaceSearchResultCard from './PlaceSearchResultCard'
import './PlaceSearchResultsList.css'

const PlaceSearchResultsList = () => {

  const { searchTerm, placeFilter, hqFilter, yearFilter, typesFilters } = useSelector(state => state.search)
  const [generalFilter, setGeneralFilter] = useState('')
  const [sortCriteria, setSortCriteria] = useState(SearchSortCriteria.Relevance)
  const { data, error, isLoading, isFetching } = useSearchForProviderQuery(searchTerm)
  const generalFilterInputRef = useRef()
  const dispatch = useDispatch()

  const { filteredData, count: filteredDataCount } = useMemo(() => {
    if (!data) {
      return { filteredData: [], count: 0 }
    }
    const filteredData = data.data.filter(d => {
      let match = !generalFilter || JSON.stringify(d).toLocaleLowerCase('es-ES').indexOf(generalFilter) >= 0
      match = match && (!placeFilter || d.nameDepartamento === placeFilter)
      match = match && (!hqFilter || d.hq === hqFilter)
      match = match && (!yearFilter || d.year === yearFilter)
      match = match && (isEmpty(typesFilters) || typesFilters.indexOf(d.type) >= 0)
      return match
    })
    switch (sortCriteria) {
      case SearchSortCriteria.Relevance:
        filteredData.sort((e1, e2) => {
          let e1Score = 0, e2Score = 0
          e1Score =+ 8 * (e1.name.indexOf(generalFilter) >= 0)
          e2Score =+ 8 * (e2.name.indexOf(generalFilter) >= 0)
          return e1Score > e2Score ? 1 : -1
        })
        break
      case SearchSortCriteria.Modified:
        filteredData.sort((e1, e2) => e1.year < e2.year ? 1 : -1)
        break
      default:
        filteredData.sort((e1, e2) => e1.name > e2.name ? 1 : -1)
    }
    return { filteredData, count: filteredData.length }
  }, [data, generalFilter, placeFilter, hqFilter, yearFilter, typesFilters, sortCriteria])

  if (isLoading || isFetching) {
    return <Loader query="Buscando" />
  }

  if (error) {
    return <ErrorMessage />
  }

  const activeFilters = []
  if (placeFilter) {
    activeFilters.push({
      label: placeFilter,
      onClick: () => dispatch(clearPlaceFilter())
    })
  }
  if (yearFilter) {
    activeFilters.push({
      label: yearFilter,
      onClick: () => dispatch(clearYearFilter())
    })
  }
  if (hqFilter) {
    activeFilters.push({
      label: hqFilter,
      onClick: () => dispatch(clearHQFilter())
    })
  }
  typesFilters.forEach(t => {
    activeFilters.push({
      label: formatPlaceType(t),
      onClick: () => dispatch(removeTypeFilter(t))
    })
  })

  return (
    <div className="PlaceSearchResultsList">
      <div className="PlaceSearchResultsList__top">
        <h2 className="PlaceSearchResultsList__title">
          {filteredDataCount} {filteredDataCount === 1 ? 'resultado' : 'resultados'}
        </h2>
        <div
          className="PlaceSearchResultsList__quick_filter_input_container"
          onClick={() => generalFilterInputRef.current.focus()}
        >
          <InlineIcon
            className={classNames({
              "PlaceSearchResultsList__quick_filter_input_icon": true,
              "PlaceSearchResultsList__quick_filter_input_icon--highlighted": generalFilter
            })}
            onClick={() => setGeneralFilter('')}
            icon={generalFilter ? "mdi:close" : "mdi:filter-variant"}
          />
          <input
            type="text"
            value={generalFilter}
            ref={generalFilterInputRef}
            className={classNames({
              "PlaceSearchResultsList__quick_filter_input": true,
              "PlaceSearchResultsList__quick_filter_input--highlighted": generalFilter
            })}
            onChange={e => setGeneralFilter(e.target.value)}
            placeholder="Filtrar"
          />
        </div>
        <div className="PlaceSearchResultsList__sort_by_field_container">
          <label
            htmlFor="PlaceSearchResultsList__select_id"
            className="PlaceSearchResultsList__select_label"
          >
            Ordenar:
          </label>
          <select
            id="PlaceSearchResultsList__select_id"
            className="PlaceSearchResultsList__select"
            onChange={e => setSortCriteria(SearchSortCriteria[e.target.value])}
            defaultValue={'Relevance'}
          >
            {Object.keys(SearchSortCriteria).map(criteria => (
              <option
                key={`option-${criteria}`}
                value={criteria}
              >
                {SearchSortCriteria[criteria].name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {!isEmpty(activeFilters) && (
        <div className="PlaceSearchResultsList__filter_pills_container">
          {activeFilters.map((f, i) => (
            <div
              key={`filter-pill-${i}`}
              className="PlaceSearchResultsList__filter_pill"
            >
              <button
                onClick={f.onClick}
                className="PlaceSearchResultsList__clear_filter_button"
                title="Remover filtro"
              >
                <InlineIcon
                  icon="mdi:close"
                />
              </button>
              {f.label}
            </div>
          ))}
        </div>
      )}
      <div className="PlaceSearchResultsList__cards_container">
        {filteredData.slice(0, 100).map((result, i) => (
          <PlaceSearchResultCard
            key={`SearchResultCard-${i}`}
            data={result}
          />
        ))}
      </div>
    </div>
  )
}

export default PlaceSearchResultsList