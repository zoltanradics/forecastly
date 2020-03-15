import React from 'react'

import LocationGuess from '../LocationGuess'

const Search = () => {
  return (
    <React.Fragment>
      <form className="form">
        <input
          className="location"
          name="location_name"
          placeholder="Enter your city"
        />
      </form>
      <LocationGuess />
    </React.Fragment>
  )
}

export default Search
