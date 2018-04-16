import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../../state/InitialState'
import * as Routes from '../../../Routes'
import {RESTAURANTS_BY_IDS} from '../../../../../../lib/Restaurants'
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
                        <div key={order.id} className="item">
                            <div className="id">Order #{order.id}</div>
                            <div className="restaurant">{RESTAURANTS_BY_IDS[order.restaurantId].name}</div>
                            <div className="status">{order.status}</div>
                        </div>
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