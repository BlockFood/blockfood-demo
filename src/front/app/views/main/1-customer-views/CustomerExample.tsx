import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../state/InitialState'
import withDemoController from '../../../demoController/WithDemoController'
import {RESTAURANTS} from '../../../../../lib/Restaurants'
import Api from '../../../api/Api'
import doWithMinTime from '../../../utils/DoWithMinTime'
import {setOrders} from '../../../state/Actions'

import './CustomerExample.scss'

class RestaurantButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.props.onClick(this.props.id)
    }

    render() {
        const {index, disabled} = this.props

        return <button className={disabled ? 'disabled' : ''} onClick={this.onClick}>CREATE ORDER IN RESTAURANT: <b>{index}</b></button>
    }
}

class CustomerExample extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            loading: false
        }

        this.onCreateOrder = this.onCreateOrder.bind(this)
    }

    onCreateOrder(restaurantId: string) {
        if (!this.state.loading) {
            this.setState({loading: true})
            doWithMinTime(() => Api.createNewOrder(restaurantId, {})).then((orders) => {
                this.props.dispatch(setOrders(orders))
                this.props.demoController.goToNextStep() && this.setState({loading: false})
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
                    {_.map(RESTAURANTS, (restaurant, index) => (
                        <RestaurantButton key={restaurant.id}
                                          id={restaurant.id} index={index + 1}
                                          disabled={loading}
                                          onClick={this.onCreateOrder}/>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IState) => {
    return {
        orders: state.orders
    }
}

export default connect(mapStatToProps)(withDemoController(CustomerExample))