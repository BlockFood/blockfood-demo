import * as React from 'react';
import { Order } from '../Order';
import { OrderHeader } from '../OrderHeader';
import { OrderOrderedItemList } from '../OrderOrderedItemList';
import { OrderTotal } from '../OrderTotal';
import {OrderedItem} from '../OrderOrderedItemList/OrderOrderedItem'

import './FinishedOrder.css';

interface FinishedOrderProps {
    orderId: number
    deliveryTime: number | Date
    orderedItems: OrderedItem[]
}

const computeTotalPrice = (orderedItems: OrderedItem[]) => orderedItems.reduce((total, item) => total += item.totalItemPrice, 0);

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
