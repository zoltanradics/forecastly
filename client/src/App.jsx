import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { requestWeatherAction } from './redux/actions'

import { getDateString } from './utils'
import Loading from './components/Loading'
import Display from './components/Display'

const App = () => {
  const dispatch = useDispatch()
  const { daily, currently, weatherLoaded } = useSelector(
    (store) => store.weather
  )

  useEffect(() => {
    dispatch(requestWeatherAction())
  }, [])

  return (
    <main>
      <div className="box">
        <div
          className={classNames('box--inner', {
            'box--inner__align-middle': !weatherLoaded,
          })}>
          {weatherLoaded ? (
            <Display daily={daily} currently={currently} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </main>
  )
}

export default App
