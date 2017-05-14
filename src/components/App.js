import React from 'react'
import Header from './Header'
import CountryTable from '../containers/CountryTable'
import MainToolbar from '../containers/MainToolbar'
import './App.css'

export default () => (
  <div className='App'>
    <Header />
    <MainToolbar />
    <CountryTable />
  </div>
)
