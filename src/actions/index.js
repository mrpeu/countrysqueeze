import loadCountries from '../loadCountries'

export const showMenu = () => ({
  type: 'GO_MENU'
})

export const startNewRound = () => ({
  type: 'START_NEW_ROUND'
})

export const selectEntry = (countryEntry) => (dispatch, getState) => {
  dispatch({
    type: 'SELECT_ENTRY',
    entry: countryEntry
  })
  
  dispatch({
    type: 'SHOW_NEXT_PAGE'
  })
}

export const selectFilter = (value) => ({
  type: 'SELECT_FILTER',
  value
})

export const gameInitialized = (countries) => {
  return {
    type: 'GAME_INITIALIZED',
    game: {countries}
  }
}

export const initializingGame = (countries = {}) => (dispatch, getState) => {
  dispatch({
    type: 'INITIALIZING_GAME',
    countries
  })

  dispatch(
    loadCountries(gameInitialized)
  )
}
