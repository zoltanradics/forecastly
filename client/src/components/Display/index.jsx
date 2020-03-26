import React from 'react'

import { displayPropTypes } from '../../prop-types'
import Currently from '../Currently'
import Daily from '../Daily'

const Display = ({ location, daily, currently }) => {
  return (
    <div className="display">
      <Currently location={location} currently={currently} />
      <Daily daily={daily} />
    </div>
  )
}

Display.propTypes = displayPropTypes

export default Display
