import countries from '../data/_countries.json'

export default (cb) => {
  return cb(Object.keys(countries).reduce((result, key) => {
    result[key] = {
      ...countries[key],
      // This tells webpack to include the flags
      flag: require(
        '../data/' +
        countries[key].cca3.toLowerCase() +
        '.svg'
      )
    }
    return result
  }, {}))
}
