import React from 'react'

import Currently from '../Currently'
import Daily from '../Daily'

const Display = ({ location, daily, currently }) => {
  return (
    <div className="display">
      <Currently
        location={location}
        currently={currently}
        location={location}
      />
      <Daily daily={daily} />
    </div>
  )
}

export default Display
