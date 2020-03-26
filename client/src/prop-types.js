import PropTypes from 'prop-types'

const locationPropTypes = {
  suggestions: PropTypes.array,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  name: PropTypes.string,
}

export const currentlyPropTypes = {
  time: PropTypes.number,
  summary: PropTypes.string,
  icon: PropTypes.string,
  temperature: PropTypes.number,
}

export const displayPropTypes = {
  daily: PropTypes.any.isRequired,
  currently: PropTypes.shape(currentlyPropTypes),
  location: PropTypes.shape(locationPropTypes),
}
