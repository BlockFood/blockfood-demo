import * as React from 'react'
import {ORDER_STATUS} from '../../../../../lib/Orders'

import './OrderStatus.scss'

interface OrderHeaderProps {
    status?: ORDER_STATUS
}

export const OrderStatus: React.SFC<OrderHeaderProps> = ({status}) => (
    <div className='orderStatus'>
        <span>{status}</span>
    </div>
)