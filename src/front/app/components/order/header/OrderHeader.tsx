import * as React from 'react'
import {formatTime} from '../../../utils/FormatTime'

import './OrderHeader.scss'

interface OrderHeaderProps {
    id?: string
    time?: number
}

export const OrderHeader: React.SFC<OrderHeaderProps> = ({id, time}) => (
    <div className='orderHeader'>
        {
            id &&
            <div className='orderHeaderLabel'>
                Order #{id}
            </div>
        }
        {
            time &&
            <div className='orderHeaderTime'>
                🕑 {formatTime(new Date(time))}
            </div>
        }
    </div>
)