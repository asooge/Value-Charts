const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const getCharts = function (event) {
  event.preventDefault()
  console.log('get charts working')
  const ticker = $('#ticker').val()
  const option = $('input[name=option]:checked').val()
  // console.log(event.target)
  // store.ticker = ($('#ticker').val())
  // console.log(store)
  console.log(option)
  $.when(
    api.getFinancials(ticker, option),
    api.getEnterpriseValue(ticker, option)
  )
    .then(ui.showData)
}

// get Balance sheet data and send to ui.showBalanceSheet

const getBalanceSheet = function (event) {
  event.preventDefault()
  // grab the #ticker element value from the event object
  const ticker = event.target.children[1].value
  console.log(ticker)
  const option = $('input[name=option]:checked').val()

  $.when(
    api.getBalanceSheetData(ticker, option),
    api.getEnterpriseValue(ticker, option)
  )
    // .then(data => {
    //   console.log('getBalanceSheetData', data)
    //   return data
    // })
    .then(ui.showBalanceSheet)
}

module.exports = {
  getCharts,
  getBalanceSheet
}
