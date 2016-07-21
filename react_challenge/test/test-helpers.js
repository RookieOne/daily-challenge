import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'configure-store'

import TestUtils from 'react-addons-test-utils'
import { renderToStaticMarkup } from 'react-dom/server'
import cheerio from 'cheerio'

export class ReactTestHelper {
  render (Component) {
    this.store = configureStore({})
    const wrappedComponent = (<Provider store={this.store}>
      {Component}
    </Provider>)
    this.wrappedComponent = wrappedComponent
    this.renderedComponent = TestUtils.renderIntoDocument(wrappedComponent)
  }
  renderHTML () {
    console.log(renderToStaticMarkup(this.wrappedComponent))
    return cheerio.load(renderToStaticMarkup(this.wrappedComponent))
  }
}