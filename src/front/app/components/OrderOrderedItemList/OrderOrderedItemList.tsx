import * as React from 'react';
import {OrderOrderedItem} from './OrderOrderedItem';
import {IOrderedItem} from '../../../../lib/Orders'

import './OrderOrderedItemList.scss';

interface OrderOrderedItemListProps {
    orderedItems: IOrderedItem[]
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
