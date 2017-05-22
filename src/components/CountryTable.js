import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import {Card, CardTitle} from 'material-ui/Card'

export default ({countries, countryAnswer, flags, onClickCountry}) =>
  <Card className='Page'>
    <CardTitle
      className='PageTitle'
      title={countryAnswer.name.common}
    />
    <GridList className='CountryTable'>
      {countries.map(c =>
        <GridTile
          key={c.cca2}
          className='Country'
          onClick={e => onClickCountry(c)}
        >
          <img
            className='Flag'
            src={process.env.PUBLIC_URL + 'data/' + c.cca3 + '.svg'}
            alt={`flag of ${c.name.common}`}
          />
        </GridTile>
      )}
    </GridList>
  </Card>
