
const getFinancials = function (ticker, options) {
  // return an array with index[0]: financial data and index[1]: enterprise data
  return $.ajax({
    url: 'https://financialmodelingprep.com/api/v3/financials/income-statement/' + ticker + options
  })
}

const getEnterpriseValue = function (ticker, options) {
  // return an array with index[0]: financial data and index[1]: enterprise data
  return $.ajax({
    url: 'https://financialmodelingprep.com/api/v3/company-key-metrics/' + ticker + options
  })
}

const getBalanceSheetData = function (ticker, options) {
  // return an array with index[0]: financial data and index[1]: enterprise data
  return $.ajax({
    url: 'https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/' + ticker + options
  })
}

module.exports = {
  getFinancials,
  getEnterpriseValue,
  getBalanceSheetData
}
