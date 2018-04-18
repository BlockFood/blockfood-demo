import * as React from 'react'
import { Order } from '../../../../../components/order/Order'
import { OrderHeader } from '../../../../../components/order/header/OrderHeader'
import { OrderOrderedItemList } from '../../../../../components/order/orderedItemList/OrderOrderedItemList'
import { OrderTotal } from '../../../../../components/order/total/OrderTotal'
import {IOrderedItem} from '../../../../../components/order/orderedItemList/orderOrderedItem/IOrderedItem'

import './FinishedOrder.scss'

interface FinishedOrderProps {
    orderId: string
    orderTime?: Date
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
