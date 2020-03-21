import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { requestWeatherAction } from './redux/actions'

import Loading from './components/Loading'
import Display from './components/Display'

const App = () => {
  const dispatch = useDispatch()
  const [dataLoaded, setDataLoaded] = useState(true)

  useEffect(() => {
    dispatch(requestWeatherAction())
  }, [])

  return (
    <main>
      <div className="box">
        <div className="box--inner">
          {dataLoaded ? <Display /> : <Loading />}
        </div>
      </div>
    </main>
  )
}

export default App
