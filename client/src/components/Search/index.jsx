import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loading from '../Loading'

import {
  requestLocationAction,
  requestLocationSuggestionAction,
  requestWeatherDataAction,
  dumpSuggestionAction,
} from '../../redux/actions'

const Search = () => {
  let timeout = null
  const dispatch = useDispatch()
  const inputRef = useRef()
  const [isLoading, setLoading] = useState(false)
  const { suggestions } = useSelector((store) => store.location)

  const loadSuggestions = () => {
    if (inputRef.current.value.length >= 3) {
      setLoading(true)
      dispatch(requestLocationSuggestionAction(inputRef.current.value))
    } else {
      setLoading(false)
      dispatch(dumpSuggestionAction())
    }
  }

  const handleOnCange = () => {
    clearTimeout(timeout)
    timeout = setTimeout(loadSuggestions, 300)
  }

  const showLocationSuggestions = (e) => {
    e.preventDefault()
    dispatch(requestLocationAction())
  }

  const selectlocationSuggestion = (item) => {
    const { lat, lng, name } = item
    dispatch(requestWeatherDataAction(lat, lng, name))
  }

  return (
    <div className="search">
      <h1>Welcome!</h1>
      <div className="search__hint">
        Type the name of the location, or click the "Locate Me!" button and let
        us guess where you are!
      </div>
      <form className="search__form">
        <div className="search__form__input-group">
          <div className="field">
            <input
              name="location"
              placeholder="Enter your city"
              onChange={handleOnCange}
              ref={inputRef}
            />
            {isLoading && (
              <div className="spinner">
                <Loading />
              </div>
            )}
          </div>
          <button onClick={showLocationSuggestions}>LOCATE ME!</button>
        </div>
        {suggestions && suggestions.length > 0 && (
          <ul className="search__suggestions">
            {suggestions.map((item, index) => (
              <li
                key={`suggestion-${index}`}
                onClick={() => selectlocationSuggestion(item)}>
                <div className="flag">{item.flag}</div>
                <div className="name">{item.name}</div>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  )
}

export default Search
