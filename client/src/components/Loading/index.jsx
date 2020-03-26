import React from 'react'

const Loading = ({ label }) => (
  <div className="loading-indicator">
    <img
      className="svg"
      src="/assets/spinning-circle.svg"
      alt="Loading Indicator"
    />
    {label && <div className="label">Hold on!</div>}
  </div>
)

export default Loading
