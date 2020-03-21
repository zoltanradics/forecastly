import React from 'react'

import Currently from '../Currently'
import Daily from '../Daily'

const Display = ({ city, daily, currently }) => {
  return (
    <div className="display">
      <Currently city={city} currently={currently} />
      <Daily daily={daily} />
    </div>
  )
}

export default Display
