/*
  transform the array
  https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json
  to an object with cca2 as keys
*/

const fs = require('fs')
const request = require('request')
const JSONStream = require('JSONStream')
const es = require('event-stream')

const url = 'https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json'

const countries = {}

request({url})
  .pipe(JSONStream.parse('*'))
  .pipe(es.mapSync(function (country) {
    countries[country.cca2] = country
    return country
  }))
  .on('end', function () {
    fs.writeFileSync('./_countries.json', JSON.stringify(countries))
  })
