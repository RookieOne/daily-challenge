import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'configure-store'
import _ from 'lodash'

import TestUtils from 'react-addons-test-utils'
import { renderToStaticMarkup } from 'react-dom/server'
import cheerio from 'cheerio'

export class ReactTestHelper {
  render (Component, state = {}) {
    this.store = configureStore(state)
    const wrappedComponent = (<Provider store={this.store}>
      {Component}
    </Provider>)
    this.wrappedComponent = wrappedComponent
    this.renderedComponent = TestUtils.renderIntoDocument(wrappedComponent)
  }
  debugHTML () {
    return renderToStaticMarkup(this.wrappedComponent)
  }
  renderHTML () {
    return cheerio.load(renderToStaticMarkup(this.wrappedComponent))
  }
  findComponent (ComponentType) {
    const components = TestUtils.scryRenderedComponentsWithType(this.renderedComponent, ComponentType)
    if (components.length === 0) {
      throw new Error(`Could not find component - ${ComponentType}`)
    } else if (components.length > 1) {
      throw new Error(`Found more than one component - ${ComponentType}`)
    }
    return components[0]
  }
  findComponents (ComponentType) {
    const components = TestUtils.scryRenderedComponentsWithType(this.renderedComponent, ComponentType)
    if (components.length === 0) {
      throw new Error(`Could not find component - ${ComponentType}`)
    }
    return components
  }
  setValue (component = this.renderedComponent, name, value) {
    var inputs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
    var input = _.find(inputs, { name })
    input.value = value
    TestUtils.Simulate.change(input)
  }
  clickButton (component = this.renderedComponent, name) {
    var buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
    var button = _.find(buttons, { name })
    TestUtils.Simulate.click(button)
  }
  getState () {
    return this.store.getState()
  }
}
