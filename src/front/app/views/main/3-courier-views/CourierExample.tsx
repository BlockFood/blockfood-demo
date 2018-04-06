import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../state/InitialState'
import withDemoController from '../../../demoController/WithDemoController'
import {ORDER_STATUS} from '../../../../../lib/Orders'
import Api from '../../../api/Api'
import doWithMinTime from '../../../utils/DoWithMinTime'
import {selectOrdersForCourier} from '../../../state/Selectors'
import {setOrders} from '../../../state/Actions'

class HandleButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.props.onClick(this.props.id)
    }

    render() {
        const {id, disabled} = this.props

        return <button className={disabled ? 'disabled' : ''} onClick={this.onClick}>HANDLE ORDER: <b>{id}</b></button>
    }
}

class CourierExample extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            loading: false
        }

        this.onHandleOrder = this.onHandleOrder.bind(this)
    }

    onHandleOrder(orderId: string) {
        if (!this.state.loading) {
            this.setState({loading: true})
            doWithMinTime(() => Api.updateOrderStatus(orderId, ORDER_STATUS.DONE)).then((orders) => {
                this.props.dispatch(setOrders(orders))
                if (this.props.demoController.goToNextStep()) {
                    this.setState({loading: false})
                }
            })
        }
    }

    render() {
        const {orders} = this.props
        const {loading} = this.state

        return (
            <div className="view-example">
                <div>My order(s): {orders.length}</div>
                <div className="buttons">
                    {_.map(orders, (order) => {
                        return order.status === ORDER_STATUS.READY ? (
                            <HandleButton key={order.id}
                                          id={order.id}
                                          disabled={loading}
                                          onClick={this.onHandleOrder}/>
                        ) : null
                    })}
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IState) => {
    return {
        orders: selectOrdersForCourier(state.orders)
    }
}

export default connect(mapStatToProps)(withDemoController(CourierExample))