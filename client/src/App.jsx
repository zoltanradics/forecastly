import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'

import { requestWeatherDataAction } from './redux/actions'

import { getDateString } from './utils'
import Search from './components/Search'
import Loading from './components/Loading'
import Display from './components/Display'

const App = () => {
  const dispatch = useDispatch()
  const {
    layout: { mode },
    location,
    weather: { daily, currently, weatherLoaded },
  } = useSelector((store) => store)

  return (
    <main className={currently ? currently.icon : ''}>
      <div className="box">
        <CSSTransition in={weatherLoaded} timeout={0} classNames="box--inner">
          <div className="box--inner">
            {mode === 'loading' && <Loading />}
            {mode === 'search' && <Search />}
            {mode === 'display' && (
              <Display
                daily={daily}
                currently={currently}
                location={location}
              />
            )}
          </div>
        </CSSTransition>
      </div>
    </main>
  )
}

export default App
