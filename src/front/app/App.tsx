import * as React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import Store from './state/Store'
import ViewRouter from './views/ViewRouter'

import './App.scss'

export default () => (
    <Provider store={Store}>
        <BrowserRouter>
            <ViewRouter/>
        </BrowserRouter>
    </Provider>
)
