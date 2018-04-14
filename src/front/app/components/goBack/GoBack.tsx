import * as React from 'react'

import './GoBack.scss'

export default ({onGoBack}: any) => (
    <div className="go-back" onClick={onGoBack}><i className="fas fa-long-arrow-alt-left"/>Go back</div>
)