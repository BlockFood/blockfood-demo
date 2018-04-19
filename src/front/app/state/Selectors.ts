import * as _ from 'lodash'
import {IOrder, ORDER_STATUS} from '../../../lib/Orders'

export const selectOrdersByRestaurantId = (orders: IOrder[], restaurantId: string): IOrder[] => {
    return _.filter(orders, order => order.restaurantId === restaurantId)
}

export const selectOrdersCountByRestaurants = (orders: IOrder[]): any => {
    const ordersCount = {}

    _.forEach(orders, (order) => {
        if ([ORDER_STATUS.SUBMITTED, ORDER_STATUS.ACCEPTED].indexOf(order.status) !== -1) {
            ordersCount[order.restaurantId] = ordersCount[order.restaurantId] || 0
            ordersCount[order.restaurantId]++
        }
    })

    return ordersCount
}

export const selectOrdersForCourier = (orders: IOrder[]): IOrder[] => {
    return _.filter(orders, order => [
        ORDER_STATUS.READY,
        ORDER_STATUS.PICKING,
        ORDER_STATUS.DELIVERING,
        ORDER_STATUS.DONE
    ].indexOf(order.status) !== -1)
}