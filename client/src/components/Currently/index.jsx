import React from 'react'
import { useDispatch } from 'react-redux'
import ReactAnimatedWeather from 'react-animated-weather'

import { setModeAction } from '../../redux/actions'
import { round } from '../../utils'

const Currently = ({ location, currently }) => {
  const dispatch = useDispatch()
  const iconString = currently.icon.toUpperCase().replace(/-/g, '_')

  const editLocation = () => {
    dispatch(setModeAction('search'))
  }

  return (
    <div className="currently">
      <div className="col location">
        <div className="label">{location.name}</div>
        <div>
          <button className="edit-button" onClick={editLocation}>
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

export default Currently
