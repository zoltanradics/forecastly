import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { requestGeocodingAction } from '../../redux/actions'

const Search = () => {
  let timeout = null
  const dispatch = useDispatch()
  const inputRef = useRef()

  const loadSuggestions = () => {
    dispatch(requestGeocodingAction(inputRef.current.value))
  }

  const handleOnCange = () => {
    clearTimeout(timeout)
    timeout = setTimeout(loadSuggestions, 300)
  }

  return (
    <div className="search">
      <h1>Welcome!</h1>
      <div className="search--hint">
        Type the name of the location, or click the compass icon and let us
        guess where you are!
      </div>
      <form className="search--form">
        <input
          name="location"
          placeholder="Enter your city"
          onChange={handleOnCange}
          ref={inputRef}
        />
      </form>
    </div>
  )
}

export default Search
