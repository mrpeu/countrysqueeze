import {isMatch} from 'lodash/fp'

export const GAME_STATUS = {
  INIT: -1, MENU: 0, RUNNING: 1, END: 2
}

const DEFAULT_STATE = {
  status: GAME_STATUS.INIT,
  countries: [],
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
  // answer: 0,
  corrects: [],
  fails: []
}

const getNewAnswer = (round) => {
  const rand = ~~(Math.random() * round.pageLength)
  const answer = round.pageIndex + Math.min(rand, round.countries.length)
  return {...round, answer}
}

const startNewRound = (countries, options) => {
  return getNewAnswer({
    ...DEFAULT_ROUND,
    ...options,
    countries: countries.filter(isMatch(options.selectedFilters))
  })
}

const getCurrentRound = (state) => (
  state.status === GAME_STATUS.RUNNING
    ? state.rounds.find(r => r.id === state.currentRoundId)
    : null
)

const updatePageWithAnswer = (state, answer) => {
  return state.rounds.map(r => {
    if (r.id !== state.currentRoundId) { return r } else {
      const correctAnswer = getCurrentRound(state).countries[r.answer].cca2

      r[ answer.cca2 === correctAnswer
        ? 'corrects'
        : 'fails'
      ].push(answer.cca2)

      console.log(r.corrects, r.fails)

      return {
        ...r,
        corrects: r.corrects,
        fails: r.fails
      }
    }
  })
}

const goNextPage = (round) => {
  const newPageIndex = (round.pageIndex < 0)
    ? 0 // first page
    : round.pageIndex + round.pageLength

  return getNewAnswer({
    ...round,
    pageIndex: newPageIndex
  })
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
  console.log(action.type)

  switch (action.type) {

    case 'INITIALIZING_GAME':
      return {
        ...state,
        status: GAME_STATUS.INIT
      }

    case 'GAME_INITIALIZED':
      return {
        ...state,
        ...action.game,
        status: GAME_STATUS.MENU
      }

    case 'SELECT_FILTER':
      return {
        ...state,
        selectedFilters: {
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
              selectedFilters: state.selectedFilters,
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
