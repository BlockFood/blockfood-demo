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
import {IOrderedItem} from './common/orderOrderedItemList/orderOrderedItem/IOrderedItem'
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
            loading: false
        }

        this.acceptOrder = this.acceptOrder.bind(this)
        this.finishOrder = this.finishOrder.bind(this)
    }

    acceptOrder = async (orderId: string) => {
        if (!this.state.loading) {
            this.setState({loading: true})

            const orders = await doWithMinTime(() => Api.updateOrderStatus(orderId, ORDER_STATUS.ACCEPTED))

            this.props.dispatch(setOrders(orders))
            this.setState({loading: false})
        }
    }

    finishOrder = async (orderId: string) => {
        if (!this.state.loading) {
            this.setState({loading: true})

            const orders = await doWithMinTime(() => Api.updateOrderStatus(orderId, ORDER_STATUS.READY))

            this.props.dispatch(setOrders(orders))
            this.props.demoController.goToNextStep() && this.setState({loading: false})
        }
    }

    render() {
        const {ordersByStatus} = this.props

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
                                      orderedItems={getOrderedItems(order)}/>
                    ))}
                </div>
                <div>
                    <h3>In Progress</h3>
                    {ordersByStatus[1].map((order: IOrder) => (
                        <OngoingOrder
                            key={order.id}
                            onFinish={() => this.finishOrder(order.id)}
                            orderId={order.id}
                            orderTime={new Date()}
                            orderedItems={[
                                {
                                    label: 'Rancheros Platters',
                                    count: 2,
                                    totalItemPrice: 18.8,
                                },
                                {
                                    label: 'Petite salade',
                                    count: 3,
                                    totalItemPrice: 7.4,
                                },
                                {
                                    label: 'Pietra 33cl',
                                    count: 1,
                                    totalItemPrice: 3.5,
                                },
                            ]}
                            comment='Les pâtes sans gluten sur le platter, je vous prie. Merci !'
                        />
                    ))}
                </div>
                <div>
                    <h3>Done</h3>
                    {ordersByStatus[2].map(
                        (order: IOrder) => (
                            <FinishedOrder
                                key={order.id}
                                orderId={order.id}
                                orderTime={new Date()}
                                orderedItems={[
                                    {
                                        label: 'Rancheros Platters',
                                        count: 2,
                                        totalItemPrice: 18.8,
                                    },
                                    {
                                        label: 'Petite salade',
                                        count: 3,
                                        totalItemPrice: 7.4,
                                    },
                                    {
                                        label: 'Pietra 33cl',
                                        count: 1,
                                        totalItemPrice: 3.5,
                                    },
                                ]}
                            />
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
