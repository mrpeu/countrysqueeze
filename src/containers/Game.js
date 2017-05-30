import React from 'react'
import {connect} from 'react-redux'
import {GAME_STATUS} from '../reducers/game'
import {selectFilter} from '../actions'
import getGameMenu from '../components/GameMenu'
import getGameRunning from '../components/GameRunning'
import getGameEnd from '../components/GameEnd'

const getGame = (state) => {
  switch (state.status) {
    case GAME_STATUS.INIT:
    case GAME_STATUS.MENU:
      return getGameMenu(state, selectFilter)

    case GAME_STATUS.RUNNING:
      return getGameRunning(state)

    case GAME_STATUS.END:
      return getGameEnd(state)

    default:
      return <span>[Game] ERROR: <pre>{JSON.stringify(state, 0, 2)}</pre></span>
  }
}

const Game = (state) => {
  return <div className='Game'>
    {getGame(state)}
  </div>
}

const mapStateToProps = (state, ownProps) => ({
  ...state.game
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
