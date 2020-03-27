// Dat abbreviation map
export const dayAbbreviations = {
  '0': 'Sun',
  '1': 'Mon',
  '2': 'Tue',
  '3': 'Wed',
  '4': 'Thu',
  '5': 'Fri',
  '6': 'Sat',
}

// Get number rounded
export const round = (number) => Math.round(number)

// Get date in YYYY-MM-DD format
export const getDateString = (date) =>
  date instanceof Date ? date.toISOString().split('T')[0] : null

// Transform UTCDay to day abbreviation
export const getDayAbbrev = (date, dayAbbreviations) =>
  date instanceof Date && typeof dayAbbreviations !== 'undefined'
    ? dayAbbreviations[date.getUTCDay()]
    : null

// Data transformation for weater data
export const transformWeatherData = (data) =>
  data.reduce((acc, item) => {
    // Create string from date
    const dateString = getDateString(new Date(item.time * 1000))
    // Create object with date string key
    if (typeof acc[dateString] === 'undefined') {
      acc[dateString] = item
    }
    return acc
  }, {})

// Check weather data validity
export const isWeatherDataLoaded = (payload) =>
  typeof payload.currently !== 'undefined' &&
  typeof payload.daily !== 'undefined' &&
  payload.daily.data.length === 8
