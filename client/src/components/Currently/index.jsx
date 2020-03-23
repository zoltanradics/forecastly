import React from 'react'
import ReactAnimatedWeather from 'react-animated-weather'

import { round } from '../../utils'

const Currently = ({ location, currently }) => {
  const iconString = currently.icon.toUpperCase().replace(/-/g, '_')
  return (
    <div className="currently">
      <div className="col location">{location.city}</div>
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
