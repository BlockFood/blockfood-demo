import * as React from 'react'
import { Order } from '../common/order/Order'
import { OrderHeader } from '../common/orderHeader/OrderHeader'
import { OrderOrderedItemList } from '../common/orderOrderedItemList/OrderOrderedItemList'
import { OrderTotal } from '../common/orderTotal/OrderTotal'
import {IOrderedItem} from '../common/orderOrderedItemList/orderOrderedItem/IOrderedItem'

import './FinishedOrder.scss'

interface FinishedOrderProps {
    orderId: string
    orderTime: Date
    orderedItems: IOrderedItem[]
}

const computeTotalPrice = (orderedItems: IOrderedItem[]) => orderedItems.reduce((total, item) => (item && item.totalItemPrice) ? total + item.totalItemPrice : total, 0)

export const FinishedOrder: React.SFC<FinishedOrderProps> = ({ orderId, orderTime, orderedItems }) => (
  <Order className='finishedOrder'>
    <OrderHeader
      orderId={orderId}
      orderTime={orderTime}
    />
    <OrderOrderedItemList
      orderedItems={orderedItems}
    />
    <OrderTotal
      totalPrice={computeTotalPrice(orderedItems)}
    />
  </Order>
)
