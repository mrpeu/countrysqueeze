import React from 'react'
import Header from './Header'
import Game from '../containers/Game'
import MainToolbar from '../containers/MainToolbar'
import './App.css'

export default () => (
  <div className='App'>
    <Header />
    <MainToolbar />
    <Game />
  </div>
)
