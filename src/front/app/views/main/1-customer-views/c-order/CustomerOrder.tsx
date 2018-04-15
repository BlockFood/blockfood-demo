import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../../state/InitialState'
import withDemoController from '../../../../demoController/WithDemoController'
import * as Routes from '../../../Routes'
import {
    IRestaurant, RESTAURANTS_BY_IDS, MENU_ITEMS_BY_IDS, TOTAL_RESTAURANT_STAR,
    IMenuItem, MENU_CATEGORIES
} from '../../../../../../lib/Restaurants'
import {IOrderDetail} from '../../../../../../lib/Orders'
import {createCustomerOrderInProgress, setCustomerOrderInProgress} from '../../../../state/Actions'
import GoBack from '../../../../components/goBack/GoBack'
import MenuItem from './menuItem/MenuItem'

import './CustomerOrder.scss'

const DELIVERY_FEE = 4

class CustomerOrder extends React.Component<any, any> {
    private restaurant: IRestaurant
    private menuItems: any

    constructor(props: any) {
        super(props)

        const {restaurantId} = this.props.match.params
        this.restaurant = RESTAURANTS_BY_IDS[restaurantId]
        this.menuItems = MENU_ITEMS_BY_IDS[restaurantId]

        this.onGoBack = this.onGoBack.bind(this)
        this.addToOrderInProgress = this.addToOrderInProgress.bind(this)
        this.validate = this.validate.bind(this)
    }

    private onGoBack() {
        this.props.history.replace(Routes.getRouteCustomerRestaurantList())
    }

    private validate = (event: any) => {
        event.preventDefault()

        const {customerOrderInProgress} = this.props

        if (customerOrderInProgress.details.length > 0) {
            if (this.props.demoController.goToNextStep()) {
                this.props.history.replace(Routes.getRouteCustomerPosition())
            }
        }
    }

    private getTheTotal = (delivery: boolean) => {
        const {customerOrderInProgress} = this.props

        const totalPrice = _.reduce(customerOrderInProgress.details, (total, detail) => {
            const price = this.menuItems[detail.menuItemId].price_eth
            total += (price * detail.quantity)
            return total
        }, 0)

        return delivery ? totalPrice + DELIVERY_FEE : totalPrice
    }

    private addToOrderInProgress = (menuItemId: string, deltaQuantity: number) => {
        const {customerOrderInProgress} = this.props

        let menuItemFound = false
        const newDetails = _.reduce(customerOrderInProgress.details, (newDetails: IOrderDetail[], detail) => {
            if (detail.menuItemId === menuItemId) {
                menuItemFound = true

                const newQuantity = detail.quantity + deltaQuantity

                if (newQuantity > 0) {
                    const newDetail = _.assign({}, detail, {quantity: newQuantity})
                    newDetails.push(newDetail)
                }
            }
            else {
                newDetails.push(detail)
            }

            return newDetails
        }, [])

        if (!menuItemFound) {
            newDetails.push({menuItemId, quantity: deltaQuantity})
        }

        const newOrderInProgress = _.assign({}, customerOrderInProgress, {details: newDetails})

        this.props.dispatch(setCustomerOrderInProgress(newOrderInProgress))
    }

    public componentDidMount() {
        const {customerOrderInProgress} = this.props

        if (customerOrderInProgress.restaurantId !== this.restaurant.id) {
            this.props.dispatch(createCustomerOrderInProgress(this.restaurant.id))
        }
    }

    public render() {
        const {restaurant} = this
        const {customerOrderInProgress} = this.props

        const isEmpty = customerOrderInProgress.details.length === 0

        const categorizingFoods = (category: string) => {
            const menuItems = _.reduce(restaurant.menuItems, (menuItems, menuItem) => {
                if (menuItem.category === category) {
                    return [...menuItems, menuItem]
                }
                return menuItems
            }, [])

            return menuItems.length > 0 ? (
                <div key={category} className="menu-items-category">
                    <h6>{category}</h6>
                    <div className="list">
                        {_.map(menuItems, (menuItem: IMenuItem) => (
                            <MenuItem key={menuItem.id} menuItem={menuItem}
                                      addToOrderInProgress={this.addToOrderInProgress}/>
                        ))}
                    </div>
                </div>
            ) : null
        }

        return (
            <div id="bf-demo-view-customer-order">
                <GoBack onGoBack={this.onGoBack}/>
                <div className="header">
                    <img className="image" src={restaurant.image}/>
                    <div className="restaurant-detail">
                        <div className="name">
                            <p>{restaurant.name}</p>
                        </div>
                        <div className="category">
                            <p>{restaurant.category}</p>
                        </div>
                        <div className="rate">
                            <i className="colored fas fa-star"/> {restaurant.rate}/{TOTAL_RESTAURANT_STAR}
                        </div>
                    </div>
                </div>
                <div className="content">
                    {_.map(MENU_CATEGORIES, category => categorizingFoods(category))}
                </div>
                <div className="order">
                    <button className="validate-button" disabled={isEmpty} onClick={this.validate}>
                        Validate my order
                    </button>
                    <div className="list divider">
                        {!isEmpty ? _.map(customerOrderInProgress.details, detail => {
                            const menuItem = this.menuItems[detail.menuItemId]

                            return (
                                <div key={menuItem.id}>
                                    <div className="name">
                                        <span>{detail.quantity} x {menuItem.name} </span>
                                        <span className="colored">{menuItem.price_eth * detail.quantity} ETH</span>
                                    </div>
                                </div>
                            )
                        }) : (
                            <div className="empty">Empty...</div>
                        )}
                    </div>
                    <div className="divider borderGray">
                        <div>
                            <span>Total:</span>
                            <span className="colored">{this.getTheTotal(false)} ETH</span>
                        </div>
                        <div>
                            <span>Delivery: </span>
                            <span className="colored">{DELIVERY_FEE} ETH</span>
                        </div>
                    </div>
                    <div className="divider borderGray">
                        <div>
                            <span>TOTAL:</span>
                            <span className="colored">{this.getTheTotal(true)} ETH</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IState) => {
    return {
        customerOrderInProgress: state.customerOrderInProgress
    }
}

export default connect(mapStatToProps)(withDemoController(CustomerOrder))
