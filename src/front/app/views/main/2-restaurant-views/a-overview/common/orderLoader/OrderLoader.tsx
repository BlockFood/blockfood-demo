import * as React from 'react'

import './OrderLoader.scss'

export const OrderLoader: React.SFC<any> = () => (
    <div className='orderLoader'>
        <i className="fas fa-circle-notch fa-spin"/>
    </div>
)
