import React from 'react'
import {connect} from 'react-redux'
import Country from '../components/Country'

const CountryTable = ({countries}) => {
  return (
    <div className='CountryTable'>
      <h2>CountryTable {countries.length}#</h2>
      {countries.map(c => (
        <Country key={c.cca3} country={c} />
      ))}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  countries: state.countries
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryTable)
