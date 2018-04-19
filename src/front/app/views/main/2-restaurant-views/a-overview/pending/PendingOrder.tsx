import * as React from 'react'
import {Order} from '../../../../../components/order/Order'
import {OrderHeader} from '../../../../../components/order/header/OrderHeader'
import {OrderOrderedItemList} from '../../../../../components/order/orderedItemList/OrderOrderedItemList'
import {OrderComment} from '../../../../../components/order/comment/OrderComment'
import {PendingOrderButtons} from './buttons/PendingOrderButtons'
import {OrderLoader} from '../../../../../components/order/loader/OrderLoader'
import {IOrderedItem} from '../../../../../components/order/orderedItemList/orderOrderedItem/IOrderedItem'

interface PendingOrderProps {
    orderId: string
    orderTime?: Date
    orderedItems: IOrderedItem[]
    comment?: string
    onAccept?: (orderId: string) => void
    onDecline?: () => void,
    loading: boolean
}

export class PendingOrder extends React.Component<PendingOrderProps, any> {
    constructor(props: any) {
        super(props)

        this.onAccept = this.onAccept.bind(this)
    }

    private onAccept() {
        this.props.onAccept && this.props.onAccept(this.props.orderId)
    }

    public render() {
        const {orderId, orderTime, orderedItems, comment, onDecline, loading} = this.props

        return (
            <Order className='pendingOrder' orderId={orderId}>
                <OrderHeader
                    orderId={orderId}
                    orderTime={orderTime}
                />
                <OrderOrderedItemList
                    orderedItems={orderedItems}
                />
                {
                    comment &&
                    <OrderComment
                        comment={comment}
                    />
                }
                <PendingOrderButtons
                    onAccept={this.onAccept}
                    onDecline={onDecline}
                />
                {loading && <OrderLoader/>}
            </Order>
        )
    }
}