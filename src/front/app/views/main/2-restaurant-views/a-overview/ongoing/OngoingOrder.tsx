import * as React from 'react'
import {Order} from '../common/order/Order'
import {OrderHeader} from '../common/orderHeader/OrderHeader'
import {OrderOrderedItemList} from '../common/orderOrderedItemList/OrderOrderedItemList'
import {OrderComment} from '../common/orderComment/OrderComment'
import {OngoingOrderButtons} from './buttons/OngoingOrderButtons'
import {OrderLoader} from '../common/orderLoader/OrderLoader'
import {IOrderedItem} from '../common/orderOrderedItemList/orderOrderedItem/IOrderedItem'

import './OngoingOrder.scss'

interface OngoingOrderProps {
    orderId: string
    orderTime?: Date
    orderedItems: IOrderedItem[]
    comment?: string
    onFinish?: (orderId: string) => void,
    loading: boolean
}

export class OngoingOrder extends React.Component<OngoingOrderProps, any> {
    constructor(props: any) {
        super(props)

        this.onFinish = this.onFinish.bind(this)
    }

    private onFinish() {
        this.props.onFinish && this.props.onFinish(this.props.orderId)
    }

    public render() {
        const {orderId, orderTime, orderedItems, comment, loading} = this.props

        return (
            <Order className='ongoingOrder'>
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
                <OngoingOrderButtons
                    onFinish={this.onFinish}
                />
                {loading && <OrderLoader/>}
            </Order>
        )
    }
}
