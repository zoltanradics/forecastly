import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  requestLocationSuggestionAction,
  requestWeatherDataAction,
} from '../../redux/actions'

const Search = () => {
  let timeout = null
  const dispatch = useDispatch()
  const inputRef = useRef()
  const { suggestions } = useSelector((store) => store.location)

  const loadSuggestions = () => {
    if (inputRef.current.value.length >= 3) {
      dispatch(requestLocationSuggestionAction(inputRef.current.value))
    }
  }

  const handleOnCange = () => {
    clearTimeout(timeout)
    timeout = setTimeout(loadSuggestions, 300)
  }

  const locateMe = (e) => {
    e.preventDefault()
    dispatch(requestWeatherDataAction())
  }

  const selectlocation = (item) => {
    const { lat, lng } = item
    dispatch(requestWeatherDataAction(lat, lng))
  }

  return (
    <div className="search">
      <h1>Welcome!</h1>
      <div className="search__hint">
        Type the name of the location, or click the compass icon and let us
        guess where you are!
      </div>
      <form className="search__form">
        <div className="search__form__input-group">
          <input
            name="location"
            placeholder="Enter your city"
            onChange={handleOnCange}
            ref={inputRef}
          />
          <button onClick={locateMe}>LOCATE ME!</button>
        </div>
      </form>
      {suggestions && (
        <ul className="search__suggestions">
          {suggestions.map((item, index) => (
            <li index={index} onClick={() => selectlocation(item)}>
              <div className="flag">{item.flag}</div>
              <div className="name">{item.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search
