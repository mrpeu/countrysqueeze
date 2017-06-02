import React from 'react'
import {selectEntry} from '../actions'
import CountryTable from './CountryTable'

export default ({countries, roundIndex, rounds, dispatch}) => {
  const round = rounds[roundIndex]
  const page = round.pages[round.pageIndex]

  return <div>
    <div className='Header'>
      <div>
        <div>{countries[page.answer].name.common}</div>
        <div style={{float: 'right'}}>{round.corrects.length}&nbsp;:&nbsp;{round.fails.length}</div>
      </div>
    </div>
    <div className='GameRunning'>
      <CountryTable
        countries={page.countries.map(cca2 => countries[cca2])}
        answer={countries[page.answer]}
        onClickCountry={(entry) => {
          dispatch(selectEntry(entry))
        }} />
    </div>
  </div>
}
