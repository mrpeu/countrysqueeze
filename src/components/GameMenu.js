import React from 'react'
import {GAME_STATUS} from '../reducers/game'
import {startNewRound} from '../actions'

import FlatButton from 'material-ui/FlatButton'
import {RadioButtonGroup, RadioButton} from 'material-ui/RadioButton'

export default ({filters, selectedFilters, status, countries, dispatch}, onSelectFilter) => {
  return <div className='Menu'>
    <div className='MenuHeader'>
      MENU
    </div>
    <div>
      <RadioButtonGroup
        name='selectedFilters.region'
        value={selectedFilters.region || ''}
        onChange={(ev, value) => {
          dispatch(onSelectFilter({region: value}))
        }}
        floatingLabelText='Region'
        floatingLabelFixed
    >
        <RadioButton value='' label='All' />
        {filters.region.map(filter => (
          <RadioButton value={filter} key={filter} label={filter} />
      ))}
      </RadioButtonGroup>
    </div>
    <FlatButton
      style={{height: 'auto', padding: '1em'}}
      fullWidth
      onClick={e => {
        dispatch(startNewRound())
      }}
      disabled={status === GAME_STATUS.INIT}
      label={(status === GAME_STATUS.INIT ? 'initializing...' : 'start')}
    />
  </div>
}
