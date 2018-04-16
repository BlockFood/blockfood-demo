import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../../state/InitialState'
import withDemoController from '../../../../demoController/WithDemoController'
import {IOrder, ORDER_STATUS} from '../../../../../../lib/Orders'
import Api from '../../../../api/Api'
import doWithMinTime from '../../../../utils/DoWithMinTime'
import {selectOrdersByRestaurantId} from '../../../../state/Selectors'
import {setOrders} from '../../../../state/Actions'
import {PendingOrder} from './pendingOrder/PendingOrder'
import {OngoingOrder} from './ongoingOrder/OngoingOrder'
import {FinishedOrder} from './finishedOrder/FinishedOrder'

import './RestaurantOverview.scss'

class RestaurantOverview extends React.Component<any, any> {
    state = {
        loading: false,
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
        const {orders} = this.props

        let ordersByStatus = {}
        Object.keys(ORDER_STATUS).forEach((status: string) => {
            ordersByStatus[status] = orders.filter((order: IOrder) => order.status === status)
        })

        return (
            <div id="bf-demo-view-restaurant-overview">
                <div>
                    <h3 style={{color: '#4b3f80', fontWeight: 'bold', fontSize: 18, marginTop: 0}}>
                        Commandes en attente
                    </h3>
                    {
                        ordersByStatus[ORDER_STATUS.SUBMITTED].map(
                            (order: IOrder) => (
                                <PendingOrder
                                    key={order.id}
                                    onAccept={() => this.acceptOrder(order.id)}
                                    onDecline={() => alert('faut arrondir les fins de mois ¯\\_(ツ)_/¯')}
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
                            ),
                        )
                    }
                </div>
                <div>
                    <h3 style={{color: '#4b3f80', fontWeight: 'bold', fontSize: 18, marginTop: 0}}>
                        En cours
                    </h3>
                    {
                        ordersByStatus[ORDER_STATUS.ACCEPTED].map(
                            (order: IOrder) => (
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
                            ),
                        )
                    }
                </div>
                <div>
                    <h3 style={{color: '#4b3f80', fontWeight: 'bold', fontSize: 18, marginTop: 0}}>
                        Terminées
                    </h3>
                    {
                        [
                            ...ordersByStatus[ORDER_STATUS.READY],
                            ...ordersByStatus[ORDER_STATUS.PICKING],
                            ...ordersByStatus[ORDER_STATUS.DELIVERING],
                            ...ordersByStatus[ORDER_STATUS.DONE],
                        ].map(
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
                            ),
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IState, props: any) => {
    const {restaurantId} = props.match.params

    return {
        orders: selectOrdersByRestaurantId(state.orders, restaurantId),
    }
}

export default connect(mapStatToProps)(withDemoController(RestaurantOverview))
