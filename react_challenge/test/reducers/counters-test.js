import { assert } from 'chai'
import { getTotalCounts, addCounter, changeNewCounterName, incrementCounter, decrementCounter } from 'reducers/counters'
import _ from 'lodash'

describe('Counters Reducer', () => {
  describe('getTotalCounts', () => {
    it('should sum with no counters', () => {
      const counters = []
      assert.equal(0, getTotalCounts(counters))
    })
    it('should sum up with one counter', () => {
      const counters = [{ count: 10 }]
      assert.equal(10, getTotalCounts(counters))
    })
    it('should sum up all counters', () => {
      const counters = [{ count: 1 }, { count: 3 }]
      assert.equal(4, getTotalCounts(counters))
    })
  })

  describe('addCounter', () => {
    it('should add a counter to empty array', () => {
      const initialState = {
        counters: []
      }
      const state = addCounter(initialState, 'Greyhounds')
      assert.equal(1, state.counters.length)
    })
    it('should add a second counter', () => {
      const initialState = {
        counters: [{id: 1, name: 'Dogs', count: 0}]
      }
      const state = addCounter(initialState, 'Greyhounds')
      assert.equal(2, state.counters.length)
    })
  })

  describe('changeNewCounterName', () => {
    it('should change new counter name', () => {
      const initialState = {
        newCounterName: 'Cats'
      }
      const state = changeNewCounterName(initialState, 'Kittens')
      assert.equal('Kittens', state.newCounterName)
    })
    it('should change new counter name even if blank', () => {
      const initialState = {}
      const state = changeNewCounterName(initialState, 'Kittens')
      assert.equal('Kittens', state.newCounterName)
    })
  })

  describe('incrementCounter', () => {
    it('should increment counter count', () => {
      const initialState = {
        counters: [{ name: 'Greyhounds', count: 2 }]
      }
      const state = incrementCounter(initialState, 'Greyhounds')
      assert.equal(3, _.findWhere(state.counters, { name: 'Greyhounds' }).count)
    })
    it('should increment counter count and not change other counters', () => {
      const initialState = {
        counters: [{ name: 'Greyhounds', count: 10 }, { name: 'Dogs', count: 8 }]
      }
      const state = incrementCounter(initialState, 'Greyhounds')
      assert.equal(11, _.findWhere(state.counters, { name: 'Greyhounds' }).count)
      assert.equal(8, _.findWhere(state.counters, { name: 'Dogs' }).count)
    })
  })

  describe('decrementCounter', () => {
    it('should decrement counter count', () => {
      const initialState = {
        counters: [{ name: 'Greyhounds', count: 2 }]
      }
      const state = decrementCounter(initialState, 'Greyhounds')
      assert.equal(1, _.findWhere(state.counters, { name: 'Greyhounds' }).count)
    })
    it('should decrement counter count and not change other counters', () => {
      const initialState = {
        counters: [{ name: 'Greyhounds', count: 10 }, { name: 'Dogs', count: 8 }]
      }
      const state = decrementCounter(initialState, 'Greyhounds')
      assert.equal(9, _.findWhere(state.counters, { name: 'Greyhounds' }).count)
      assert.equal(8, _.findWhere(state.counters, { name: 'Dogs' }).count)
    })
  })
})
