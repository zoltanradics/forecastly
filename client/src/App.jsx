import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'

import { requestWeatherAction } from './redux/actions'

import { getDateString } from './utils'
import Loading from './components/Loading'
import Display from './components/Display'

const App = () => {
  const dispatch = useDispatch()
  const [displayMounted, setDisplayMounted] = useState(false)
  const {
    location: { city },
    weather: { daily, currently, weatherLoaded },
  } = useSelector((store) => store)

  const showDispplay = () => setDisplayMounted(true)

  useEffect(() => {
    dispatch(requestWeatherAction())
  }, [])

  return (
    <main>
      <div className="box">
        <CSSTransition
          in={weatherLoaded}
          timeout={800}
          classNames="box--inner"
          onEntered={showDispplay}>
          <div
            className={classNames('box--inner', {
              'box--inner__align-middle': !weatherLoaded,
            })}>
            {weatherLoaded && displayMounted ? (
              <Display city={city} daily={daily} currently={currently} />
            ) : (
              <Loading />
            )}
          </div>
        </CSSTransition>
      </div>
    </main>
  )
}

export default App
