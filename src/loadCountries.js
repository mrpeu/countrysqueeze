import countriesList from '../data/countries.json'

export default (cb) => (dispatch, getState) => {
  dispatch(cb(countriesList.map(c => ({
    ...c,
    flag: require(
      '../data/' +
      c.cca3.toLowerCase() +
      '.svg'
    )
  }))))

  return countriesList
}
