import React from 'react'
import {connect} from 'react-redux'
import CountryTable from '../components/CountryTable'
import {GAME_STATUS} from '../reducers/game'
import {selectFilter, startNewRound, selectAnswer} from '../actions'

const getGameMenu = ({filters, selectedFilters, dispatch}, onSelectFilter) => {
  return <div>
    <h4>Menu</h4>
    <div>
      <span>region:</span>
      <select value={selectedFilters.region} onChange={e => {
        dispatch(onSelectFilter({region: e.target.value}))
      }}>
        <option value=''>All</option>
        {filters.region.map(filter => (
          <option value={filter} key={filter}>{filter}</option>
        ))}
      </select>
      <button onClick={e => {
        dispatch(startNewRound())
      }}>
        startNewRound
      </button>
    </div>
  </div>
}

const getGameRound = ({status, currentRoundId, rounds, dispatch}) => {
  const currentRound = rounds.find(r => r.id === currentRoundId)
  return <div>
    <span>
      <div>progress:&nbsp;
        {currentRound.pageIndex} - {currentRound.pageIndex + currentRound.pageLength}
        &nbsp;/&nbsp;
        {currentRound.countries.length}
      </div>
      <div>score:&nbsp;{currentRound.correct}&nbsp;:&nbsp;{currentRound.fail}</div>

    </span>
    <CountryTable
      countries={currentRound.countries.slice(
        currentRound.pageIndex,
        currentRound.pageIndex + currentRound.pageLength
      )}
      countryAnswer={
        currentRound.answer
      }
      onClickCountry={(countryAnswer) => {
        dispatch(selectAnswer(countryAnswer))
      }} />
  </div>
}

const getGameEnd = ({status, currentRoundId, rounds}) => {
  const currentRound = rounds.find(r => r.id === currentRoundId)

  return <div>
    <div>score:&nbsp;{currentRound.correct}&nbsp;:&nbsp;{currentRound.fail}</div>
    END.
  </div>
}

const getGameContent = (state) => {
  switch (state.status) {
    case GAME_STATUS.MENU:
      return getGameMenu(state, selectFilter)

    case GAME_STATUS.RUNNING:
      return getGameRound(state)

    case GAME_STATUS.END:
      return getGameEnd(state)

    default:
      return <span>[Game] ERROR: <pre>{JSON.stringify(state, 0, 2)}</pre></span>
  }
}

const Game = (state) => {
  return <div className='Game'>
    <h2>Game ({state.status}:{Object.keys(GAME_STATUS)[state.status]})</h2>
    {getGameContent(state)}
  </div>
}

const mapStateToProps = (state, ownProps) => ({
  ...state.game
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
