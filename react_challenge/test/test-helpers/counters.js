import _ from 'lodash'

export function startingCounters (counters) {
  return {
    counters: {
      counters,
      totalCounts: _.reduce(counters, (sum, counter) => sum + counter.count, 0)
    }
  }
}

export function getCounterCount (test) {
  const $ = test.renderHTML()
  return $('#counters li').length
}

export function getDisplayedTotalCount (test) {
  const $ = test.renderHTML()
  return $('h3 span').text()
}

export function getDisplayedCountsFor (test, counterName) {
  const $ = test.renderHTML()
  const counters = $('#counters li')
  const elem = _.find(counters, (elem) => {
    return $(elem).find('.counter-name').text() === counterName
  })
  return parseInt($(elem).find('.counter-count').text())
}

export function getStoreCountsFor (test, name) {
  const state = test.getState()
  const counter = _.find(state.counters.counters, { name })
  return counter.count
}
