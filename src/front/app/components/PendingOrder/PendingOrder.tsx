import * as React from 'react';
import {Order} from '../Order';
import {OrderHeader} from '../OrderHeader';
import {OrderOrderedItemList} from '../OrderOrderedItemList';
import {OrderComment} from '../OrderComment';
import {PendingOrderButtons} from '../PendingOrderButtons';
import {IOrderedItem} from '../../../../lib/Orders'

interface PendingOrderProps {
    orderId: string
    orderTime: Date
    orderedItems: IOrderedItem[]
    comment?: string
    onAccept?: () => void
    onDecline?: () => void
}

export const PendingOrder: React.SFC<PendingOrderProps> = ({orderId, orderTime, orderedItems, comment, onAccept, onDecline}) => (
    <Order className='pendingOrder'>
        <OrderHeader
            orderId={orderId}
            orderTime={orderTime}
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
        <PendingOrderButtons
            onAccept={onAccept}
            onDecline={onDecline}
        />
    </Order>
);
