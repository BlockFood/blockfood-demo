import * as _ from 'lodash'
import * as React from 'react'
import withDemoController from '../../../../demoController/WithDemoController'
import * as Routes from '../../../Routes'
import {
    IRestaurant, RESTAURANTS_BY_IDS, TOTAL_RESTAURANT_STAR,
    IMenu, MENU_CATEGORIES
} from '../../../../../../lib/Restaurants'
import GoBack from '../../../../components/goBack/GoBack'

import './CustomerOrder.scss'

const DELIVERY_FEE = 4

class CustomerOrder extends React.Component<any, any> {
    private restaurant: IRestaurant

    constructor(props: any) {
        super(props)

        this.restaurant = RESTAURANTS_BY_IDS[this.props.match.params.restaurantId]

        this.state = {
            basket: []
        }

        this.onGoBack = this.onGoBack.bind(this)
        this.addToShoppingList = this.addToShoppingList.bind(this)
        this.validate = this.validate.bind(this)
    }

    private onGoBack() {
        this.props.history.replace(Routes.getRouteCustomerRestaurantList())
    }

    private validate = (event: any) => {
        event.preventDefault()

        if (this.state.basket.length > 0) {
            // TODO
        }
    }

    private getTheTotal = (delivery: boolean) => {
        const {basket} = this.state

        const totalPrice = _.reduce(basket, (total, item) => {
            total += (item.item.price_euro * item.value)
            return total
        }, 0)
        return delivery ? totalPrice + DELIVERY_FEE : totalPrice
    }

    private addToShoppingList = (item: IMenu, valueItem: number) => {
        const {basket} = this.state

        const container = basket.length ? basket : []

        const foundItem = _.find(basket, value => value.item.id === item.id)

        if (foundItem) {
            foundItem.value = foundItem.value + valueItem
        }
        else {
            container.push({value: valueItem, item})
        }

        this.setState({basket: container})
    }

    public render() {
        const {restaurant} = this
        const {basket} = this.state

        const categorizingFoods = (category: string) => {
            const items = _.reduce(restaurant.menu, (items, menu) => {
                if (menu.category === category) {
                    return [...items, menu]
                }
                return items
            }, [])

            return items.length > 0 ? (
                <div key={category} className="foodPart">
                    <h6>{category}</h6>
                    <div className="list">
                        {_.map(items, (food: IMenu) => (
                            <div key={food.id} className="foods" onClick={() => this.addToShoppingList(food, 1)}>
                                <h2>{food.name}</h2>
                                <h3>{food.price_eth} ETH</h3>
                            </div>
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
                    <div className="detail">
                        <div className="name">
                            <p>{restaurant.name}</p>
                        </div>
                        <div className="category">
                            <p>{restaurant.category}</p>
                        </div>
                        <div className="rate">
                            <i className="colored fas fa-star"/> {restaurant.star}/{TOTAL_RESTAURANT_STAR}
                        </div>
                    </div>
                </div>
                <div className="content">
                    {_.map(MENU_CATEGORIES, category => categorizingFoods(category))}
                </div>
                <div className="order">
                    <button className="validate-button" disabled={basket.length === 0} onClick={this.validate}>
                        Validate my order
                    </button>
                    <div className="list divider">
                        {basket.length > 0 ? _.map(basket, item => {
                            return (<div key={item.item.id}>
                                <div className="name">
                                    <span>{item.value} x {item.item.name} </span>
                                    <span className="colored">{item.item.price_euro * item.value} ETH</span>
                                </div>
                            </div>)
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

export default (withDemoController(CustomerOrder))
