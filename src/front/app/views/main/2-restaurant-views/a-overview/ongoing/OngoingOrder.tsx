import * as React from 'react'
import {Order} from '../../../../../components/order/Order'
import {OrderHeader} from '../../../../../components/order/header/OrderHeader'
import {OrderOrderedItemList} from '../../../../../components/order/orderedItemList/OrderOrderedItemList'
import {OrderComment} from '../../../../../components/order/comment/OrderComment'
import {OngoingOrderButtons} from './buttons/OngoingOrderButtons'
import {OrderLoader} from '../../../../../components/order/loader/OrderLoader'
import {IOrderedItem} from '../../../../../components/order/orderedItemList/orderOrderedItem/IOrderedItem'

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
