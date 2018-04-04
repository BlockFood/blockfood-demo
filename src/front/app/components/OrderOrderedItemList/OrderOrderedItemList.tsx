import * as React from 'react';
import {OrderedItem, OrderOrderedItem} from './OrderOrderedItem';

import './OrderOrderedItemList.scss';

interface OrderOrderedItemListProps {
    orderedItems: OrderedItem[]
}

export const OrderOrderedItemList: React.SFC<OrderOrderedItemListProps> = ({orderedItems}) => (
    <ul className='orderOrderedItems'>
        {
            orderedItems.map(({label, count, totalItemPrice}) => (
                <OrderOrderedItem
                    key={label}
                    label={label}
                    count={count}
                    totalItemPrice={totalItemPrice}
                />
            ))
        }
    </ul>
);
