
export const showNextPage = () => ({
  type: 'SHOW_NEXT_PAGE'
})

export const startNewRound = () => (dispatch) => {
  dispatch({type: 'START_NEW_ROUND'})
  dispatch(showNextPage())
}

export const selectAnswer = (countryAnswer) => (dispatch) => {
  dispatch({
    type: 'SELECT_ANSWER',
    answer: countryAnswer
  })
  dispatch(showNextPage())
}

export const endRound = () => ({
  type: 'END_ROUND'
})
