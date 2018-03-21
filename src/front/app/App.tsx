import * as React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import Store from './state/Store'

import './App.scss'

export default () => (
    <Provider store={Store}>
        <BrowserRouter>
            <div>Hello world</div>
        </BrowserRouter>
    </Provider>
)
