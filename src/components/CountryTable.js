import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import {Card, CardTitle} from 'material-ui/Card'

export default ({countries, countryAnswer, flags, onClickCountry}) => {
  return (
    <Card style={{
      width: '90%',
      paddingBottom: '2em',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <CardTitle
        titleStyle={{textAlign: 'center'}}
        title={countryAnswer.name.common}
      />
      <GridList className='CountryTable'>
        {countries.map(c =>
          <GridTile
            key={c.cca2}
            className='Country'
            onClick={e => onClickCountry(c)}
          >
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
          </GridTile>
        )}
      </GridList>
    </Card>
  )
}
