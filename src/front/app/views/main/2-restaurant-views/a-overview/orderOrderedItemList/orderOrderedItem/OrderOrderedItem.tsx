import * as React from 'react'
import {formatCurrency} from '../../../../../../utils/FormatCurrency'
import {IOrderedItem} from '../../../../../../../../lib/Orders'

import './OrderOrderedItem.scss'

export const OrderOrderedItem = ({label, count, totalItemPrice}: IOrderedItem) => (
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
)
