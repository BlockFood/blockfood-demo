import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../../state/InitialState'
import * as Routes from '../../../Routes'
import {Order} from '../../../../components/order/Order'
import GoBack from '../../../../components/goBack/GoBack'

import './CustomerOrderList.scss'

class CustomerOrderList extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.onGoBack = this.onGoBack.bind(this)
    }

    private onGoBack() {
        this.props.history.replace(Routes.getPreviousRouteCustomerOrderList())
    }

    public render() {
        const {orders} = this.props

        return (
            <div id="bf-demo-customer-order-list">
                <GoBack onGoBack={this.onGoBack}/>
                <h2>My orders</h2>
                <div className="list">
                    {_.map(orders, order => (
                        <Order key={order.id}
                               order={order}
                               showAll/>
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

export default connect(mapStatToProps)(CustomerOrderList)