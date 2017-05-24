import loadCountries from '../loadCountries'

export const showNextPageOrEndRound = (dispatch, getState) => {
  const game = getState().game
  const round = game.rounds[game.currentRoundId]
  const nbCountriesLeft = round.countries.length - (round.pageIndex + round.pageLength)

  return dispatch(nbCountriesLeft > round.pageLength
    ? {type: 'SHOW_NEXT_PAGE'}
    : {type: 'END_ROUND'}
  )
}

export const startNewRound = () => (dispatch, getState) => {
  dispatch({type: 'START_NEW_ROUND'})
}

export const selectAnswer = (countryAnswer) => (dispatch, getState) => {
  dispatch({
    type: 'SELECT_ANSWER',
    answer: countryAnswer
  })
  return showNextPageOrEndRound(dispatch, getState)
}

export const selectFilter = (value) => ({
  type: 'SELECT_FILTER',
  value
})

export const gameInitialized = (countries) => ({
  type: 'GAME_INITIALIZED',
  game: {countries}
})

export const initializingGame = (countries) => (dispatch, getState) => {
  dispatch(loadCountries(v => gameInitialized(v)))
  return {
    type: 'INITIALIZING_GAME',
    countries
  }
}