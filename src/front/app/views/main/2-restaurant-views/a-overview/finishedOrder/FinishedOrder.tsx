import * as React from 'react'
import { Order } from '../order/Order'
import { OrderHeader } from '../orderHeader/OrderHeader'
import { OrderOrderedItemList } from '../orderOrderedItemList/OrderOrderedItemList'
import { OrderTotal } from '../orderTotal/OrderTotal'
import {IOrderedItem} from '../../../../../../../lib/Orders'

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
