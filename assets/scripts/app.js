'use strict'
const events = require('./charts/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // Financial Income analysis
  $('#lookup').on('submit', events.getCharts)

  // Balance sheet analysis
  $('#balance-sheet-lookup').on('submit', events.getBalanceSheet)

  // Profit analysis

  // Cash Flow analysis
})
