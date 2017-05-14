export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_COUNTRIES':
      return state

    case 'LOAD_COUNTRIES':
      return action.countries

    default:
      return state
  }
}
