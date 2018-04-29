import * as React from 'react'
import {IOrderedItem} from './orderedItemList/orderOrderedItem/IOrderedItem'
import {IOrder, IOrderDetail} from '../../../../lib/Orders'
import {MENU_ITEMS_BY_IDS, RESTAURANTS_BY_IDS} from '../../../../lib/Restaurants'
import {OrderHeader} from './header/OrderHeader'
import {OrderRestaurant} from './restaurant/OrderRestaurant'
import {OrderOrderedItemList} from './orderedItemList/OrderOrderedItemList'
import {OrderComment} from './comment/OrderComment'
import {OrderTotal} from './total/OrderTotal'
import {OrderStatus} from './status/OrderStatus'
import {OrderButtons} from './buttons/OrderButtons'
import {OrderLoader} from './loader/OrderLoader'

import './Order.scss'

interface OrderProps {
    className?: string
    order: IOrder
    showAll?: boolean
    showRestaurantName?: boolean
    showDetails?: boolean
    showComment?: boolean
    showTotal?: boolean
    showStatus?: boolean
    onValid?: Function
    onValidLabel?: string
    onValidDisabled?: boolean
    onCancel?: Function
    onCancelLabel?: string
    onCancelDisabled?: boolean
    loading?: boolean
}

export class Order extends React.Component<OrderProps, any> {
    constructor(props: any) {
        super(props)

        this.onValid = this.props.onValid ? this.onValid.bind(this) : null
        this.onCancel = this.props.onCancel ? this.onCancel.bind(this) : null
    }

    private onValid(event: any) {
        this.props.onValid && this.props.onValid(this.props.order.id, event)
    }

    private onCancel(event: any) {
        this.props.onCancel && this.props.onCancel(this.props.order.id, event)
    }

    private getOrderedItems(): IOrderedItem[] {
        const {order} = this.props

        return order.details.map((detail: IOrderDetail) => {
            const menuItem = MENU_ITEMS_BY_IDS[order.restaurantId][detail.menuItemId]

            return {
                label: menuItem.name,
                count: detail.quantity,
                totalItemPrice: menuItem.price_eth * detail.quantity,
            }
        })
    }

    private computeTotalPrice() {
        return this.getOrderedItems().reduce((total, item) => (item && item.totalItemPrice) ? total + item.totalItemPrice : total, 0)
    }

    public render() {
        const {
            className,
            order, showAll, showRestaurantName, showDetails, showComment, showTotal, showStatus,
            onValid, onValidLabel, onValidDisabled, onCancel, onCancelLabel, onCancelDisabled,
            loading
        } = this.props

        return (
            <div className={['order', className].join(' ').trim()} data-order-id={order.id}>
                <OrderHeader id={order.id} time={order.time}/>
                {
                    (showRestaurantName || showAll) &&
                    <OrderRestaurant restaurantName={RESTAURANTS_BY_IDS[order.restaurantId].name}/>
                }
                {
                    (showDetails || showAll) &&
                    <OrderOrderedItemList items={this.getOrderedItems()}/>
                }
                {
                    ((showComment || showAll) && order.comment) &&
                    <OrderComment comment={order.comment}/>
                }
                {
                    (showTotal || showAll) &&
                    <OrderTotal totalPrice={this.computeTotalPrice()}
                    />
                }
                {
                    (showStatus || showAll) &&
                    <OrderStatus status={order.status}/>
                }
                {
                    (onValid || onCancel) &&
                    <OrderButtons onValid={this.onValid}
                                  onValidLabel={onValidLabel}
                                  onValidDisabled={onValidDisabled}
                                  onCancel={this.onCancel}
                                  onCancelLabel={onCancelLabel}
                                  onCancelDisabled={onCancelDisabled}/>
                }
                {loading && <OrderLoader/>}
            </div>
        )
    }
}