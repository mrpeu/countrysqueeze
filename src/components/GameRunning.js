import React from 'react'
import {selectAnswer} from '../actions'
import CountryTable from './CountryTable'

export default ({status, currentRoundId, rounds, dispatch}) => {
  const currentRound = rounds.find(r => r.id === currentRoundId)
  const countries = currentRound.countries.slice(
    currentRound.pageIndex,
    currentRound.pageIndex + currentRound.pageLength
  )
  const currentAnswer = currentRound.countries[currentRound.answer]

  return <div>
    <div>&nbsp;
      <div style={{float: 'left'}}>progress:&nbsp;
        {currentRound.pageIndex} - {currentRound.pageIndex + currentRound.pageLength}
        &nbsp;/&nbsp;
        {currentRound.countries.length}
      </div>
      <div style={{float: 'right'}}>
        {currentRound.corrects.length}&nbsp;:&nbsp;{currentRound.fails.length}
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
