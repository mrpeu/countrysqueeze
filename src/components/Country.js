import React from 'react'

const Country = ({country, onClickCountry}) => {
  return (
    <div className='Country' onClick={e => {
      e.preventDefault()
      onClickCountry(country.cca2)
    }}>
      <div className='cca2'>{country.cca2}</div>
      <div className='name'>{country.name.common}</div>
    </div>
  )
}
// <pre style={{fontSize: 'xx-small'}}>{JSON.stringify(country, 0, 2)}</pre>

export default Country
