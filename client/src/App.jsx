import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Search from './components/Search'
import Loading from './components/Loading'
import Display from './components/Display'
import Error from './components/Error'

const App = () => {
  const {
    layout: { mode },
    location,
    weather: { daily, currently },
  } = useSelector((store) => store)

  return (
    <main className={currently ? currently.icon : ''}>
      <div className="box">
        <div className={`box__inner box__inner--${mode}`}>
          {mode === 'loading' && <Loading label />}
          {mode === 'error' && <Error />}
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
