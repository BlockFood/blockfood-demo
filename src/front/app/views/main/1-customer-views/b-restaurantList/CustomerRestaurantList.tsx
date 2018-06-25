import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {IRootState} from '../../../../state/Reducers'
import * as Routes from '../../../Routes'
import withDemoController from '../../../../demoController/WithDemoController'
import {IRestaurant, RESTAURANTS} from '../../../../../../lib/Restaurants'
import {createCustomerOrderInProgress} from '../../../../state/Actions'
import GoBack from '../../../../components/goBack/GoBack'
import RestaurantType from './restaurantType/RestaurantType'
import RestaurantItem from './restaurantItem/RestaurantItem'

import './CustomerRestaurantList.scss'

class CustomerRestaurantList extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            filters: []
        }

        this.onGoBack = this.onGoBack.bind(this)
        this.toggleFilter = this.toggleFilter.bind(this)
        this.clearFilters = this.clearFilters.bind(this)
        this.selectRestaurant = this.selectRestaurant.bind(this)
    }

    private onGoBack() {
        this.props.history.replace(Routes.getRouteCustomerLocation())
    }

    private toggleFilter(filter: string) {
        const {filters} = this.state

        if (filters.includes(filter)) {
            this.setState({filters: _.without(filters, filter)})
        }
        else {
            this.setState({filters: [...filters, filter]})
        }
    }

    private clearFilters() {
        this.setState({filters: []})
    }

    private selectRestaurant = (restaurantId: string) => {
        if (this.props.demoController.goToNextStep()) {
            this.props.createCustomerOrderInProgress(restaurantId)
            this.props.history.replace(Routes.getRouteCustomerOrder(restaurantId))
        }
    }

    public render() {
        const {customerLocation} = this.props
        const {filters} = this.state

        return (
            <div id="bf-demo-view-customer-restaurant-list">
                <GoBack onGoBack={this.onGoBack}/>
                <RestaurantType filters={filters} toggleFilter={this.toggleFilter} clearFilters={this.clearFilters}/>
                {customerLocation ? (
                    <h2 className="title">{RESTAURANTS.length} restaurants in <span>{customerLocation}</span></h2>
                ) : (
                    <h2 className="title">All {RESTAURANTS.length} restaurants</h2>
                )}
                <div className="restaurant-list">
                    {_.reduce(RESTAURANTS, (restaurants: any, restaurant: IRestaurant, index: number) => {
                        if (filters.length === 0 || filters.includes(restaurant.category)) {
                            restaurants.push(
                                <RestaurantItem key={restaurant.id}
                                                restaurant={restaurant} selectRestaurant={this.selectRestaurant}/>
                            )
                        }

                        if (restaurants.length === 0 && index === RESTAURANTS.length -1) {
                            restaurants.push(
                                <h2 key="empty" className="title empty">No result...</h2>
                            )
                        }

                        return restaurants
                    }, [])}
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IRootState) => {
    return {
        customerLocation: state.application.customerLocation
    }
}


const mapDispatchToProps = (dispatch:any) => {
  return {
    createCustomerOrderInProgress: (restaurantId: string) => dispatch(createCustomerOrderInProgress(restaurantId))
  }
}

export default connect(mapStatToProps,mapDispatchToProps)(withDemoController(CustomerRestaurantList))
