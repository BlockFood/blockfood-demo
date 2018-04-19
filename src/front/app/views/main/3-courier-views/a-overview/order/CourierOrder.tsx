import * as React from 'react'
import {Order} from '../../../../../components/order/Order'
import {OrderHeader} from '../../../../../components/order/header/OrderHeader'
import {OrderOrderedItemList} from '../../../../../components/order/orderedItemList/OrderOrderedItemList'
import {OrderComment} from '../../../../../components/order/comment/OrderComment'
import {CourierOrderButtons} from './buttons/CourierOrderButtons'
import {OrderLoader} from '../../../../../components/order/loader/OrderLoader'
import {IOrderedItem} from '../../../../../components/order/orderedItemList/orderOrderedItem/IOrderedItem'
import {ORDER_STATUS} from '../../../../../../../lib/Orders'

interface CourierOrderProps {
    orderId: string
    selected: boolean
    locked: boolean
    orderStatus: ORDER_STATUS
    orderTime?: Date
    orderedItems?: IOrderedItem[]
    restaurantName: string
    comment?: string
    onAccept?: (orderId: string) => void
    acceptDisabled: boolean
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
        const {orderId, selected, locked, orderStatus, orderTime, orderedItems, restaurantName, comment, onDecline, acceptDisabled, loading} = this.props

        let className = 'courierOrder'
        if (selected) {
            className += ' selected'
        }
        if (locked || orderStatus === ORDER_STATUS.DONE) {
            className += ' locked'
        }

        return (
            <Order className={className} orderId={orderId}>
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
                {
                    orderStatus !== ORDER_STATUS.DONE &&
                    <CourierOrderButtons
                        orderStatus={orderStatus}
                        onAccept={this.onAccept}
                        acceptDisabled={acceptDisabled}
                        onDecline={onDecline}
                    />
                }
                {loading && <OrderLoader/>}
            </Order>
        )
    }
}