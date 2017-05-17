import React from 'react'

export default ({countries, countryAnswer, onClickCountry}) => {
  return (
    <div className='CountryTable'>
      <h3>CountryTable</h3>
      <div>{countryAnswer.cca2}</div>
      {countries.map(c =>
        <div key={c.cca2} onClick={e => onClickCountry(c)}>
          {c.name.common}&nbsp;({c.cca2}=={countryAnswer.cca2})
        </div>
      )}
    </div>
  )
}
