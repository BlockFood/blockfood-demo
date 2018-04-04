import * as React from 'react';
import {formatCurrency} from '../../utils/FormatCurrency'

import './OrderTotal.scss';

interface OrderTotalProps {
    totalPrice: number
}

export const OrderTotal: React.SFC<OrderTotalProps> = ({totalPrice}) => (
    <div className='orderTotal'>
        <div>
            <strong>TOTAL</strong>
        </div>
        <div className='orderTotalAmount'>
            {formatCurrency(totalPrice)}
        </div>
    </div>
);
