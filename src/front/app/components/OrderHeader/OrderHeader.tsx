import * as React from 'react';
import {formatTime} from '../../utils/FormatTime'

import './OrderHeader.scss';

interface OrderHeaderProps {
    orderId?: number
    deliveryTime: number | Date
}

/* eslint-disable jsx-a11y/accessible-emoji */
export const OrderHeader: React.SFC<OrderHeaderProps> = ({orderId, deliveryTime}) => (
    <div className='orderHeader'>
        {
            orderId &&
            <div className='orderHeaderLabel'>
                Commande #{orderId}
            </div>
        }
        <div className='orderHeaderTime'>
            🕑 {formatTime(deliveryTime)}
        </div>
    </div>
);
/* eslint-enable jsx-a11y/accessible-emoji */
