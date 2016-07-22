import _ from 'lodash'

export function startingCounters (counters) {
  return { counters: { counters } }
}
export function getCounterCount (test) {
  const $ = test.renderHTML()
  return $('#counters li').length
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
