import * as React from 'react'
import {Order} from '../order/Order'
import {OrderHeader} from '../orderHeader/OrderHeader'
import {OrderOrderedItemList} from '../orderOrderedItemList/OrderOrderedItemList'
import {OrderComment} from '../orderComment/OrderComment'
import {PendingOrderButtons} from '../pendingOrderButtons/PendingOrderButtons'
import {IOrderedItem} from '../../../../../../../lib/Orders'

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
)
