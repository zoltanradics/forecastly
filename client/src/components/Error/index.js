import React from 'react'
import { useDispatch } from 'react-redux'

import { setModeAction } from '../../redux/actions'

const Error = () => {
  const dispatch = useDispatch()

  const resetMode = () => {
    dispatch(setModeAction('search'))
  }

  return (
    <div className="error">
      <h2>Something went wrong.</h2>
      <a className="button" onClick={resetMode}>
        Try Again!
      </a>
    </div>
  )
}

export default Error
