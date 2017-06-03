import React from 'react'
import {selectEntry} from '../actions'
import CountryTable from './CountryTable'

export default ({countries, roundIndex, rounds, dispatch}) => {
  const round = rounds[roundIndex]
  const page = round.pages[round.pageIndex]

  return <div className='Game'>
    <div className='Header'>
      <div>
        <div>{countries[page.answer].name.common}({page.answer})</div>
      </div>
    </div>
    <div className='GameRunning'>
      <CountryTable
        countries={page.countries.map(cca2 => countries[cca2])}
        answer={countries[page.answer]}
        onClickCountry={(entry) => {
          dispatch(selectEntry(entry))
        }} />
      <div className='scoreBar'>
        <span>{`${round.pageIndex}/${round.countries.length}`}</span>
        {round.pages.map((page, i) => (
          <div key={page.answer} className={
              page.entries.length > 0
                ? page.entries.includes(page.answer)
                  ? 'correct'
                  : 'fail'
                : null
            } />
        ))}
      </div>
    </div>
  </div>
}
