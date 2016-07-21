import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configure-store'

const store = configureStore({});

import Counters from './components/counters'

render(
  <Provider store={store}>
    <Counters />
  </Provider>, document.getElementById('app')
)