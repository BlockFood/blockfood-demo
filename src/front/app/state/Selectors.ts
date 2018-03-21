import * as _ from 'lodash'
import {IOrder, ORDER_STATUS} from '../../../lib/Orders'

export const selectOrdersByRestaurantId = (orders: IOrder[], restaurantId: string): IOrder[] => {
    return _.filter(orders, order => order.restaurantId === restaurantId)
}

export const selectOrdersForCourier = (orders: IOrder[]): IOrder[] => {
    return _.filter(orders, order => [
        ORDER_STATUS.READY,
        ORDER_STATUS.PICKING,
        ORDER_STATUS.DELIVERING,
        ORDER_STATUS.DONE
    ].indexOf(order.status))
}