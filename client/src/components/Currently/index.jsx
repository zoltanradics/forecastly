import React from 'react'
import { useDispatch } from 'react-redux'
import ReactAnimatedWeather from 'react-animated-weather'

import { currentlyPropTypes } from '../../prop-types'
import { setModeAction } from '../../redux/actions'
import { round } from '../../utils'

const Currently = ({ location, currently }) => {
  const dispatch = useDispatch()
  const iconString = currently.icon.toUpperCase().replace(/-/g, '_')
  const name =
    location.name.length >= 34
      ? `${location.name.substring(0, 34)}...`
      : location.name

  const editLocation = () => {
    dispatch(setModeAction('search'))
  }

  return (
    <div className="currently">
      <div className="col location">
        <div className="label">{name}</div>
        <div>
          <button className="button" onClick={editLocation}>
            EDIT LOCATION
          </button>
        </div>
      </div>
      <div className="col apparent">
        <div className="summary">{currently.summary}</div>
        <div className="temperature">
          <div className="col icon">
            <ReactAnimatedWeather
              icon={iconString}
              color={'black'}
              size={36}
              animate={true}
            />
          </div>
          <div className="col label">
            <span className="number">{round(currently.temperature)}</span>
            <span className="degree">˚</span>
          </div>
        </div>
      </div>
    </div>
  )
}

Currently.propTypes = currentlyPropTypes

export default Currently
