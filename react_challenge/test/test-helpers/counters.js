import $ from 'cheerio'

export function getDisplayedCounts (counters) {
  let result = {}
  counters.each((i, elem) => {
    let counterName = $(elem).find('.counter-name').text()
    let counterCount = parseInt($(elem).find('.counter-count').text())
    result[counterName] = counterCount
  })
  return result
}
