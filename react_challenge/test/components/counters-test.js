import { assert } from 'chai'
import React from 'react'
import Counters from 'components/counters'
import { ReactTestHelper } from 'test-helpers'

describe('<Counters />', function () {
  it('should have the title "Counter App"', () => {
    this.render(<Counters />)
    const $ = this.renderHTML()
    assert.equal('Counter App', $('h1').html())
  })
}.bind(new ReactTestHelper()))
