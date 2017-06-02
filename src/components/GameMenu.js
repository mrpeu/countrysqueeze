import React from 'react'
import {GAME_STATUS} from '../reducers/game'
import {startNewRound} from '../actions'

import FlatButton from 'material-ui/FlatButton'

export default ({filters, selectedFilters, status, countries, dispatch}, onSelectFilter) => {
  return <div>
    <div className='Header'>
      Countrysqueeze!
    </div>
    <div className='GameMenu'>
      <FlatButton
        fullWidth
        onClick={e => {
          dispatch(onSelectFilter({region: ''}))
          dispatch(startNewRound())
        }}
        disabled={status === GAME_STATUS.INIT}
        label='All'
      />
      {filters.region.map(filter => (
        <FlatButton
          fullWidth
          key={filter}
          onClick={e => {
            dispatch(onSelectFilter({region: filter}))
            dispatch(startNewRound())
          }}
          disabled={status === GAME_STATUS.INIT}
          label={filter}
        />
    ))}
    </div>
  </div>
}
