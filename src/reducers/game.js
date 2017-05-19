import countriesList from '../../node_modules/world-countries/dist/countries.json'
import {isMatch} from 'lodash/fp'

export const GAME_STATUS = {
  MENU: 0, RUNNING: 1, END: 2
}

const DEFAULT_STATE = {
  status: GAME_STATUS.MENU,
  countries: countriesList,
  currentRoundId: -1,
  filters: {
    region: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  },
  selectedFilters: {},
  rounds: []
}

const DEFAULT_ROUND = {
  id: -1,
  start: Date.now(),
  end: null,
  // filter: {region:'Europe'},
  // countries: [],
  pageIndex: 0,
  pageLength: 5,
  answer: 0,
  correct: 0,
  fail: 0
}

const startNewRound = (countries, options) => {
  return {
    ...DEFAULT_ROUND,
    ...options,
    countries: countries.filter(isMatch(options.filter))
  }
}

const getCurrentRound = (state) => (
  state.status === GAME_STATUS.RUNNING
    ? state.rounds.find(r => r.id === state.currentRoundId)
    : null
)

const updatePageWithAnswer = (state, answer) => {
  return state.rounds.map(r => {
    if (r.id !== state.currentRoundId) { return r } else {
      const correctAnswer = r.answer.cca2
      return {
        ...r,
        correct: r.correct + (answer.cca2 === correctAnswer),
        fail: r.fail + (answer.cca2 !== correctAnswer)
      }
    }
  })
}

const goNextPage = (round) => {
  const newPageIndex = (round.pageIndex < 0)
    ? 0 // first page
    : round.pageIndex + round.pageLength

  const rand = ~~(Math.random() * round.pageLength)
  const newAnswer = round.countries[newPageIndex + Math.min(rand, round.countries.length)]

  return {
    ...round,
    answer: newAnswer,
    pageIndex: newPageIndex
  }
}

const endRound = (rounds, id) => rounds.map(r =>
  r.id === id
    ? {
      ...r,
      end: Date.now(),
      pageIndex: 0
    }
    : r
)

export default (state = DEFAULT_STATE, action) => {
  // console.log(action.type)

  switch (action.type) {

    case 'SELECT_FILTER':
      return {
        ...state,
        filter: {
          ...state.selectedFilters,
          ...action.value
        }
      }

    case 'START_NEW_ROUND':
      return {
        ...state,
        rounds: [
          ...state.rounds,
          startNewRound(
            state.countries,
            {
              id: state.rounds.length,
              filter: state.filter,
              pageLength: 4
            }
          )
        ],
        currentRoundId: state.rounds.length,
        status: GAME_STATUS.RUNNING
      }

    case 'SELECT_ANSWER':
      return {
        ...state,
        rounds: updatePageWithAnswer(state, action.answer)
      }

    case 'SHOW_NEXT_PAGE':
      const round = getCurrentRound(state)
      if (!round) throw new Error('[game reducer] trying to increment set but there\'s no current round')
      return {
        ...state,
        rounds: state.rounds.map((r) => (
          r.id !== round.id
          ? r
          : goNextPage(round)
        ))
      }

    case 'END_ROUND':
      return {
        ...state,
        rounds: endRound(state.rounds, state.currentRoundId),
        status: GAME_STATUS.END
      }

    case 'GO_MENU':
      return {
        ...state,
        status: GAME_STATUS.MENU
      }

    default:
      return state
  }
}
