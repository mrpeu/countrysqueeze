import React from 'react'

export default ({countries, answer, flags, onClickCountry}) => {
  return <div className='CountryTable'>
    <div className='Table' style={{
      gridTemplateColumns: 'repeat(' + Math.round(Math.sqrt(countries.length)) + ', 1fr)'
    }}>
      {countries.map(country =>
        <div
          key={country.cca2}
          className='Country'
          onClick={e => onClickCountry(country)}
        >
          <img
            className='Flag'
            src={country.flag}
            alt={`flag of ${country.name.common}`}
          />
        </div>
      )}
    </div>
  </div>
}
