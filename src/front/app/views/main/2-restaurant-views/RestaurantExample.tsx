import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../state/InitialState'
import withDemoController from '../../../demoController/WithDemoController'
import {RESTAURANTS_BY_IDS} from '../../../../../lib/Restaurants'
import {ORDER_STATUS} from '../../../../../lib/Orders'
import Api from '../../../api/Api'
import doWithMinTime from '../../../utils/DoWithMinTime'
import Error from '../../../components/error/Error'
import {selectOrdersByRestaurantId} from '../../../state/Selectors'
import {setOrders} from '../../../state/Actions'

class HandleButton extends React.Component<any, any> {
    onClick = () => this.props.onClick(this.props.id)

    render() {
        const {id, disabled} = this.props

        return <button className={disabled ? 'disabled' : ''} onClick={this.onClick}>HANDLE ORDER: <b>{id}</b></button>
    }
}

class RestaurantExample extends React.Component<any, any> {
    state = {
        loading: false
    }

    onHandleOrder = (orderId: string) => {
        if (!this.state.loading) {
            this.setState({loading: true})
            doWithMinTime(() => Api.updateOrderStatus(orderId, ORDER_STATUS.READY)).then((orders) => {
                this.props.dispatch(setOrders(orders))
                this.props.demoController.goToNextStep() && this.setState({loading: false})
            })
        }
    }

    render() {
        const {restaurantId} = this.props.match.params
        const {orders} = this.props
        const {loading} = this.state

        if (!RESTAURANTS_BY_IDS[restaurantId]) {
            return <Error/>
        }

        return (
            <div className="view-example">
                <div>My order(s): {orders.length}</div>
                <div className="buttons">
                    {orders.map((order: any) => {
                        console.log('order', order);
                        return order.status === ORDER_STATUS.SUBMITTED ? (
                            <HandleButton
                                key={order.id}
                                id={order.id}
                                disabled={loading}
                                onClick={this.onHandleOrder}
                            />
                        ) : null
                    })}
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IState, props: any) => {
    const {restaurantId} = props.match.params

    return {
        orders: selectOrdersByRestaurantId(state.orders, restaurantId)
    }
}

export default connect(mapStatToProps)(withDemoController(RestaurantExample))
