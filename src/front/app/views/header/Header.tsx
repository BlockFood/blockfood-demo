import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {IRootState} from '../../state/Reducers'
import Select from 'react-select'
import withDemoController from '../../demoController/WithDemoController'
import {
    CUSTOMER_VIEW, RESTAURANT_VIEW, COURIER_VIEW,
    getRouteCustomerOrderList, getDefaultRouteRestaurant, getRestaurantIdFromPathname
} from '../Routes'
import {RESTAURANTS} from '../../../../lib/Restaurants'
import {selectOrdersCountByRestaurants} from '../../state/Selectors'

import './Header.scss'

class Header extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        const {type, userLabel} = this.getStatus()

        this.state = {
            type,
            userLabel
        }

        this.onRestaurantChange = this.onRestaurantChange.bind(this)
        this.onGoToCustomerOrderList = this.onGoToCustomerOrderList.bind(this)
    }

    getStatus(props = this.props) {
        const {view} = props

        const type = view ? view.split('-')[0] : null

        const userLabel = {
            [CUSTOMER_VIEW]: 'a hungry customer',
            [RESTAURANT_VIEW]: 'a passionate chef',
            [COURIER_VIEW]: 'a motivated courier'
        }[view]

        return {type, userLabel}
    }

    onRestaurantChange({value}: any) {
        this.props.history.replace(getDefaultRouteRestaurant(value))
    }

    onGoToCustomerOrderList() {
        this.props.history.replace(getRouteCustomerOrderList(this.props.location.pathname))
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.view !== this.props.view) {
            const {type, userLabel} = this.getStatus(nextProps)

            type && this.setState({type, userLabel})
        }
    }

    render() {
        const {view, ordersCount} = this.props
        const {type, userLabel} = this.state

        const hasCustomerOrderListBtn = this.props.demoController.isFreeMode() && view === CUSTOMER_VIEW
        const hasSelectRestaurant = this.props.demoController.isFreeMode() && view === RESTAURANT_VIEW
        const restaurantId = hasSelectRestaurant && getRestaurantIdFromPathname(location.pathname)

        const restaurantsSelectValue = _.map(RESTAURANTS, restaurant => ({
            value: restaurant.id,
            label: restaurant.name + (ordersCount[restaurant.id] ? ` (${ordersCount[restaurant.id]})` : '')
        }))

        return (
            <header id="bf-demo-header" className={!!view ? 'visible' : ''}>
                <div className="logo">
                    <div className="name">
                        <i className={type}/>
                        <div><span>Block</span><span>Food</span><span>/{type}</span></div>
                    </div>
                </div>
                <div className="user">
                    {hasCustomerOrderListBtn && (
                        <div className="btn-customer-order-list" onClick={this.onGoToCustomerOrderList}>
                            <i className="far fa-file-alt"/>My Orders
                        </div>
                    )}
                    {hasSelectRestaurant && (
                        <div className="select">
                            <i className="fas fa-home"/>
                            <Select
                                name="form-field-name"
                                value={restaurantId}
                                onChange={this.onRestaurantChange}
                                options={restaurantsSelectValue}
                                clearable={false} searchable={false}/>
                        </div>
                    )}
                    <div className="username"><i className="fas fa-user"/> Welcome to <span>{userLabel}</span></div>
                </div>
            </header>
        )
    }
}

const mapStatToProps = (state: IRootState) => {
    return {
        ordersCount: selectOrdersCountByRestaurants(state.application.orders)
    }
}

export default connect(mapStatToProps)(withDemoController(Header)) as any
