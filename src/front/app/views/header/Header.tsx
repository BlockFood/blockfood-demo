import * as _ from 'lodash'
import * as React from 'react'
import Select from 'react-select'
import withDemoController from '../../demoController/WithDemoController'
import {
    CUSTOMER_VIEW, RESTAURANT_VIEW, COURIER_VIEW,
    getDefaultRouteRestaurant, getRestaurantIdFromPathname
} from '../Routes'
import {RESTAURANTS} from '../../../../lib/Restaurants'

import './Header.scss'

const RESTAURANTS_SELECT_VALUE = _.map(RESTAURANTS, restaurant => ({value: restaurant.id, label: restaurant.name}))

class Header extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        const {type, userLabel} = this.getStatus()

        this.state = {
            type,
            userLabel
        }

        this.onRestaurantChange = this.onRestaurantChange.bind(this)
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

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.view !== this.props.view) {
            const {type, userLabel} = this.getStatus(nextProps)

            type && this.setState({type, userLabel})
        }
    }

    render() {
        const {view} = this.props
        const {type, userLabel} = this.state

        const hasSelectRestaurant = this.props.demoController.isFreeMode() && view === RESTAURANT_VIEW
        const restaurantId = hasSelectRestaurant && getRestaurantIdFromPathname(location.pathname)

        return (
            <header id="bf-demo-header" className={!!view ? 'visible' : ''}>
                <div className="logo">
                    <div className="name">
                        <i className={type}/>
                        <div>Block<span>Food</span><span>/{type}</span></div>
                    </div>
                </div>
                <div className="user">
                    {hasSelectRestaurant && (
                        <div className="select">
                            <i className="fas fa-home"/>
                            <Select
                                name="form-field-name"
                                value={restaurantId}
                                onChange={this.onRestaurantChange}
                                options={RESTAURANTS_SELECT_VALUE}
                                clearable={false} searchable={false}/>
                        </div>
                    )}
                    <div className="username"><i className="fas fa-user"/> Welcome to <span>{userLabel}</span></div>
                </div>
            </header>
        )
    }
}

export default withDemoController(Header)