const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const getCharts = function (event) {
  event.preventDefault()
  console.log('get charts working')
  const ticker = $('#ticker').val()
  const option = $('input[name=option]:checked').val()
  if (!store[ticker]) {
    store[ticker] = {}
  }
  if (!store[ticker][option]) {
    store[ticker][option] = {}
  }
  if (store[ticker][option].financials && store[ticker][option].metrics) {
    ui.showChart(store[ticker][option].financials, store[ticker][option].metrics)
  } else {
    console.log(store)
    // console.log(event.target)
    // store.ticker = ($('#ticker').val())
    // console.log(store)
    console.log(option)
    $.when(
      api.getFinancials(ticker, option),
      api.getEnterpriseValue(ticker, option)
    )
      .then((data1, data2) => ui.showData(data1, data2, ticker, option))
  }
}

// get Balance sheet data and send to ui.showBalanceSheet

const getBalanceSheet = function (event) {
  event.preventDefault()
  // grab the #ticker element value from the event object
  const ticker = event.target.children[1].value
  console.log(ticker)
  const option = $('input[name=option]:checked').val()
  if (!store[ticker]) {
    store[ticker] = {}
  }
  if (!store[ticker][option]) {
    store[ticker][option] = {}
  }
  if (store[ticker][option].balanceSheet && store[ticker][option].metrics) {
    console.log(store)
    ui.showBalanceSheetChart(store[ticker][option].balanceSheet, store[ticker][option].metrics)
  } else {
    $.when(
      api.getBalanceSheetData(ticker, option),
      api.getEnterpriseValue(ticker, option))
      .then((data1, data2) => ui.showBalanceSheet(data1, data2, ticker, option))
  }
}

module.exports = {
  getCharts,
  getBalanceSheet
}
