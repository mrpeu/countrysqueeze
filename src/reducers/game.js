import isMatch from 'lodash.ismatch'
import shuffle from 'lodash.shuffle'

export const GAME_STATUS = {
  INIT: -1, MENU: 0, RUNNING: 1, END: 2
}

const DEFAULT_STATE = {
  status: GAME_STATUS.INIT,
  countries: [],
  roundIndex: -1,
  filters: {
    region: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  },
  selectedFilters: {},
  rounds: []
}

const DEFAULT_ROUND = {
  start: Date.now(),
  end: null,
  // filter: {region:'Europe'},
  // countries: [],
  pageIndex: -1,
  pageLength: 5,
  pages: [
    /* {
      start: [Number],
      end: [Number],
      answer: [String: cca2],
      countries: [
        [String: cca2]
      ],
      entries: []
    } */
  ],
  corrects: [],
  fails: []
}

// return a list of [nb] unique countries out of [countries],
// including a specified one [answer]
const getXCountriesForAnswer = (nb, countries, answer) => {
  const arr = [answer]
  let cca2 = -1
  for (let i = 0; i < nb - 1; i++) {
    cca2 = -1
    while (cca2 < 0 || arr.includes(cca2)) {
      cca2 = ~~(Math.random() * countries.length)
    }
    if (cca2 > nb / 2) arr.push(cca2)
    else arr.unshift(cca2)

    cca2 = -1
  }
  return arr.map(cca2 => countries[cca2])
}

const createRoundsPages = (round, countries) => {
  const pages = [...Array(countries.length)].map((_, i) => {
    const page = {
      countries: getXCountriesForAnswer(round.pageLength, countries, i),
      answer: countries[i],
      entries: []
    }
    return page
  })
  return {
    ...round,
    pages: shuffle(pages)
  }
}

const showNextPage = (round) => {
  const pageIndex = ++round.pageIndex
  return {
    ...round,
    pageIndex,
    pages: round.pages.map((page, i) => i !== round.pageIndex
      ? page
      : {
        ...page,
        start: Date.now()
      })
  }
}

const startNewRound = (countries, options) => {
  const selectedCountries = options.selectedFilters === null
    ? Object.keys(countries)
    : Object.keys(countries)
      .filter(key => {
        return isMatch(countries[key], options.selectedFilters)
      })

  return showNextPage(
    createRoundsPages(
      {
        ...DEFAULT_ROUND,
        ...options,
        countries: selectedCountries
      }, selectedCountries)
    )
}

const updatePageWithCorrectEntry = (page, entry) => {
  return {
    ...page,
    entries: [...page.entries, entry.cca2],
    end: Date.now()
  }
}

const updatePageWithWrongEntry = (page, entry) => {
  return {
    ...page,
    entries: [...page.entries, entry.cca2],
    end: Date.now()
  }
}

const updateRoundWithEntry = (state, entry) => {
  return state.rounds.map((r, key) => {
    if (key !== state.roundIndex) { return r } else {
      const answer = r.pages[r.pageIndex].answer

      if (entry.cca2 === answer) {
        return {
          ...r,
          corrects: [...r.corrects, answer],
          pages: r.pages.map((page, i) => i !== r.pageIndex ? page : updatePageWithCorrectEntry(page, entry))
        }
      } else {
        return {
          ...r,
          fails: [...r.fails, answer],
          pages: r.pages.map((page, i) => i !== r.pageIndex ? page : updatePageWithWrongEntry(page, entry))
        }
      }
    }
  })
}

const endRound = (rounds, roundIndex) => rounds.map((r, key) =>
  key === roundIndex
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
        selectedFilters: action.value === null
          ? null
          : {
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
              selectedFilters: state.selectedFilters,
              pageLength: 4
            }
          )
        ],
        roundIndex: state.rounds.length,
        status: GAME_STATUS.RUNNING
      }

    case 'SELECT_ENTRY':
      return {
        ...state,
        rounds: updateRoundWithEntry(state, action.entry)
      }

    case 'SHOW_NEXT_PAGE':
      const currentRound = state.rounds[state.roundIndex]
      if (currentRound.pages.length <= currentRound.pageIndex + 1) {
        return {
          ...state,
          rounds: endRound(state.rounds, state.roundIndex),
          status: GAME_STATUS.END
        }
      } else {
        // TODO: stay on same page if the correct answer hasnt been found
        return {
          ...state,
          rounds: state.rounds.map((r, key) => (
            key !== state.roundIndex
            ? r
            : showNextPage(r)
          ))
        }
      }

    case 'END_ROUND':
      return {
        ...state,
        rounds: endRound(state.rounds, state.roundIndex),
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
