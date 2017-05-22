import React from 'react'
import {connect} from 'react-redux'
import CountryTable from '../components/CountryTable'
import {GAME_STATUS} from '../reducers/game'
import {selectFilter, startNewRound, selectAnswer} from '../actions'

import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const getGameMenu = ({filters, selectedFilters, dispatch, status}, onSelectFilter) => {
  return <div className='Menu'>
    <div className='MenuHeader'>
      MENU
    </div>
    <SelectField
      value={selectedFilters.region || ''}
      onChange={(ev, key, payload) => {
        dispatch(onSelectFilter({region: payload}))
      }}
      floatingLabelText='Region'
      floatingLabelFixed
      style={{width: '80%'}}
    >
      <MenuItem value='' primaryText='All' />
      {filters.region.map(filter => (
        <MenuItem value={filter} key={filter} primaryText={filter} />
      ))}
    </SelectField>
    <FlatButton
      style={{height: 'auto', padding: '1em'}}
      fullWidth
      onClick={e => {
        dispatch(startNewRound())
      }}
      disabled={status === GAME_STATUS.INIT}
      label='start'
    />
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
    <div style={{}}>&nbsp;
      <div style={{float: 'left'}}>progress:&nbsp;
        {currentRound.pageIndex} - {currentRound.pageIndex + currentRound.pageLength}
        &nbsp;/&nbsp;
        {currentRound.countries.length}
      </div>
      <div style={{float: 'right'}}>
        score:&nbsp;{currentRound.correct}&nbsp;:&nbsp;{currentRound.fail}
      </div>
    </div>

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
