import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../../state/InitialState'
import withDemoController from '../../../../demoController/WithDemoController'
import {IOrder, IOrderDetail, ORDER_STATUS} from '../../../../../../lib/Orders'
import {MENU_ITEMS_BY_IDS} from '../../../../../../lib/Restaurants'
import Api from '../../../../api/Api'
import doWithMinTime from '../../../../utils/DoWithMinTime'
import {selectOrdersByRestaurantId} from '../../../../state/Selectors'
import {setOrders} from '../../../../state/Actions'
import {IOrderedItem} from '../../../../components/order/orderedItemList/orderOrderedItem/IOrderedItem'
import {PendingOrder} from './pending/PendingOrder'
import {OngoingOrder} from './ongoing/OngoingOrder'
import {FinishedOrder} from './finished/FinishedOrder'

import './RestaurantOverview.scss'

class RestaurantOverview extends React.Component<any, any> {
   private menuItems: any

    constructor(props: any) {
        super(props)

        const {restaurantId} = this.props.match.params
        this.menuItems = MENU_ITEMS_BY_IDS[restaurantId]

        this.state = {
            loadingIds: {}
        }

        this.acceptOrder = this.acceptOrder.bind(this)
        this.finishOrder = this.finishOrder.bind(this)
    }

    acceptOrder = async (orderId: string) => {
        if (!this.state.loadingIds[orderId]) {
            const newLoadingIdsBefore = _.assign({}, this.state.loadingIds, {[orderId]: true})
            this.setState({loadingIds: newLoadingIdsBefore})

            const orders = await doWithMinTime(() => Api.updateOrderStatus(orderId, ORDER_STATUS.ACCEPTED))

            this.props.dispatch(setOrders(orders))
            if (this.props.demoController.goToNextStep()) {
                const newLoadingIdsAfter = _.assign({}, this.state.loadingIds)
                delete newLoadingIdsAfter[orderId]
                this.setState({loadingIds: newLoadingIdsAfter})
            }
        }
    }

    finishOrder = async (orderId: string) => {
        if (!this.state.loadingIds[orderId]) {
            const newLoadingIdsBefore = _.assign({}, this.state.loadingIds, {[orderId]: true})
            this.setState({loadingIds: newLoadingIdsBefore})

            const orders = await doWithMinTime(() => Api.updateOrderStatus(orderId, ORDER_STATUS.READY))

            this.props.dispatch(setOrders(orders))
            if (this.props.demoController.goToNextStep()) {
                const newLoadingIdsAfter = _.assign({}, this.state.loadingIds)
                delete newLoadingIdsAfter[orderId]
                this.setState({loadingIds: newLoadingIdsAfter})
            }
        }
    }

    render() {
        const {ordersByStatus} = this.props
        const {loadingIds} = this.state

        const getOrderedItems = (order: IOrder): IOrderedItem[] => {
            return order.details.map((detail: IOrderDetail) => {
                const menuItem = this.menuItems[detail.menuItemId]

                return {
                    label: menuItem.name,
                    count: detail.quantity,
                    totalItemPrice: menuItem.price_eth * detail.quantity,
                }
            })
        }

        return (
            <div id="bf-demo-view-restaurant-overview">
                <div>
                    <h3>Pending</h3>
                    {ordersByStatus[0].map((order: IOrder) => (
                        <PendingOrder key={order.id}
                                      orderId={order.id}
                                      onAccept={this.acceptOrder}
                                      orderedItems={getOrderedItems(order)}
                                      loading={loadingIds[order.id]}/>
                    ))}
                </div>
                <div>
                    <h3>In Progress</h3>
                    {ordersByStatus[1].map((order: IOrder) => (
                        <OngoingOrder key={order.id}
                                      orderId={order.id}
                                      onFinish={this.finishOrder}
                                      orderedItems={getOrderedItems(order)}
                                      loading={loadingIds[order.id]}/>
                    ))}
                </div>
                <div>
                    <h3>Done</h3>
                    {ordersByStatus[2].map((order: IOrder) => (
                        <FinishedOrder key={order.id}
                                       orderId={order.id}
                                       orderedItems={getOrderedItems(order)}/>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IState, props: any) => {
    const {restaurantId} = props.match.params

    const orders = selectOrdersByRestaurantId(state.orders, restaurantId)
    const ordersByStatus: IOrder[][] = [[], [], []]
    orders.forEach((order: IOrder) => {
        if (order.status === ORDER_STATUS.SUBMITTED) {
            ordersByStatus[0].push(order)
        }
        else if (order.status === ORDER_STATUS.ACCEPTED) {
            ordersByStatus[1].push(order)
        }
        else {
            ordersByStatus[2].push(order)
        }
    })

    return {
        ordersByStatus
    }
}

export default connect(mapStatToProps)(withDemoController(RestaurantOverview))
