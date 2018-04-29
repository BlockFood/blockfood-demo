import * as React from 'react'
import {OrderOrderedItem} from './orderOrderedItem/OrderOrderedItem'
import {IOrderedItem} from './orderOrderedItem/IOrderedItem'

import './OrderOrderedItemList.scss'

interface OrderOrderedItemListProps {
    items: IOrderedItem[]
}

export const OrderOrderedItemList: React.SFC<OrderOrderedItemListProps> = ({items}) => (
    <ul className='orderOrderedItems'>
        {
            items.map(({label, count, totalItemPrice}) => (
                <OrderOrderedItem
                    key={label}
                    label={label}
                    count={count}
                    totalItemPrice={totalItemPrice}
                />
            ))
        }
    </ul>
)
