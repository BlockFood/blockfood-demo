import * as React from 'react';
import {Order} from '../Order';
import {OrderHeader} from '../OrderHeader';
import {OrderOrderedItemList} from '../OrderOrderedItemList';
import {OrderComment} from '../OrderComment';
import {OrderButtons} from '../OrderButtons';
import {OrderedItem} from '../OrderOrderedItemList/OrderOrderedItem'

interface PendingOrderProps {
    orderId: string
    deliveryTime: number | Date
    orderedItems: OrderedItem[]
    comment?: string
}

export const PendingOrder: React.SFC<PendingOrderProps> = ({orderId, deliveryTime, orderedItems, comment}) => (
    <Order className='pendingOrder'>
        <OrderHeader
            orderId={orderId}
            deliveryTime={deliveryTime}
        />
        <OrderOrderedItemList
            orderedItems={orderedItems}
        />
        {
            comment &&
            <OrderComment
                comment={comment}
            />
        }
        <OrderButtons/>
    </Order>
);
