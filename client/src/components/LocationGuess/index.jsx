import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { requestLocationAction } from '../../redux/actions'

const LocationGuess = () => {
  const { city } = useSelector((state) => state.location)

  const dispatch = useDispatch()

  const loadLocation = () => {
    dispatch(requestLocationAction())
  }

  useEffect(loadLocation, [])

  return (
    <div className="location-guess">
      <div className="label">
        {!city ? (
          <div>Let me guess where you are!</div>
        ) : (
          <div>
            Are you here: <strong>{city}?</strong>
          </div>
        )}
      </div>
    </div>
  )
}

export default LocationGuess
