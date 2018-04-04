import * as React from 'react';
import {Order} from '../Order';
import {OrderHeader} from '../OrderHeader';
import {OrderOrderedItemList} from '../OrderOrderedItemList';
import {OrderComment} from '../OrderComment';
import { OrderedItem } from '../OrderOrderedItemList/OrderOrderedItem'

import './OngoingOrder.scss';

interface OngoingOrderProps {
    orderId: number
    deliveryTime: number | Date
    orderedItems: OrderedItem[]
    comment: string
}

export const OngoingOrder: React.SFC<OngoingOrderProps> = ({orderId, deliveryTime, orderedItems, comment}) => (
    <Order className='ongoingOrder'>
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
    </Order>
);
