export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_COUNTRIES':
      return {
        state,
        isFetching: true
      }

    case 'LOAD_COUNTRIES':
      return {
        state,
        isFetching: false
      }

    default:
      return state
  }
}
