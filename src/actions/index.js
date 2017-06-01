import loadCountries from '../loadCountries'

export const showMenu = () => ({
  type: 'GO_MENU'
})

export const showNextPageOrEndRound = (dispatch, getState) => {
  const game = getState().game
  const round = game.rounds[game.roundIndex]

  return dispatch(round.pages.length - 1 >= round.pageIndex + 1
    ? {type: 'SHOW_NEXT_PAGE'}
    : {type: 'END_ROUND'}
  )
}

export const startNewRound = () => (dispatch, getState) => {
  dispatch({type: 'START_NEW_ROUND'})
}

export const selectEntry = (countryEntry) => (dispatch, getState) => {
  dispatch({
    type: 'SELECT_ENTRY',
    entry: countryEntry
  })
  return showNextPageOrEndRound(dispatch, getState)
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
  dispatch(loadCountries(gameInitialized))
}
