import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { requestWeatherAction } from './redux/actions'

import { getDateString } from '../../utils'
import Loading from './components/Loading'
import Display from './components/Display'

const App = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((store) => store.weather)
  const date = getDateString(new Date())
  const dailyWeatherData = data[date]

  useEffect(() => {
    dispatch(requestWeatherAction())
  }, [])

  return (
    <main>
      <div className="box">
        <div
          className={classNames('box--inner', {
            'box--inner__align-middle': !dailyWeatherData,
          })}>
          {dailyWeatherData ? <Display data={dailyWeatherData} /> : <Loading />}
        </div>
      </div>
    </main>
  )
}

export default App
