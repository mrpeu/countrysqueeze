import React from 'react'
import {connect} from 'react-redux'
import {fetchCountries} from '../actions'

const MainToolbar = ({dispatch, isFetching}) => (
  <div className='Toolbar'>
    <button disabled={isFetching === true} onClick={e => {
      e.preventDefault()
      dispatch(fetchCountries())
    }}>
      Fetch data {isFetching ? '⧗' : ''}
    </button>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  ...state.tools
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainToolbar)
