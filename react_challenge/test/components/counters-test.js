import { assert } from 'chai'
import React from 'react'
import Counters, { Counter } from 'components/counters'
import AddCounter from 'components/add-counter'
import { ReactTestHelper } from 'test-helpers/react'
import { getDisplayedCounts } from 'test-helpers/counters'
import _ from 'lodash'

describe('<Counters />', function () {
  it('should have the title "Counter App"', () => {
    this.render(<Counters />)
    const $ = this.renderHTML()
    assert.equal('Counter App', $('h1').html())
  })

  describe('displaying counters', () => {
    let counters = []
    let displayedCount = {}
    beforeEach(() => {
      const state = {
        counters: {
          counters: [
            {id: 1, name: 'Cats', count: 2},
            {id: 2, name: 'Dogs', count: 4}
          ]
        }
      }
      this.render(<Counters />, state)

      const $ = this.renderHTML()
      counters = $('#counters li')
      displayedCount = getDisplayedCounts(counters)
    })
    it ('should have correct number of counters', () => {
      assert.equal(2, counters.length)
    })
    it ('should have show count for Dogs counter', () => {
      assert.equal(4, displayedCount['Dogs'])
    })
    it ('should have show count for Cats counter', () => {
      assert.equal(2, displayedCount['Cats'])
    })
  })

  describe('adding counter', () => {
    let counters = []
    beforeEach(() => {
      this.render(<Counters />)
      const addCounter = this.findComponent(AddCounter)
      this.setValue(addCounter, 'new-counter-name', 'Greyhounds')
      this.clickButton(addCounter, 'add-counter-btn')

      const $ = this.renderHTML()
      counters = $('#counters li')
    })
    it ('should add a counter', () => {
      assert.equal(1, counters.length)
    })
    it ('should show count for Greyhounds counter', () => {
      const displayedCounts = getDisplayedCounts(counters)
      assert.equal(0, displayedCounts['Greyhounds'])
    })
    it ('should update counters in state', () => {
      const state = this.getState()
      const greyhoundCounter = _.find(state.counters.counters, { name: 'Greyhounds' })
      assert(greyhoundCounter !== undefined)
      assert.equal(0, greyhoundCounter.count)
    })
  })

  describe('incrementing counter', () => {
    let counters = []
    beforeEach(() => {
      const state = {
        counters: {
          counters: [
            {id: 1, name: 'Cats', count: 2},
            {id: 2, name: 'Dogs', count: 4}
          ]
        }
      }
      this.render(<Counters />, state)
      
      const components = this.findComponents(Counter)
      const dog = _.findWhere(components, { props: { counter: { name: 'Dogs' } } })
      this.clickButton(dog, 'increment-btn')
      
      const $ = this.renderHTML()
      counters = $('#counters li')
    })
    it ('should keep same number of counters', () => {
      assert.equal(2, counters.length)
    })
    it ('should show count for Greyhounds counter', () => {
      const displayedCounts = getDisplayedCounts(counters)
      assert.equal(5, displayedCounts['Dogs'])
    })
    it ('should update counters in state', () => {
      const state = this.getState()
      const counter = _.find(state.counters.counters, { name: 'Dogs' })
      assert(counter !== undefined)
      assert.equal(5, counter.count)
    })
  })
}.bind(new ReactTestHelper()))
