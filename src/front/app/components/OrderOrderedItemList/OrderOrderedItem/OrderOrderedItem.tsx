import * as React from 'react';
import {formatCurrency} from '../../../utils/FormatCurrency'

import './OrderOrderedItem.css';

export interface OrderedItem {
    label: string
    count: number
    totalItemPrice: number
}

export const OrderOrderedItem = ({label, count, totalItemPrice}: OrderedItem) => (
    <li className='orderOrderedItem'>
        <div className='orderedItemLabel'>
            {label}
        </div>
        <div className='orderedItemCount'>
            {count > 1 ? `x${count}` : ''}
        </div>
        {
            totalItemPrice &&
            <div className='orderedItemTotalPrice'>
                {formatCurrency(totalItemPrice)}
            </div>
        }
    </li>
);
