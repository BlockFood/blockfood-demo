import * as React from 'react'
import {formatTime} from '../../../../../../utils/FormatTime'

import './OrderHeader.scss'

interface OrderHeaderProps {
    orderId?: string
    orderTime?: Date
}

export const OrderHeader: React.SFC<OrderHeaderProps> = ({orderId, orderTime}) => (
    <div className='orderHeader'>
        {
            orderId &&
            <div className='orderHeaderLabel'>
                Order #{orderId}
            </div>
        }
        {
            orderTime &&
            <div className='orderHeaderTime'>
                🕑 {formatTime(orderTime)}
            </div>
        }
    </div>
)