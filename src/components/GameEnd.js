import React from 'react'
import {showMenu} from '../actions'

import FlatButton from 'material-ui/FlatButton'

export default ({countries, roundIndex, rounds, dispatch}) => {
  const currentRound = rounds[roundIndex]

  return <div className='Menu'>
    <div className='MenuHeader'>
      {'score: ' + ~~(currentRound.corrects.length / (currentRound.fails.length + currentRound.corrects.length) * 100) + '%'}
    </div>

    <div>corrects:
      {currentRound.corrects.map(f => {
        const c = countries.find(c => c.cca2 === f)
        return <div key={f}>{f}:&nbsp;{c.name.common}</div>
      })}
    </div>

    <div>fails:
      {currentRound.fails.map(f => {
        const c = countries.find(c => c.cca2 === f)
        return <div key={f}>{f}:&nbsp;{c.name.common}</div>
      })}
    </div>

    <FlatButton
      style={{height: 'auto', padding: '1em'}}
      fullWidth
      onClick={e => {
        dispatch(showMenu())
      }}
      label='go to menu'
    />
  </div>
}
