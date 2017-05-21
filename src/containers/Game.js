import React from 'react'
import {connect} from 'react-redux'
import CountryTable from '../components/CountryTable'
import {GAME_STATUS} from '../reducers/game'
import {selectFilter, startNewRound, selectAnswer} from '../actions'

import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const getGameMenu = ({filters, selectedFilters, dispatch, status}, onSelectFilter) => {
  return <div className='MenuWrapper'>
    <Paper zDepth={2} className='Menu'>
      <div className='MenuHeader'>
        MENU
      </div>
      <div>
        <SelectField
          value={selectedFilters.region || ''}
          onChange={(ev, key, payload) => {
            dispatch(onSelectFilter({region: payload}))
          }}
          floatingLabelText='Region'
          floatingLabelFixed
          style={{width: '14em'}}
        >
          <MenuItem value='' primaryText='All' />
          {filters.region.map(filter => (
            <MenuItem value={filter} key={filter} primaryText={filter} />
          ))}
        </SelectField>
      </div>
      <div>
        <FlatButton
          onClick={e => {
            dispatch(startNewRound())
          }}
          disabled={status === GAME_STATUS.INIT}
          label='start'
          style={{width: '100%'}}
      />
      </div>
    </Paper>
  </div>
}

const getGameRound = ({status, currentRoundId, rounds, dispatch}) => {
  const currentRound = rounds.find(r => r.id === currentRoundId)
  const countries = currentRound.countries.slice(
    currentRound.pageIndex,
    currentRound.pageIndex + currentRound.pageLength
  )
  const currentAnswer = currentRound.countries[currentRound.answer]
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
      countries={countries}
      countryAnswer={currentAnswer}
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
    case GAME_STATUS.INIT:
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
