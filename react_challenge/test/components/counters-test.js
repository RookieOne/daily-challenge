import { assert } from 'chai'
import React from 'react'
import Counters, { Counter } from 'components/counters'
import AddCounter from 'components/add-counter'
import { ReactTestHelper } from 'test-helpers/react'
import { startingCounters, getCounterCount, getDisplayedCountsFor, getStoreCountsFor, getDisplayedTotalCount } from 'test-helpers/counters'
import _ from 'lodash'

describe('<Counters />', function () {
  it('should have the title "Counter App"', () => {
    this.render(<Counters />)
    const $ = this.renderHTML()
    assert.equal('Counter App', $('h1').html())
  })

  describe('displaying counters', () => {
    beforeEach(() => {
      const state = startingCounters([
        {id: 1, name: 'Cats', count: 2},
        {id: 2, name: 'Dogs', count: 4}
      ])
      this.render(<Counters />, state)
    })
    it('should have correct number of counters', () => {
      assert.equal(2, getCounterCount(this))
    })
    it('should show count for Dogs counter', () => {
      assert.equal(4, getDisplayedCountsFor(this, 'Dogs'))
    })
    it('should show count for Cats counter', () => {
      assert.equal(2, getDisplayedCountsFor(this, 'Cats'))
    })
    it('should show total counts', () => {
      assert.equal(6, getDisplayedTotalCount(this))
    })
  })

  describe('adding counter', () => {
    beforeEach(() => {
      this.render(<Counters />)
      const addCounter = this.findComponent(AddCounter)
      this.setValue(addCounter, 'new-counter-name', 'Greyhounds')
      this.clickButton(addCounter, 'add-counter-btn')
    })
    it('should add a counter', () => {
      assert.equal(1, getCounterCount(this))
    })
    it('should show count for Greyhounds counter', () => {
      assert.equal(0, getDisplayedCountsFor(this, 'Greyhounds'))
    })
    it('should update counters in state', () => {
      assert.equal(0, getStoreCountsFor(this, 'Greyhounds'))
    })
    it('should show total counts', () => {
      assert.equal(0, getDisplayedTotalCount(this))
    })
  })

  describe('incrementing counter', () => {
    beforeEach(() => {
      const state = startingCounters([
        {id: 1, name: 'Cats', count: 2},
        {id: 2, name: 'Dogs', count: 4}
      ])
      this.render(<Counters />, state)

      const components = this.findComponents(Counter)
      const dog = _.findWhere(components, { props: { counter: { name: 'Dogs' } } })
      this.clickButton(dog, 'increment-btn')
    })
    it('should keep same number of counters', () => {
      assert.equal(2, getCounterCount(this))
    })
    it('should increment count for Dogs counter', () => {
      assert.equal(5, getDisplayedCountsFor(this, 'Dogs'))
    })
    it('should keep count for Cats counter', () => {
      assert.equal(2, getDisplayedCountsFor(this, 'Cats'))
    })
    it('should update counters in state', () => {
      assert.equal(5, getStoreCountsFor(this, 'Dogs'))
    })
    it('should show total counts', () => {
      assert.equal(7, getDisplayedTotalCount(this))
    })
  })

  describe('decrementing counter', () => {
    beforeEach(() => {
      const state = startingCounters([
        {id: 1, name: 'Cats', count: 2},
        {id: 2, name: 'Dogs', count: 4}
      ])
      this.render(<Counters />, state)

      const components = this.findComponents(Counter)
      const dog = _.findWhere(components, { props: { counter: { name: 'Dogs' } } })
      this.clickButton(dog, 'decrement-btn')
    })
    it('should keep same number of counters', () => {
      assert.equal(2, getCounterCount(this))
    })
    it('should increment count for Dogs counter', () => {
      assert.equal(3, getDisplayedCountsFor(this, 'Dogs'))
    })
    it('should keep count for Cats counter', () => {
      assert.equal(2, getDisplayedCountsFor(this, 'Cats'))
    })
    it('should update counters in state', () => {
      assert.equal(3, getStoreCountsFor(this, 'Dogs'))
    })
    it('should show total counts', () => {
      assert.equal(5, getDisplayedTotalCount(this))
    })
  })
}.bind(new ReactTestHelper()))
