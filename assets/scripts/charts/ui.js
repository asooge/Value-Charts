const financialsTemplate = require('../templates/chart.handlebars')
const chart = require('chart.js')
const store = require('../store.js')

// select financial metrics from the dataset
const getLabels = function (financials) {
  return financials.map(x => x.date).reverse()
}
const getRevenue = function (financials) {
  return financials.map(x => x['Revenue']).reverse()
}
const getGrossProfit = function (financials) {
  return financials.map(x => x['Gross Profit']).reverse()
}
const getNetIncome = function (financials) {
  return financials.map(x => x['Net Income']).reverse()
}
const getMarketCap = function (metrics) {
  return metrics.map(x => x['Market Cap']).reverse()
}

// select balance sheet data from the datasets
const getTotalAssets = function (financials) {
  return financials.map(x => x['Total assets']).reverse()
}
const getTotalLiabilities = function (financials) {
  return financials.map(x => x['Total liabilities']).reverse()
}
const getTotalCash = function (financials) {
  return financials.map(x => x['Cash and cash equivalents']).reverse()
}
const getShareholderEquity = function (financials) {
  return financials.map(x => x['Total shareholders equity']).reverse()
}

// send financial data to showChart function
const showData = function (data1, data2, ticker, option) {
  store[ticker][option].financials = data1[0].financials
  store[ticker][option].metrics = data2[0].metrics
  console.log(store)
  console.log(ticker)
  console.log('showData')
  console.log(data1[0].financials)
  console.log(data2[0].metrics)
  const financials = data1[0].financials
  const metrics = data2[0].metrics

  const htmlData = financialsTemplate({
    years: financials
  })
  $('body').append(htmlData)
  console.log(getLabels(financials))

  showChart(financials, metrics)
}

// send balance sheet data to showBalanceSheetChart function
const showBalanceSheet = function (data1, data2, ticker, option) {
  const balanceSheet = data1[0].financials
  const metrics = data2[0].metrics
  store[ticker][option].balanceSheet = balanceSheet
  store[ticker][option].metrics = metrics
  console.log(store)
  console.log(balanceSheet)
  showBalanceSheetChart(balanceSheet, metrics)
}

// create new chart from financial and valuation data
const showChart = function (financials, metrics) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new chart.Chart(ctx, {
    type: 'bar',
    data: {
      labels: getLabels(financials),
      datasets: [{
        label: 'net income',
        data: getNetIncome(financials),
        backgroundColor: 'red',
        borderColor: '',
        borderWidth: 1
      },
      {
        label: 'gross profit',
        data: getGrossProfit(financials),
        backgroundColor: 'black',
        borderColor: '',
        borderWidth: 1
      },
      {
        label: 'revenue',
        data: getRevenue(financials),
        backgroundColor: 'blue',
        borderColor: '',
        borderWidth: 1
      },
      {
        label: 'market cap',
        data: getMarketCap(metrics),
        backgroundColor: 'green',
        borderColor: '',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{ stacked: true }],
        yAxes: [
          { stacked: false }
        ]}
    }
  })
}

// create a new Chart to display Balance sheet data1
  // display Total Assets "Total assets"
  // display Total Liabilities "Total liabilities"
  // display Cash "Cash and cash equivalents"
  // display Shareholder Equity "Total shareholders equity"

const showBalanceSheetChart = function (balanceSheet, metrics) {
  const ctx = document.getElementById('myChart').getContext('2d')
  const myChart = new chart.Chart(ctx, {
    type: 'bar',
    data: {
      labels: getLabels(balanceSheet),
      datasets: [{
        label: 'total assets',
        data: getTotalAssets(balanceSheet),
        backgroundColor: 'red',
        borderColor: '',
        borderWidth: 1
      },
      {
        label: 'total liabilities',
        data: getTotalLiabilities(balanceSheet),
        backgroundColor: 'black',
        borderColor: '',
        borderWidth: 1
      },
      {
        label: 'total cash',
        data: getTotalCash(balanceSheet),
        backgroundColor: 'blue',
        borderColor: '',
        borderWidth: 1
      },
      {
        label: 'shareholder equity',
        data: getShareholderEquity(balanceSheet),
        backgroundColor: 'orange',
        borderColor: '',
        borderWidth: 1
      },
      {
        label: 'market cap',
        data: getMarketCap(metrics),
        backgroundColor: 'green',
        borderColor: '',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [
        ]}
    }
  })
}
module.exports = {
  showData,
  showBalanceSheet,
  showChart,
  showBalanceSheetChart
}
