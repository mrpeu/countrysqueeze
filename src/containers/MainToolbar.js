import React from 'react'
import {connect} from 'react-redux'

const MainToolbar = ({dispatch}) => (
  <div className='Toolbar'>
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
