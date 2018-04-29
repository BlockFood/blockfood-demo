import * as React from 'react'

import './OrderLoader.scss'

export const OrderLoader: React.SFC<any> = () => (
    <div className='orderLoader'>
        <i className="spin-circle-loader-small fa-spin"/>
    </div>
)
