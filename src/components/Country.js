import React from 'react'

const Country = (country) => {
  return (
    <div className='Country'>
      <span>{Country.name.common}</span>
      <pre style={{fontSize: 'xx-small'}}>{JSON.stringify(country, 0, 2)}</pre>
    </div>
  )
}

export default Country
