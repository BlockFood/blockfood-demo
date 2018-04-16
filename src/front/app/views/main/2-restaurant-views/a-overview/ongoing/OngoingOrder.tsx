import * as React from 'react'
import {Order} from '../common/order/Order'
import {OrderHeader} from '../common/orderHeader/OrderHeader'
import {OrderOrderedItemList} from '../common/orderOrderedItemList/OrderOrderedItemList'
import {OrderComment} from '../common/orderComment/OrderComment'
import {OngoingOrderButtons} from './buttons/OngoingOrderButtons'
import {IOrderedItem} from '../common/orderOrderedItemList/orderOrderedItem/IOrderedItem'

import './OngoingOrder.scss'

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
