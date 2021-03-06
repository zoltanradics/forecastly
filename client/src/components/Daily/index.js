import React from 'react'
import classNames from 'classnames'
import ReactAnimatedWeather from 'react-animated-weather'

import { dailyPropTypes } from '../../prop-types'
import { getDayAbbrev, dayAbbreviations, round } from '../../utils'

const Daily = ({ daily }) => (
  <ul className="daily">
    {Object.keys(daily).map((key, index) => {
      const dailyData = daily[key]
      const iconString = dailyData.icon.toUpperCase().replace(/-/g, '_')
      return (
        <li
          className={classNames('', { today: index === 0 })}
          key={dailyData.time}>
          <div className="col day">
            <div className="label text-center">
              {getDayAbbrev(
                new Date(dailyData.time * 1000 + 86400000),
                dayAbbreviations
              )}
            </div>
          </div>
          <div className="col temperature">
            <div className="label text-center">
              {round(dailyData.temperatureHigh)}
            </div>
          </div>
          <div className="col icon">
            <div className="label text-center">
              <ReactAnimatedWeather
                icon={iconString}
                color={'black'}
                size={26}
                animate={false}
              />
            </div>
          </div>
          <div className="col temperature">
            <div className="label text-center">
              {round(dailyData.temperatureLow)}
            </div>
          </div>
        </li>
      )
    })}
  </ul>
)

Daily.propTypes = dailyPropTypes

export default Daily
