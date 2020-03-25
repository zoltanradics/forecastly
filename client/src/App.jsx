import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
    weather: { daily, currently },
  } = useSelector((store) => store)

  return (
    <main className={currently ? currently.icon : ''}>
      <div className="box">
        <div className={`box__inner box__inner--${mode}`}>
          {mode === 'loading' && <Loading />}
          {mode === 'search' && <Search />}
          {mode === 'display' && (
            <Display daily={daily} currently={currently} location={location} />
          )}
        </div>
      </div>
    </main>
  )
}

export default App
