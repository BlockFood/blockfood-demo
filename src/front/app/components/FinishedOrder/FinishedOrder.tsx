import * as React from 'react';
import { Order } from '../Order';
import { OrderHeader } from '../OrderHeader';
import { OrderOrderedItemList } from '../OrderOrderedItemList';
import { OrderTotal } from '../OrderTotal';
import {OrderedItem} from '../OrderOrderedItemList/OrderOrderedItem'

import './FinishedOrder.scss';

interface FinishedOrderProps {
    orderId: string
    deliveryTime: number | Date
    orderedItems: OrderedItem[]
}

const computeTotalPrice = (orderedItems: OrderedItem[]) => orderedItems.reduce((total, item) => (item && item.totalItemPrice) ? total + item.totalItemPrice : total, 0);

export const FinishedOrder: React.SFC<FinishedOrderProps> = ({ orderId, deliveryTime, orderedItems }) => (
  <Order className='finishedOrder'>
    <OrderHeader
      orderId={orderId}
      deliveryTime={deliveryTime}
    />
    <OrderOrderedItemList
      orderedItems={orderedItems}
    />
    <OrderTotal
      totalPrice={computeTotalPrice(orderedItems)}
    />
  </Order>
);
