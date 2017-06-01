import React from 'react'
import {selectEntry} from '../actions'
import CountryTable from './CountryTable'

export default ({countries, roundIndex, rounds, dispatch}) => {
  const round = rounds[roundIndex]
  const page = round.pages[round.pageIndex]

  return <div>
    <div>&nbsp;
      <div style={{float: 'left'}}>progress:&nbsp;
        {round.pageIndex} - {round.pageIndex + round.pageLength}
        &nbsp;/&nbsp;
        {round.countries.length}
      </div>
      <div style={{float: 'right'}}>
        {round.corrects.length}&nbsp;:&nbsp;{round.fails.length}
      </div>
    </div>

    <CountryTable
      countries={page.countries.map(cca2 => countries[cca2])}
      countryAnswer={countries[page.answer]}
      onClickCountry={(entry) => {
        dispatch(selectEntry(entry))
      }} />
  </div>
}
