import React from 'react'

export default ({countries, flags, onClickCountry}) => {
  return (
    <div className='CountryTable'>
      {countries.map(c =>
        <div key={c.cca2} className='Country' onClick={e => onClickCountry(c)}>
          <div className='Card'>
            <div className='Flag'>
              <img
                src={process.env.PUBLIC_URL + 'data/' + c.cca3 + '.svg'}
                alt={`flag of ${c.name.common}`}
              />
            </div>
            <div className='Name'>
              {c.name.common}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
