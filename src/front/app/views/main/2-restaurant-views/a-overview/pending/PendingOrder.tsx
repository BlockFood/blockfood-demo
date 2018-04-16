import * as React from 'react'
import {Order} from '../common/order/Order'
import {OrderHeader} from '../common/orderHeader/OrderHeader'
import {OrderOrderedItemList} from '../common/orderOrderedItemList/OrderOrderedItemList'
import {OrderComment} from '../common/orderComment/OrderComment'
import {PendingOrderButtons} from './buttons/PendingOrderButtons'
import {IOrderedItem} from '../common/orderOrderedItemList/orderOrderedItem/IOrderedItem'

interface PendingOrderProps {
    orderId: string
    orderTime?: Date
    orderedItems: IOrderedItem[]
    comment?: string
    onAccept?: (orderId: string) => void
    onDecline?: () => void
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
        const {orderId, orderTime, orderedItems, comment, onDecline} = this.props

        return (
            <Order className='pendingOrder'>
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
            </Order>
        )
    }
}