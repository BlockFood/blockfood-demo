import * as React from 'react'
import {Order} from '../../../../../components/order/Order'
import {OrderHeader} from '../../../../../components/order/header/OrderHeader'
import {OrderOrderedItemList} from '../../../../../components/order/orderedItemList/OrderOrderedItemList'
import {OrderComment} from '../../../../../components/order/comment/OrderComment'
import {CourierOrderButtons} from './buttons/CourierOrderButtons'
import {OrderLoader} from '../../../../../components/order/loader/OrderLoader'
import {IOrderedItem} from '../../../../../components/order/orderedItemList/orderOrderedItem/IOrderedItem'

interface CourierOrderProps {
    orderId: string
    selected: boolean
    orderTime?: Date
    orderedItems?: IOrderedItem[]
    restaurantName: string
    comment?: string
    onAccept?: (orderId: string) => void
    onDecline?: () => void,
    loading: boolean
}

export class CourierOrder extends React.Component<CourierOrderProps, any> {
    constructor(props: any) {
        super(props)

        this.onAccept = this.onAccept.bind(this)
    }

    private onAccept() {
        this.props.onAccept && this.props.onAccept(this.props.orderId)
    }

    public render() {
        const {orderId, selected, orderTime, orderedItems, restaurantName, comment, onDecline, loading} = this.props

        return (
            <Order className={`courierOrder${selected ? ' selected' : ''}`} orderId={orderId}>
                <OrderHeader
                    orderId={orderId}
                    orderTime={orderTime}
                />
                {
                    orderedItems &&
                    <OrderOrderedItemList
                        orderedItems={orderedItems}
                    />
                }
                {
                    restaurantName &&
                    <OrderComment
                        comment={restaurantName}
                    />
                }
                {
                    comment &&
                    <OrderComment
                        comment={comment}
                    />
                }
                <CourierOrderButtons
                    onAccept={this.onAccept}
                    onDecline={onDecline}
                />
                {loading && <OrderLoader/>}
            </Order>
        )
    }
}