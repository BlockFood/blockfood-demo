import * as React from 'react'
import {Order} from '../order/Order'
import {OrderHeader} from '../orderHeader/OrderHeader'
import {OrderOrderedItemList} from '../orderOrderedItemList/OrderOrderedItemList'
import {OrderComment} from '../orderComment/OrderComment'
import {IOrderedItem} from '../../../../../../../lib/Orders'

import './OngoingOrder.scss'
import {OngoingOrderButtons} from '../ongoingOrderButtons/OngoingOrderButtons'

interface OngoingOrderProps {
    orderId: string
    orderTime: Date
    orderedItems: IOrderedItem[]
    comment?: string
    onFinish?: () => void
}

export const OngoingOrder: React.SFC<OngoingOrderProps> = ({orderId, orderTime, orderedItems, comment, onFinish}) => (
    <Order className='ongoingOrder'>
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
        {
            onFinish &&
            <OngoingOrderButtons
                onFinish={onFinish}
            />
        }
    </Order>
)
