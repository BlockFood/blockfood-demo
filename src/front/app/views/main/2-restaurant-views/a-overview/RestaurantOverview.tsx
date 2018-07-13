import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {IRootState} from '../../../../state/Reducers'
import withDemoController from '../../../../demoController/WithDemoController'
import {IOrder, ORDER_STATUS} from '../../../../../../lib/Orders'
import Api from '../../../../api/Api'
import doWithMinTime from '../../../../utils/DoWithMinTime'
import doWithTime from '../../../../utils/DoWithTime'
import {selectOrdersByRestaurantId} from '../../../../state/Selectors'
import {setOrders,updateOrderStatus} from '../../../../state/Actions'
import {Order} from '../../../../components/order/Order'

import './RestaurantOverview.scss'

class RestaurantOverview extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

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
            this.props.updateOrderStatus(orderId,ORDER_STATUS.ACCEPTED)
            // const orders = await doWithMinTime(() => Api.updateOrderStatus(orderId, ORDER_STATUS.ACCEPTED))
            //
            // this.props.setOrders(orders)
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
            this.props.updateOrderStatus(orderId,ORDER_STATUS.READY)
            // const orders = await doWithMinTime(() => Api.updateOrderStatus(orderId, ORDER_STATUS.READY))
            // this.props.setOrders(orders)
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

        return (
            <div id="bf-demo-view-restaurant-overview">
                <div>
                    <h3>Pending</h3>
                    {ordersByStatus[0].map((order: IOrder) => (
                        <Order key={order.id}
                               order={order}
                               onValidLabel='Valid'
                               onValid={this.acceptOrder}
                               loading={loadingIds[order.id]}
                               showDetails
                               showComment/>
                    ))}
                </div>
                <div>
                    <h3>In Progress</h3>
                    {ordersByStatus[1].map((order: IOrder) => (
                        <Order key={order.id}
                               order={order}
                               onValidLabel='Finish'
                               onValid={this.finishOrder}
                               loading={loadingIds[order.id]}
                               showDetails/>
                    ))}
                </div>
                <div>
                    <h3>Done</h3>
                    {ordersByStatus[2].map((order: IOrder) => (
                        <Order key={order.id}
                               order={order}
                               showDetails
                               showComment
                               showTotal/>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IRootState, props: any) => {
    const {restaurantId} = props.match.params

    const orders = selectOrdersByRestaurantId(state.application.orders, restaurantId)
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

const mapDispatchToProps = (dispatch:any) => {
  return {
    setOrders: (orders: IOrder[]) => dispatch(setOrders(orders)),
    updateOrderStatus: (orderId: string, status: ORDER_STATUS) => dispatch(updateOrderStatus(orderId,status))
  }
}

export default connect(mapStatToProps,mapDispatchToProps)(withDemoController(RestaurantOverview))
