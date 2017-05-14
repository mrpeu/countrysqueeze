const loadCountries = (countries) => ({
  type: 'LOAD_COUNTRIES',
  countries
})

export const fetchCountries = () => (dispatch, getState) => {
  const url =
    // 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&redirects=1&explaintext=&titles=Stack%20Overflow'
    'https://raw.githubusercontent.com/mledoze/countries/860602cb60cc0346c0f82b52e16421005aa925bd/countries.json'

  window.fetch(
      url
    )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return dispatch(loadCountries(data))
    })
    .catch((err) => {
      console.error(err)
    })

  return dispatch({
    type: 'FETCH_COUNTRIES'
  })
}
