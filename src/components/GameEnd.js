import React from 'react'
import {showMenu} from '../actions'

import FlatButton from 'material-ui/FlatButton'

const CountryInline = ({country}) => <li className='CountryInline'><img
  className='Flag'
  src={country.flag}
  alt={`flag of ${country.name.common}`}
/>
  {country.name.common}
</li>

export default ({countries, roundIndex, rounds, selectedFilters, dispatch}) => {
  const currentRound = rounds[roundIndex]

  return <div>
    <div className='Header'>
      {`${selectedFilters.region}: ${~~(currentRound.corrects.length / (currentRound.fails.length + currentRound.corrects.length) * 100)}%`}
    </div>

    <div className='GameEnd'>
      <div>
        <ul style={{color: 'red'}}>fails:
          {currentRound.fails.map(cca2 => (<CountryInline key={cca2} country={countries[cca2]} />))}
        </ul>

        <ul style={{}}>corrects:
          {currentRound.corrects.map(cca2 => (<CountryInline key={cca2} country={countries[cca2]} />))}
        </ul>
      </div>

      <FlatButton
        style={{height: 'auto', padding: '1em'}}
        fullWidth
        onClick={e => {
          dispatch(showMenu())
        }}
        label='again!'
    />
    </div></div>
}
